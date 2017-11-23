import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilityService } from '../services/utility.service';
import { TargetingInfo } from '../models/targeting_info.model';

import { APP_CONFIGS } from '../configs';

declare var $:any;

@Component({
  selector: 'app-targeting',
  templateUrl: './targeting.component.html',
  styleUrls: ['./targeting.component.scss'],
  providers: [DataService, UtilityService]
})
export class TargetingComponent implements OnInit, AfterViewInit  {

  @Output() broadcastTargetingInfo: EventEmitter<TargetingInfo> = new EventEmitter<TargetingInfo>();

  targetingInfo: TargetingInfo = new TargetingInfo;

  locations_loaded: boolean = false;
  business_types_loaded: boolean = false;
  audience_types_loaded: boolean = false;
  screens_loaded: boolean = false;

  hide_screen_search_box: boolean = true;
  hide_locations_search_box: boolean = true;
  hide_business_type_seach_box: boolean = true;
  hide_audience_type_search_box: boolean = true;

  fatal_error_occured: boolean = false;

  constructor(private dataService: DataService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.initializeTargetingFields();
    this.passTargetingParentComponent();
  }

  passTargetingParentComponent(){
    this.broadcastTargetingInfo.emit(this.targetingInfo);
  }


  ngAfterViewInit(){
    var main_class_ref = this;
    
    /* Detect click events, this helps to closed the search box when the user clicks out of the doc*/
    $(window).click(function() {
      main_class_ref.hide_screen_search_box = true;
      main_class_ref.hide_locations_search_box = true;
      main_class_ref.hide_business_type_seach_box = true;
      main_class_ref.hide_audience_type_search_box = true;

      main_class_ref.targetingInfo.target_screen_code = "";

    });

    $('.stop-event-propagation').click(function(event){
      event.stopPropagation();
    });

  }

  initializeTargetingFields(){
    this.initializeLocationsField();
    this.initializeBusinessTypes();
    this.initializeAudienceTypes();
    this.fetchScreens();
  }

  initializeLocationsField(){

    this.dataService.fetchLocatonInfomation()
      .subscribe(
        response => {
          if(response.success){
            this.targetingInfo.locations = response.data;
            this.locations_loaded = true;
             console.log("Locations loaded successfully");
             console.log(JSON.stringify(response.data));
          }else{
            this.fatal_error_occured = true;
            console.log("Locations: Server returned false");
          }
        },
        error => {
          console.log("Failed to get areas");
          this.fatal_error_occured = true;
        }
      );
  }

  initializeBusinessTypes(){
     this.dataService.fetchBusinessTypesInfomation()
      .subscribe(
        response => {
          if(response.success){
            this.targetingInfo.business_types = response.data;
            this.business_types_loaded = true;
             console.log("Business types loaded successfully");
             console.log(JSON.stringify(response.data));
          }else{
            this.fatal_error_occured = true;
            console.log("Business Types: Server returned false" );
          }
        },
        error => {
          this.fatal_error_occured = true;
          //todo when failed to load business types
        }
      );
  }

  initializeAudienceTypes(){

    this.dataService.fetchAudienceTypesInfomation()
      .subscribe(
        response => {
          if(response.success){
            this.targetingInfo.audience_types = response.data;
            this.audience_types_loaded = true;
            console.log("Audiences loaded successfully");
            console.log(JSON.stringify(response.data));
          }else{
            this.fatal_error_occured = true;
            console.log("Audience: Server returned false");
          }
        },
        error => {
          this.fatal_error_occured = true;
          //todo when failed to load audiences
        }
      );
  }

  fetchScreens(){
    this.dataService.fetchScreens()
      .subscribe(
        response => {
          console.log(JSON.stringify(response));
          if(response.success){
            this.screens_loaded = true;
            this.targetingInfo.screens_returned_from_search_results = response.data;
             console.log("Screens loaded successfully");
          }else{
            console.log("Fetch screens: Server returned false");
          }
        },
        error => {
           console.log("Fetch screens: Something went wrong");
        }
      );
  }

  loadingDone(): boolean{
    if(this.locations_loaded &&
        this.audience_types_loaded &&
        this.business_types_loaded &&
        this.screens_loaded ){
      $("#location-fields").show();
      return true;
    }else{
      return false;
    }
  }

  toggleLocationSelectField(){
      this.targetingInfo.validate_locations();
      this.passTargetingParentComponent();
  }

  toggleBusinessTypesSelectField(){
      this.targetingInfo.validate_business_types();
      this.passTargetingParentComponent();
  }

  toggleAudienceTypesSelectField(){
      this.targetingInfo.validate_audience_types();
      this.passTargetingParentComponent();
  }

  screenCodesChanged(){
    this.hide_screen_search_box = false;
    this.passTargetingParentComponent();
    // this.broadCastUpdateEstimatesToParent();
    this.targetingInfo.screenCodesFieldHasError = false;
  }

  screenSelectedFromSearch(screen){

    if(this.targetingInfo.selected_screens.indexOf(screen)== -1){
      this.targetingInfo.selected_screens.push(screen);
    }

    this.targetingInfo.screens_returned_from_search_results.
      splice(this.targetingInfo.screens_returned_from_search_results.indexOf(screen), 1);
      this.passTargetingParentComponent();
  }

  removeSelectedScreen(screen){
    this.targetingInfo.selected_screens.
      splice(this.targetingInfo.selected_screens.indexOf(screen), 1);

    this.targetingInfo.screens_returned_from_search_results.push(screen);

      if(this.targetingInfo.selected_screens.length < 1){
        this.targetingInfo.screenCodesFieldHasError = true;
      }
      this.passTargetingParentComponent();
  }

  selectLocation(location){
    if(this.targetingInfo.selected_locations.indexOf(location)== -1){
      this.targetingInfo.selected_locations.push(location);
    }
    this.targetingInfo.locations.splice(this.targetingInfo.locations.indexOf(location), 1);
    this.targetingInfo.locationFileHasErrors = false;
    this.passTargetingParentComponent();
  }

  removeLocation(location){
    this.targetingInfo.selected_locations.splice(this.targetingInfo.selected_locations.indexOf(location), 1);
    this.targetingInfo.locations.push(location);
    this.passTargetingParentComponent();
  }

  locationSearchKeyChange(){
    this.hide_locations_search_box = false;
  }

  locationSearchFocus(){
    this.hide_locations_search_box = false;
  }

  businessTypeSearchKeyChange(){
    this.hide_business_type_seach_box = false;
  }

  businessTypeSearchFocus(){
    this.hide_business_type_seach_box = false;
  }

  selectBusinessType(businessType){
    if(this.targetingInfo.selected_business_types.indexOf(businessType)== -1){
      this.targetingInfo.selected_business_types.push(businessType);
    }
    this.targetingInfo.business_types.splice(this.targetingInfo.business_types.indexOf(businessType), 1);
    this.targetingInfo.businessTypeFieldHasErrors = false;
    this.passTargetingParentComponent();
  }

  removeBusinessType(businessType){
    this.targetingInfo.selected_business_types.splice(this.targetingInfo.selected_business_types.indexOf(businessType), 1);
    this.targetingInfo.business_types.push(businessType);
    this.passTargetingParentComponent();
  }

  audienceTypeSearchKeyChange(){
    this.hide_audience_type_search_box = false;
  }

  audienceTypeSearchFocus(){
    this.hide_audience_type_search_box = false;
  }

  selectaudienceType(audienceType){
    if(this.targetingInfo.selected_audience_types.indexOf(audienceType)== -1){
      this.targetingInfo.selected_audience_types.push(audienceType);
    }
    this.targetingInfo.audience_types.splice(this.targetingInfo.audience_types.indexOf(audienceType), 1);
    this.targetingInfo.audienceTypeFieldHasErrors = false;
    this.passTargetingParentComponent();
  }

  removeaudienceType(audienceType){
    this.targetingInfo.selected_audience_types.splice(this.targetingInfo.selected_audience_types.indexOf(audienceType), 1);
    this.targetingInfo.audience_types.push(audienceType);
    this.passTargetingParentComponent();
  }

  reloadPage(){
    this.utilityService.reloadPage();
  }

  
}
