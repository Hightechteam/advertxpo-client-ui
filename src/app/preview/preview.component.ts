import { addCommasToNumber } from '../Utilities/general-utils';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { BasicAdInfo } from '../models/basic_ad_info.model';
import { TargetingInfo } from '../models/targeting_info.model';
import { ScheduleInfo } from '../models/schedule_info.model';
import { PaymentInfo } from '../models/payment_info.model';
import { AdvertEstimates } from '../models/advert_estimates.model';
import { APP_CONFIGS } from '../configs'; 
import { UtilityService } from '../services/utility.service';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';

import { BasicInfoFinal } from '../final_request_models/basic_info.model';
import { ResourceFinal } from '../final_request_models/resource.model';
import { ScheduleInfoFinal } from '../final_request_models/schedule_info.model';
import { ScheduleItemFinal } from '../final_request_models/schedule_item.model';
import { TargetingFinal } from '../final_request_models/targeting.model';
import { PaymentInfoFinal } from '../final_request_models/payment_info.model';
import { TextFinal } from '../final_request_models/text.model';
import { ScheduleDetail } from '../final_request_models/schedule_detail.model';
import { ScheduleTimeFinal } from '../final_request_models/schedule_time.model';
import { QueryPriceParams } from '../final_request_models/query_price.model';
import { TimeslotFinal } from '../final_request_models/timeslot.model';

declare var $:any;

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'], 
  providers: [UtilityService, DataService, ToastService ]
})

export class PreviewComponent implements OnInit, AfterViewInit {

  @Input() public ad_basic_info: BasicAdInfo = new BasicAdInfo;
  @Input() public targeting_info: TargetingInfo = new TargetingInfo;
  @Input() public schedule_info: ScheduleInfo = new ScheduleInfo;
  @Input() public payment_info: PaymentInfo = new PaymentInfo;

  public advert_estimates: AdvertEstimates = new AdvertEstimates;

  form_has_errors: boolean = false;
  show_error_details: boolean = false;

  show_loading_spinner: boolean = false;

  estimated_screens: number = 0;
  estimated_people: number = 0;
  target_views: number = 0;
  estimated_amount: number = 0;
  estimated_display_amount: string;

  potential_reach_amount: number = 0;
  potential_audience_count: number = 0;
  potential_screen_count: number = 0;
  potential_views: number = 0;

  estimated_screens_percentage: number;
  estimate_people_percentage: number;
  estimate_amount_percentage: number;

  test_number: number = 20;

  basic_info_errors = [];
  targeting_errors = [];
  schedule_errros = [];
  payment_errors = [];


  saving_advert_in_progress: boolean = false;
  place_order_in_progress: boolean = false;

  constructor(router:Router, private utility: UtilityService,
              private dataService: DataService,
              private toastService: ToastService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
  }

  ngOnChanges() {
  }

  getLocationName(id): string{
    for(var i = 0; i < this.targeting_info.locations.length; i++ ){
      if(this.targeting_info.locations[i].id == id ){
        return this.targeting_info.locations[i].name;
      }
    }
    return null;
  }

  getBusinessTypeName(id): string{
    for(var i = 0; i < this.targeting_info.business_types.length; i++ ){
      if(this.targeting_info.business_types[i].id == id ){
        return this.targeting_info.business_types[i].name;
      }
    }
    return null;
  }

  getAudienceTypeName(id): string{
    for(var i = 0; i < this.targeting_info.audience_types.length; i++ ){
      if(this.targeting_info.audience_types[i].id == id ){
        return this.targeting_info.audience_types[i].name;
      }
    }
    return null;
  }

  getTimeSlotName(id): string{
    if(id==1){
      return "Prime time";
    }else if(id==2){
      return "Quite time";
    }else if(id==3){
      return "Early Bird"
    }else{
      return "unknown"
    }
  }

  getPaymentMethodName(id: string): string{
    if(id=="MTNMOMO_UG"){

      return "MTN mobile money";

    } else if(id=="SEYEYA_CREDIT"){

      return "My credits";
    }
    else{
      return "unknown"
    }
  }

  getDayName(day: string): string{
    return this.utility.getDayName(day);
  }

  getDateString(date): string{
    var d = new Date(date);
    return d.toDateString();
  }

  toggleShowErrorDetails(){
    this.show_error_details = !this.show_error_details
  }

  hideAllErrorMessages() {
    this.form_has_errors = false;
  }

  validateAdvert(){

    this.basic_info_errors = this.ad_basic_info.validateRecords();
    this.targeting_errors = this.targeting_info.validate_records();
    this.schedule_errros =  this.schedule_info.validateRecords();
    this.payment_errors = this.payment_info.validateRecords();

    if(this.basic_info_errors.length > 0 ||
        this.targeting_errors.length > 0 ||
        this.schedule_errros.length > 0 ||
        this.payment_errors.length > 0 ){

          this.form_has_errors = true;
      }else{
          this.form_has_errors = false;
          this.submitAdvert();
          /* continue to submit form */
          //  var add_summary = {
          //    basic_info: this.ad_basic_info,
          //    targeting: this.targeting_info,
          //    schedule_info: this.schedue_info,
          //    payment_info: this.payment_info
          //  }
          // console.log( JSON.stringify(add_summary));
      }

  }

  submitAdvert(){
     
    var request_json = this.formulatePlaceAdvertRequestJson();

    this.place_order_in_progress = true;
    this.dataService.placeAdvert(request_json)
      .subscribe(
        response => {
          this.place_order_in_progress = false;
          if(response.success){
            //populate estimates
            var target_reach_params = response.data.target_reach;

            this.advert_estimates.target_reach_amount = target_reach_params.amount;
            this.advert_estimates.target_reach_audience = target_reach_params.audience_count;
            this.advert_estimates.target_reach_screens = target_reach_params.screen_count;
            this.advert_estimates.display_count = response.data.display_count;

            this.ad_basic_info.advert_id = response.data.campaign_id;
            this.ad_basic_info.advertSubmitted = true;
            $("#advertPlacedModal").modal();
            // this.toastService.showToast("success", "Place order", 
            //       "Your advert has been received. Please complete payment for yout advert to be scheduled.");
          }else{
            this.toastService.showToast("error", "Place order failed", "Something went wrong, Please try again.");
          }
        },
        error => {
          this.place_order_in_progress = false;
          this.toastService.showToast("error", "Place order failed", "Something went wrong, Please check your internet connection and try again.")
        }
      );
  }

  formulateAdParams(): any{
    /* creating basic info */
    var basic_info = new BasicInfoFinal
    basic_info.campaign_id = Number(this.ad_basic_info.advert_id);
    basic_info.phone_contact = this.payment_info.account_number;
    basic_info.campaign_name = this.ad_basic_info.campaign_name;
    basic_info.layout_type = this.ad_basic_info.layout_type;
    basic_info.advert_length = Number(this.ad_basic_info.advert_length);
    
    /* create targeting info */
    var targeting_info = new TargetingFinal;

    if(this.targeting_info.target_specific_screen_selected){
      targeting_info.target_screen_codes = 
        this.targeting_info.selected_screens.map( x => x.screen_code );
    }else{

    this.targeting_info.all_locations_selected ? 
      targeting_info.areas = ["1"] : 
      targeting_info.areas = this.targeting_info.selected_locations.map((location) => location.code);
    
    this.targeting_info.all_business_types ?
      targeting_info.business_types = ["1"] :
      targeting_info.business_types = this.targeting_info.selected_business_types.map((bt) => bt.code );
    
    this.targeting_info.all_audience_types ?
      targeting_info.audience_types = ["1"] :
      targeting_info.audience_types = this.targeting_info.selected_audience_types.map((at) => at.code);
    }
    
    /* create schedule info */
    var schedule_info_params = new ScheduleInfoFinal
   // var schedule_detail = new ScheduleDetail
    schedule_info_params.time_slots = [];
  
    if(this.schedule_info.sheduleLaterSelected()){
      schedule_info_params.start_date = this.utility.dateToYMD(this.schedule_info.start_date);
      schedule_info_params.end_date = this.utility.dateToYMD(this.schedule_info.end_date);
      schedule_info_params.schedule_type = APP_CONFIGS.SCHEDULE_TYPE_LATER;

      if(this.schedule_info.prime_time_selected){
          var timeSlot = new TimeslotFinal;
          timeSlot.name = APP_CONFIGS.SCHEDULE_PRIME;
          timeSlot.frequency = Number(this.schedule_info.prime_time_frequency);
          timeSlot.preferred_hour = Number(this.schedule_info.prime_time_prefered_time);
          timeSlot.days = this.schedule_info.prime_time_days.length == 0 ?
              [1,2,3,4,5,6,7] :
              this.schedule_info.prime_time_days.map(Number);
          
           schedule_info_params.time_slots.push(timeSlot);

      }

      if(this.schedule_info.early_bird_selected){
          var timeSlot = new TimeslotFinal;
          timeSlot.name = APP_CONFIGS.SCHEDULE_EARLY;
          timeSlot.frequency = Number(this.schedule_info.early_bird_frequency);
          timeSlot.preferred_hour = Number(this.schedule_info.early_bird_prefered_time);
          timeSlot.days = this.schedule_info.early_bird_days.length == 0 ?
              [1,2,3,4,5,6,7] :
              this.schedule_info.early_bird_days.map(Number);
          
           schedule_info_params.time_slots.push(timeSlot);
      }

      if(this.schedule_info.rush_hour_selected){

        var timeSlot = new TimeslotFinal;
          timeSlot.name = APP_CONFIGS.SCHEDULE_RUSHHOUR;
          timeSlot.frequency = Number(this.schedule_info.rush_hour_frequency);
          timeSlot.preferred_hour = Number(this.schedule_info.rush_hour_prefered_time);
          timeSlot.days = this.schedule_info.rush_hour_days.length == 0 ?
              [1,2,3,4,5,6,7] :
              this.schedule_info.rush_hour_days.map(Number);
          
           schedule_info_params.time_slots.push(timeSlot);
      }

      if(this.schedule_info.lunch_hour_selected){

        var timeSlot = new TimeslotFinal;
          timeSlot.name = APP_CONFIGS.SCHEDULE_LUNCHHOUR;
          timeSlot.frequency = Number(this.schedule_info.lunch_hour_frequency);
          timeSlot.preferred_hour = Number(this.schedule_info.lunch_hour_prefered_time);
          timeSlot.days = this.schedule_info.lunch_hour_days.length == 0 ?
              [1,2,3,4,5,6,7] :
              this.schedule_info.lunch_hour_days.map(Number);
          
           schedule_info_params.time_slots.push(timeSlot);

      }
      
      if(this.schedule_info.late_night_selected){
         var timeSlot = new TimeslotFinal;
          timeSlot.name = APP_CONFIGS.SCHEDULE_LATENIGHT;
          timeSlot.frequency = Number(this.schedule_info.late_night_frequency);
          timeSlot.preferred_hour = Number(this.schedule_info.late_night_prefered_time);
          timeSlot.days = this.schedule_info.late_night_days.length == 0 ?
              [1,2,3,4,5,6,7] :
              this.schedule_info.late_night_days.map(Number);
          
           schedule_info_params.time_slots.push(timeSlot);
      }

      if(this.schedule_info.freebie_selected){
          var timeSlot = new TimeslotFinal;
          timeSlot.name = APP_CONFIGS.SCHEDULE_FREEBIE;
          timeSlot.frequency = Number(this.schedule_info.freebie_frequency);
          timeSlot.preferred_hour = Number(this.schedule_info.freebie_prefered_time);
          timeSlot.days = this.schedule_info.freebie_days.length == 0 ?
              [1,2,3,4,5,6,7] :
              this.schedule_info.freebie_days.map(Number);
          
           schedule_info_params.time_slots.push(timeSlot);
      }

    }else if(this.schedule_info.sheduleNowSelected()){
      schedule_info_params.schedule_type = APP_CONFIGS.SCHEDULE_INSTANT;
      schedule_info_params.start_date = this.utility.dateToYMD(new Date);
      schedule_info_params.end_date = this.utility.dateToYMD(new Date);
      var timeSlot = new TimeslotFinal;
          timeSlot.name = APP_CONFIGS.SCHEDULE_INSTANT;
          timeSlot.frequency = -1;
          timeSlot.preferred_hour = -1;
          timeSlot.days = [];
          
          schedule_info_params.time_slots.push(timeSlot);

    }else{
       schedule_info_params.time_slots = [];
    }

    /* create payment info */
    var payment_info = new PaymentInfoFinal
    payment_info.value_store = this.payment_info.payment_method
    payment_info.account_number = this.payment_info.account_number;

    /* create resources info */
    var resources = []

    if(this.ad_basic_info.hasImageOrVideoResorce()){

      if(this.ad_basic_info.file_upload_type==APP_CONFIGS.RESOURCE_TYPE_VIDEO){
        var resource = new ResourceFinal
          resource.upload_id = this.ad_basic_info.video_upload_id;
          resource.sequence = 1;
          resource.type = APP_CONFIGS.RESOURCE_TYPE_VIDEO;
          resources.push(resource);
      }else{
        this.ad_basic_info.selected_images.forEach(selected_image => {
          var resource = new ResourceFinal
          resource.upload_id = selected_image.id;
          resource.type = APP_CONFIGS.RESOURCE_TYPE_IMAGES;
          resource.sequence = this.ad_basic_info.selected_images.indexOf(selected_image)+1;
          resources.push(resource);
        });
      }
    }

    /* create text fields */
    var text_info = []

    if(this.ad_basic_info.advertTextRequired()){

      var advert_title_text = new TextFinal
      advert_title_text.text = this.ad_basic_info.advert_title;
      advert_title_text.type = APP_CONFIGS.ADVERT_TITLE_TEXT;
      text_info.push(advert_title_text);

      var advert_text_message = new TextFinal;
      advert_text_message.text = this.ad_basic_info.advert_text;
      advert_text_message.type = APP_CONFIGS.ADVERT_MESSAGE_TEXT;
      text_info.push(advert_text_message);
    }

    var request = {
      basic_info: basic_info,
      target_info: targeting_info,
      schedule_info: schedule_info_params,
      payment_info: payment_info,
      resources_info: resources,
      text_info: text_info
    }
    return request;
  }

  formulatePlaceAdvertRequestJson(): string{

    var request = this.formulateAdParams();
    var place_advert_request = {
      method: APP_CONFIGS.PLACE_ADVERT,
      params: request,
      credentials: this.utility.getCredentials()
    }

    return JSON.stringify(place_advert_request);
  }

  queryForPriceReachEstimates() {
   this.form_has_errors = false;
    this.show_loading_spinner = true;
    var queryPriceParams = new QueryPriceParams(this);

    var get_price_request = {
        method: APP_CONFIGS.GET_PRICE,
        params: {
          ad_length: queryPriceParams.getAdvertLength(),
          layout_type: queryPriceParams.getlayoutType(),
          target_screen_codes: queryPriceParams.getTargetScreenCodes(),
          areas: queryPriceParams.getAreas(),
          business_types: queryPriceParams.getLocationTypes(),
          audience_types: queryPriceParams.getAudienceTypes(),
          start_date: queryPriceParams.getStartDate(),
          end_date: queryPriceParams.getEndDate(),
          time_slots: queryPriceParams.getSlots()
        },
        credentials: (new UtilityService).getCredentials()
    }

    console.log("Request: "+JSON.stringify(get_price_request));
    

    this.dataService.queryForPriceEstimates(get_price_request)
      .subscribe(
        response => {

          this.show_loading_spinner = false;

          if(response.success){

            console.log("Response: " + JSON.stringify(response));

            this.estimated_amount = response.data.target_reach.amount;
            this.estimated_people = response.data.target_reach.audience_count;
            this.estimated_screens = response.data.target_reach.screen_count;
            this.target_views      = response.data.target_reach.estimated_views;
            this.estimated_display_amount = addCommasToNumber(this.estimated_amount);
        
            this.potential_reach_amount = response.data.potential_reach.amount;
            this.potential_screen_count = response.data.potential_reach.screen_count;
            this.potential_audience_count = response.data.potential_reach.audience_count;
            this.potential_views = response.data.potential_reach.estimated_views;

            this.estimated_screens_percentage = 
              this.utility.getPercentage(this.estimated_screens, this.potential_screen_count);
            this.estimate_people_percentage = 
              this.utility.getPercentage(this.estimated_people, this.potential_audience_count);
            this.estimate_amount_percentage = 
              this.utility.getPercentage(this.estimated_amount, this.potential_reach_amount);
          }else{
            console.log("QUERY Price response: "+JSON.stringify(response));
          }
        },
        error => {
          console.log("Something went wrong.");
        }
    );
     
  }

  saveAdvert(){

    if(this.ad_basic_info.campaign_name.trim()==""){
      this.toastService.showToast("error", "Save Advert",
         "Please provide a Campaign name to proceed");
      return;
    }
    this.saving_advert_in_progress = true;

    var save_request = this.formulateAdParams();
    var save_advert_request = {
      method: APP_CONFIGS.SAVE_ADVERT,
      params: save_request,
      credentials: this.utility.getCredentials()
    }

    console.log(JSON.stringify(save_advert_request));

    this.dataService.saveAdvert(JSON.stringify(save_advert_request))
      .subscribe(
        response => {
          this.saving_advert_in_progress = false;
          if(response.success){
            this.ad_basic_info.advert_id = response.data.campaign_id;
            this.toastService.showToast("success", "Save advert successful", "Advert has been saved successfully");
          }else{
            this.toastService.showToast("error", "Save advert failed", "Failed to save advert. Please try again");
          }
        },
        error => {
          this.saving_advert_in_progress = false;
          this.toastService.showToast("error", "Save advert failed", "Something went wrong, Please check your internet connection and try again");
        }
      );
  }

  isUserLoggedIn(){
    return this.utility.isUserLoggedIn();
  }

}
