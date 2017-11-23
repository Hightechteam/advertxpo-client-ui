import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ScheduleType } from '../enums/schedule-type.enum';


import { NewadvertComponent } from '../newadvert/newadvert.component';
import { JsonreaderService } from '../services/jsonreader.service';
import { UtilityService } from '../services/utility.service';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';

import { APP_CONFIGS } from '../configs';

declare var $: any;

@Component({
  selector: 'app-edit-advert',
  templateUrl: '../newadvert/newadvert.component.html',
  styleUrls: ['../newadvert/newadvert.component.scss'],
  providers: [JsonreaderService, UtilityService, UserService, ToastService]
})
export class EditAdvertComponent extends NewadvertComponent implements OnInit, AfterViewInit {

  route_subscriber: any;
  advert_id: number;
  current_user: any = JSON.parse(localStorage.getItem('current_user'));
  advert_info: any;

  load_adverts_error_message: string = "";

  constructor(private route: ActivatedRoute,
    private jsonreaderService: JsonreaderService,
    private utility: UtilityService,
    private user_service: UserService,
    private toast_service: ToastService) {
    super(user_service, toast_service, utility);
  }

  ngOnInit() {
    if (!this.user_service.isTokenSet()) {
      $("#guestLoginModal").modal();
    }
    this.route_subscriber = this.route.params.subscribe(params => {
      this.advert_id = +params['id'];
    });
  }

  ngAfterViewInit() {
    this.ad_basic_info.basicInfoFieldsLoading = true;
    this.payment_info.paymentFieldsLoading = true;
    this.schedule_info.scheduleFieldsLoading = true;

    this.jsonreaderService.fetchAdvertJsonFromTheServer(this.advert_id)
      .subscribe(
      (responseData) => {
        console.log(JSON.stringify(responseData));
        if (responseData.success) {
          this.advert_info = responseData;
          this.populateBasicInfo();
          this.populateScheduleInfo();
          this.populatePaymentInfo();
          this.populateTargetingInfo();
          this.populateEstimates();
        } else {
          this.failed_to_load_advert_form = true;
          this.load_adverts_error_message = this.utility.extractErrorMessages(responseData);
          console.log("Server returned false");
        }
      },
      error => {
        this.failed_to_load_advert_form = true;
        this.load_adverts_error_message = "Something went wrong, Please check you internet connection and try again.";
        console.log("Something went wrong");
      }
      );
  }

  confirmCurrentUserOwnsAdvert() {
  }

  populateBasicInfo() {

    try {
      var params = this.advert_info.data;

      this.ad_basic_info.advert_length = "" + params.basic_info.advert_length;
      this.ad_basic_info.campaign_name = params.basic_info.campaign_name;
      this.ad_basic_info.layout_type = params.basic_info.layout_type;

      var campaign_status = this.advert_info.data.campaign_status.status;
      if (campaign_status == "DRAFT") {
        this.ad_basic_info.advert_id = params.basic_info.campaign_id;
      }

      var advert_text_array = params.text_info;
      if (advert_text_array.length != 0) {
        advert_text_array.forEach(element => {
          if (element.type == APP_CONFIGS.ADVERT_TITLE_TEXT) {
            this.ad_basic_info.advert_title = element.text;
          } else if (element.type == APP_CONFIGS.ADVERT_MESSAGE_TEXT) {
            this.ad_basic_info.advert_text = element.text;
          }
        });
      }

      var resource_info: any[] = params.resources_info;

      if (resource_info.length != 0) {

        var resource_type = resource_info[0].type;
        if (resource_type == APP_CONFIGS.RESOURCE_TYPE_IMAGES) {
          this.ad_basic_info.file_upload_type = APP_CONFIGS.RESOURCE_TYPE_IMAGES;

          resource_info.forEach(resource => {
            var image = { url: resource.preview_url, id: resource.upload_id };
            this.ad_basic_info.selected_images.push(image);
            this.ad_basic_info.image_preview_url = resource.preview_url;
          });
        } else if (resource_type == APP_CONFIGS.RESOURCE_TYPE_VIDEO) {
          this.ad_basic_info.file_upload_type = APP_CONFIGS.RESOURCE_TYPE_VIDEO;

          resource_info.forEach(resource => {
            this.ad_basic_info.video_upload_id = resource.upload_id;
            this.ad_basic_info.video_upload_name = resource.upload_name;
            this.ad_basic_info.video_thumb_url = resource.preview_url;
            this.ad_basic_info.image_preview_url = resource.preview_url;
          });
        } else {
          this.ad_basic_info.file_upload_type = APP_CONFIGS.RESOURCE_TYPE_IMAGES;
        }

      }

      this.ad_basic_info.basicInfoFieldsLoading = false;
    } catch (error) {
      console.log("Failed to poulate basic info: " + error)
    }

  }

  populateScheduleInfo() {
    try {
      var params = this.advert_info.data.schedule_info;

      this.schedule_info.start_date = this.utility.dateToMDY(params.start_date);
      this.schedule_info.end_date = this.utility.dateToMDY(params.end_date);

      this.schedule_info.default_start_date = this.utility.dateToObject(params.start_date);
      this.schedule_info.default_end_date = this.utility.dateToObject(params.end_date);

      if (params.schedule_type == APP_CONFIGS.SCHEDULE_TYPE_INSTANT) {
        this.schedule_info.schedule_type = "" + ScheduleType.Instant;
      } else if (params.schedule_type == APP_CONFIGS.SCHEDULE_TYPE_LATER) {
        this.schedule_info.schedule_type = "" + ScheduleType.Later;

        var schedules = params.time_slots;

        schedules.forEach(time_slot => {

          if (time_slot.name == APP_CONFIGS.SCHEDULE_RUSHHOUR) {
            this.schedule_info.rush_hour_selected = true;
            this.schedule_info.rush_hour_frequency = time_slot.frequency;
            this.schedule_info.rush_hour_prefered_time = time_slot.preferred_hour;
            this.schedule_info.rush_hour_days = time_slot.days;
          }

          if (time_slot.name == APP_CONFIGS.SCHEDULE_PRIME) {
            this.schedule_info.prime_time_selected = true;
            this.schedule_info.prime_time_frequency = time_slot.frequency;
            this.schedule_info.prime_time_prefered_time = time_slot.preferred_hour;
            this.schedule_info.prime_time_days = time_slot.days;
          }

          if (time_slot.name == APP_CONFIGS.SCHEDULE_EARLY) {
            this.schedule_info.early_bird_selected = true;
            this.schedule_info.early_bird_frequency = time_slot.frequency;
            this.schedule_info.early_bird_prefered_time = time_slot.preferred_hour;
            this.schedule_info.early_bird_days = time_slot.days;
          }

          if (time_slot.name == APP_CONFIGS.SCHEDULE_RUSHHOUR) {
            this.schedule_info.rush_hour_selected = true;
            this.schedule_info.rush_hour_frequency = time_slot.frequency;
            this.schedule_info.rush_hour_prefered_time = time_slot.preferred_hour;
            this.schedule_info.rush_hour_days = time_slot.days;
          }

          if (time_slot.name == APP_CONFIGS.SCHEDULE_LUNCHHOUR) {
            this.schedule_info.lunch_hour_selected = true;
            this.schedule_info.lunch_hour_frequency = time_slot.frequency;
            this.schedule_info.lunch_hour_prefered_time = time_slot.preferred_hour;
            this.schedule_info.lunch_hour_days = time_slot.days;
          }

          if (time_slot.name == APP_CONFIGS.SCHEDULE_LATENIGHT) {
            this.schedule_info.late_night_selected = true;
            this.schedule_info.late_night_frequency = time_slot.frequency;
            this.schedule_info.late_night_prefered_time = time_slot.preferred_hour;
            this.schedule_info.late_night_days = time_slot.days;
          }

          if (time_slot.name == APP_CONFIGS.SCHEDULE_FREEBIE) {
            this.schedule_info.freebie_selected = true;
            this.schedule_info.freebie_frequency = time_slot.frequency;
            this.schedule_info.freebie_prefered_time = time_slot.preferred_hour;
            this.schedule_info.freebie_days = time_slot.days;
          }

        });

      }

      this.schedule_info.scheduleFieldsLoading = false;
    } catch (error) {
      console.log("Failed to populate schedule info: " + error)
    }
  }

  populatePaymentInfo() {
    try {
      var params = this.advert_info.data.payment_info;

      this.payment_info.payment_method = params.value_store;
      this.payment_info.account_number = params.account_number;

      this.payment_info.paymentFieldsLoading = false;
    } catch (error) {
      console.log("Faield to populate payment info: " + error);
    }
  }

  populateTargetingInfo() {
    try {
      var params = this.advert_info.data.target_info;

      if (params.target_screen_codes.length > 0) {
        this.targeting_info.target_specific_screen_selected = true;
        this.targeting_info.selected_screens = params.target_screen_codes;

      } else {
        this.targeting_info.target_specific_screen_selected = false;

        //populate areas
        var areas: any[] = params.areas;
        if (areas.length == 1 && areas[0].id == 1) {
          this.targeting_info.all_locations_selected = true;
        } else {
          this.targeting_info.selected_locations = params.areas;
        }

        //populate business types
        var business_types: any[] = params.business_types;
        if (business_types.length == 1 && business_types[0].id == 1) {
          this.targeting_info.all_business_types = true;
        } else {
          this.targeting_info.selected_business_types = params.business_types;
        }

        //populate audience types
        var audience_types: any[] = params.audience_types;
        if (audience_types.length == 1 && audience_types[0].id == 1) {
          this.targeting_info.all_audience_types = true;
        } else {
          this.targeting_info.selected_audience_types = params.audience_types;
        }
      }
    } catch (error) {
      console.log("Failed to populate audience info: " + error);
    }
  }

  populateEstimates() {
    try {
      var params = this.advert_info.data.campaign_stats;

      this.previewComponentRef.estimated_screens = params.target_reach.screen_count;
      this.previewComponentRef.estimated_amount = params.target_reach.amount;
      this.previewComponentRef.estimated_people = params.target_reach.audience_count;

      this.previewComponentRef.potential_audience_count = params.potential_reach.audience_count;
      this.previewComponentRef.potential_screen_count = params.potential_reach.screen_count;
      this.previewComponentRef.potential_reach_amount = params.potential_reach.amount;

      this.previewComponentRef.estimate_people_percentage =
        this.utility.getPercentage(this.previewComponentRef.estimated_people, this.previewComponentRef.potential_audience_count)
      this.previewComponentRef.estimated_screens_percentage =
        this.utility.getPercentage(this.previewComponentRef.estimated_screens, this.previewComponentRef.potential_screen_count);

    } catch (error) {
      console.log("Failed to populate reach estimates: " + error);
    }

  }


}
