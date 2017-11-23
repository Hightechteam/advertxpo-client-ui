export class TargetingInfo{

  target_screen_code: string = "";
  target_specific_screen_selected: boolean = false;

  areas_search_key: string = "";

  screens_returned_from_search_results = []
  selected_screens = []

  all_locations_selected: boolean = false;
  locations = [];
  selected_locations = [];

  all_business_types: boolean = false;
  business_types = [];
  selected_business_types = [];

  all_audience_types: boolean = false;
  audience_types = [];
  selected_audience_types = [];

  locationFileHasErrors: boolean = false;
  businessTypeFieldHasErrors: boolean = false;
  audienceTypeFieldHasErrors: boolean = false;
  screenCodesFieldHasError: boolean = false;

  errors = [];

  validate_records(){
    this.errors = [];
    if(this.target_specific_screen_selected){
      this.validateScreenCodes();
    }else{
      this.validate_locations();
      this.validate_business_types();
      this.validate_audience_types();
    }
    return this.errors;
  }

  validate_locations(){
    if(this.all_locations_selected ||
        this.selected_locations.length > 0){
      this.locationFileHasErrors = false;
    }else{
      this.locationFileHasErrors = true;
      this.errors.push("Please select at least one location");
    }
  }

  validate_business_types(){
    if(this.all_business_types ||
        this.selected_business_types.length > 0){
      this.businessTypeFieldHasErrors = false;
    }else{
      this.businessTypeFieldHasErrors = true;
      this.errors.push("Please select atleast one business type");
    }
  }

  validate_audience_types(){
    if(this.all_audience_types ||
        this.selected_audience_types.length > 0){
      this.audienceTypeFieldHasErrors = false;
    }else{
      this.audienceTypeFieldHasErrors = true;
      this.errors.push("Please select atleast one audience type");
    }
  }

  validateScreenCodes(){
    if(this.selected_screens == undefined ||
        this.selected_screens.length < 1 ){
        this.screenCodesFieldHasError = true;
        this.errors.push("Please provide valid values for screen codes");
    }else{
      this.screenCodesFieldHasError = false;
    }
  }

}