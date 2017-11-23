import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UtilityService } from '../services/utility.service';
import { JsonreaderService } from '../services/jsonreader.service';

import { ScheduleType } from '../enums/schedule-type.enum';
import { BasicAdInfo } from '../models/basic_ad_info.model';
import { TargetingInfo } from '../models/targeting_info.model';
import { ScheduleInfo } from '../models/schedule_info.model';
import { PaymentInfo } from '../models/payment_info.model';

import { APP_CONFIGS } from '../configs';

declare var $: any;

@Component({
  selector: 'app-show-advert',
  templateUrl: './show-advert.component.html',
  styleUrls: ['./show-advert.component.scss'],
  providers: [JsonreaderService, UtilityService]
})
export class ShowAdvertComponent implements OnInit, AfterViewInit {

  ad_basic_info: BasicAdInfo = new BasicAdInfo;
  targeting_info: TargetingInfo = new TargetingInfo;
  schedule_info: ScheduleInfo = new ScheduleInfo;
  payment_info: PaymentInfo = new PaymentInfo;

  is_loading_advert_info: boolean = true;
  fetch_advert_error: boolean = false;

  route_subscriber: any;
  advert_id: number;
  current_user: any = JSON.parse(localStorage.getItem('current_user'));
  advert_info: any;

  advert_status: string = "ACTIVE";
  amount: number = 30000;
  display_count: number = 23451;
  people_reached: number = 8000;
  screens_reached: number = 3000;

  constructor(private route: ActivatedRoute,
    private jsonreaderService: JsonreaderService,
    private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.route_subscriber = this.route.params.subscribe(params => {
      this.advert_id = +params['id'];
    });
  }

  ngAfterViewInit() {
    this.jsonreaderService.fetchAdvertJsonFromTheServer(this.advert_id)
      .subscribe(
      (responseData) => {
        this.is_loading_advert_info = false;
        if (responseData.success) {
          this.advert_info = responseData;
          this.populateBasicInfo();
          this.populateTargetingInfo();
          this.populateScheduleInfo();
          this.populatePaymentInfo();
          this.populateMiscellaneous();
        } else {
          this.fetch_advert_error = true;
          console.log("Server returned false");
        }
      },
      error => {
        this.fetch_advert_error = true;
        console.log("Something went wrong");
      }
      );
  }

  populateBasicInfo() {
    try {
      var params = this.advert_info.data;
      this.ad_basic_info.advert_id = params.basic_info.campaign_id;
      this.ad_basic_info.advert_length = params.basic_info.advert_length;
      this.ad_basic_info.campaign_name = params.basic_info.campaign_name;
      this.ad_basic_info.layout_type = params.basic_info.layout_type;


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
      console.log("Failed to populate basic info: " + error);
    }
  }

  populateTargetingInfo() {
    try {
      var params = this.advert_info.data.target_info;

      if (params.target_screen_codes.length > 0) {
        this.targeting_info.target_specific_screen_selected = true;

        // var all_screens = this.targeting_info.screens_returned_from_search_results;
        var selected_screen_codes = params.target_screen_codes;

        selected_screen_codes.forEach((code) => {
          this.targeting_info.selected_screens.push(code);
        });

      } else {
        this.targeting_info.target_specific_screen_selected = false;

        //populate areas
        var areas: any[] = params.areas;
        if (areas.length == 1 && areas[0].id == 1) {
          this.targeting_info.all_locations_selected = true;
        } else {
          this.targeting_info.selected_locations = areas;
        }

        //populate business types
        var business_types: any[] = params.business_types;
        if (business_types.length == 1 && business_types[0].id == 1) {
          this.targeting_info.all_business_types = true;
        } else {
          this.targeting_info.selected_business_types = business_types;
        }

        //populate audience types
        var audience_types: any[] = params.audience_types;
        if (audience_types.length == 1 && audience_types[0].id == 1) {
          this.targeting_info.all_audience_types = true;
        } else {
          this.targeting_info.selected_audience_types = audience_types;
        }

      }
    } catch (error) {
      console.log("Failed to populate audience info: " + error);
    }
  }

  populateScheduleInfo() {
    try {
      var params = this.advert_info.data.schedule_info;

      this.schedule_info.start_date = this.dateToMDY(params.start_date);
      this.schedule_info.end_date = this.dateToMDY(params.end_date);

      this.schedule_info.default_start_date = this.dateToObject(params.start_date);
      this.schedule_info.default_end_date = this.dateToObject(params.end_date);


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
      console.log("Failed to load schedule info: " + error);
    }
  }

  populatePaymentInfo() {
    try {
      var params = this.advert_info.data.payment_info;

      this.payment_info.payment_method = params.value_store;
      this.payment_info.account_number = params.account_number;

      this.payment_info.paymentFieldsLoading = false;
    } catch (error) {
      console.log("failed to populate Payment info: " + error);
    }
  }

  populateMiscellaneous() {
    try {
      this.advert_status = this.advert_info.data.campaign_status.status;
      this.amount = this.advert_info.data.campaign_stats.target_reach.amount;
      this.display_count = this.advert_info.data.campaign_stats.display_count;
      this.people_reached = this.advert_info.data.campaign_stats.target_reach.audience_count;
      this.screens_reached = this.advert_info.data.campaign_stats.target_reach.screen_count;
    } catch (error) {
      console.log("Failed to populate miscellaneous info: " + error);
    }
  }

  dateToMDY(date_to_convert) {
    if (date_to_convert == "") {
      return "";
    }
    var date = new Date(date_to_convert);
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + (m <= 9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d) + '/' + y;
  }

  dateToObject(date_to_convert) {

    var date = new Date(date_to_convert);
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var object = { date: { year: y, month: m, day: d } };
    return object;
  }

  getDayName(day: string): string {
    switch (Number(day)) {
      case 1:
        return "Moday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 7:
        return "Sunday";
      default:
        return "Unknows";
    }

  }

  getPaymentMethodName(id: string): string {
    if (id == "MTNMOMO_UG") {
      
      return "MTN mobile money"

    } else if (id == "SEYEYA_CREDIT") {

      return "My credits";
    }
    else {
      return "unknown"
    }
  }



  reloadPage() {
    this.utilityService.reloadPage();
  }

}
