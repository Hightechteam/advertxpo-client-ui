import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { ApiErrorResponse } from './../models/api-error-response.interface';
import { ApiSuccessResponse } from './../models/api-success-response.interface';
import { AppService } from './../services/app.service';
import { UtilityService } from './../services/utility.service';
import { APP_CONFIGS } from './../configs';
import { CreateLocationRequest } from './../models/create-location-request.model';
import { ValidationService } from './../services/validation.service';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { Component, Pipe, OnInit } from '@angular/core';

export interface CheckBox {
  id: number;
  checked: boolean;
  value?: string;
}

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {

  private createLocRequest: CreateLocationRequest;
  private createLocResponse: ApiSuccessResponse | ApiErrorResponse;
  public createLocationForm: FormGroup;

  /*
  maximum number of audience categories to choose
   */
  maxAudienceSelection: number = 3;

  /*
  maximum number of location categories to choose
   */
  maxLocationCatsSelection: number = 2;

  audienceOptions: CheckBox[] = [
    { id: 1, value: "Traders", checked: false },
    { id: 2, value: "University students", checked: false },
    { id: 3, value: "Corporates", checked: false },
    { id: 4, value: "Upscale", checked: false },
    { id: 5, value: "Secondary/primary kids", checked: false },
    { id: 6, value: "Politicians", checked: false },
    { id: 7, value: "Boda-boda cyclists", checked: false },
    { id: 8, value: "Taxi drivers", checked: false },
    { id: 9, value: "Expats", checked: false },
    { id: 10, value: "Business people", checked: false },
    { id: 11, value: "Hawkers", checked: false },
    { id: 12, value: "Others/specify", checked: false }
  ]

  locationServiceOptions: CheckBox[] = [
    { id: 1, value: "Sports betting", checked: false },
    { id: 2, value: "Restaurant", checked: false },
    { id: 3, value: "Hospital", checked: false },
    { id: 4, value: "Salon", checked: false },
    { id: 5, value: "Ordinary Bar", checked: false },
    { id: 6, value: "Sports Bar", checked: false },
    { id: 7, value: "Night club", checked: false },
    { id: 8, value: "University hall/hostel", checked: false },
    { id: 9, value: "Super market", checked: false },
    { id: 10, value: "Small shop", checked: false },
    { id: 11, value: "Community hall", checked: false },
    { id: 12, value: "Local cinema/kibanda", checked: false },
    { id: 13, value: "Airport", checked: false },
    { id: 14, value: "Hotel", checked: false },
    { id: 15, value: "Casino", checked: false },
    { id: 16, value: "Others/specify", checked: false }
  ]

  numScreens: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30, 40, 50, 100];

  constructor(private appService: AppService, private utilityService: UtilityService, private location: Location, private userService: UserService, private router: Router) {

    if (!userService.isUserLoggedIn()) {
      console.log("User not logged in here in constructor")
      router.navigate(['/login']);
    }
  }


  ngOnInit() { 

    this.createLocationForm = new FormGroup({

      locationInfo: new FormGroup({

        phoneContact: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(12), ValidationService.phoneNumberValidator]),
        businessName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        screens: new FormControl('', [Validators.required])
        //firstname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
      }),
      audienceTypes: this.buildCheckBoxFormArray(this.audienceOptions),
      locationServices: this.buildCheckBoxFormArray(this.locationServiceOptions)
      //audienceTypes: new FormControl('', [Validators.required]),
    });
  }

  /**
   * https://netbasal.com/handling-multiple-checkboxes-in-angular-forms-57eb8e846d21
   * https://www.reddit.com/r/Angular2/comments/61t7jz/reactive_forms_handling_multiple_checkboxes/#bottom-comments
   * 
   * @param checkBoxes 
   */
  buildCheckBoxFormArray(checkBoxes: CheckBox[]): FormArray {

    let formArray: FormGroup[] = checkBoxes.map(
      (item) => {
        return new FormGroup({ id: new FormControl(item.id), checked: new FormControl(item.checked) });
      });

    return new FormArray(formArray);
  }

  get audienceTypes(): FormArray {

    return <FormArray>this.createLocationForm.get('audienceTypes');
  }

  get locationServices(): FormArray {

    return <FormArray>this.createLocationForm.get('locationServices');
  }
  /**
   * Get selected audience ids
   
  get selectedAudienceIds() {

    return this.audienceOptions.filter(opt => opt.checked == true).map(opt => opt.id);
  }*/

  /**
   * Get selected location category ids
   
  get selectedLocationIds() {

    return this.locationServiceOptions.filter(opt => opt.checked == true).map(opt => opt.id);
  }*/

  onLocServicesUpdate(event: Event): void {

    console.log("Loc services updated: " + event);

  }

  onSubmit(createLocationForm: FormGroup): void {

    let mainFormValue: any = createLocationForm.value;
/* 
    console.log("Form submitted: \n\n" + JSON.stringify(createLocationForm.value));
    //the following are the same::
    console.log("location: " + JSON.stringify(createLocationForm.controls.locationInfo.value));
    console.log("location: " + JSON.stringify(createLocationForm.controls['locationInfo'].value));

    //controls approach
    let locInfo: FormGroup = <FormGroup>createLocationForm.controls.locationInfo;
    console.log("Phone contact 1: " + locInfo.controls.phoneContact.value);
    //dot approach
    console.log("Phone contact 2: " + <string>(mainFormValue.locationInfo.phoneContact));
    //console.log("Phone contact 2: " + <FormGroup>(createLocationForm.controls.locationInfo).controls.phoneContact.value;
    //get approach
    console.log("aud types 1: " + JSON.stringify(this.createLocationForm.get('audienceTypes').value));
    //controls approach
    let audTypes: FormArray = <FormArray>createLocationForm.controls.audienceTypes;
    console.log("aud types 2: " + JSON.stringify(audTypes.value));
    //dot approach
    console.log("aud types 3: " + JSON.stringify(<CheckBox[]>createLocationForm.value.audienceTypes));
    //dot approach
    console.log("first item's ID: " + createLocationForm.value.audienceTypes[0].id);
 */

    //let's use the dot approach going forward - looks straight forward

    let checkedAudiences: CheckBox[] = <CheckBox[]>mainFormValue.audienceTypes;
    let checkedLocations: CheckBox[] = <CheckBox[]>mainFormValue.locationServices;
    let checkedAudienceIds: number[] = this.retrieveCheckedItemIds(checkedAudiences);
    let checkedLocationIds: number[] = this.retrieveCheckedItemIds(checkedLocations);

    console.log("Audience types: " + checkedAudienceIds.join(','));

    this.createLocRequest = Object.assign({}, {

      method: APP_CONFIGS.CREATE_NEW_LOCATION,
      credentials: this.utilityService.getCredentials(),
      params: {
        location_info: {
          phone_contact: <string>(mainFormValue.locationInfo.phoneContact),
          business_name: <string>(mainFormValue.locationInfo.businessName),
          screens: (<number>(mainFormValue.locationInfo.screens)).valueOf()
        },
        audience_types: checkedAudienceIds,
        location_services: checkedLocationIds
      }
    });

    console.log("Request : " + JSON.stringify(this.createLocRequest));
    //we can't return from http here - cuz processing is async - so process the response from the observable callback
    this.appService.postRequestAndSubscribe(this.createLocRequest);

  }

  /**
   * Retrieve checked item ids from a form's check boxes
   * @param formArrayValue 
   */
  public retrieveCheckedItemIds(formArrayValue: CheckBox[]): number[] {

    //filter only checked
    let checkedItems: CheckBox[] = <CheckBox[]>(formArrayValue).filter(
      (x) => {
        return x.checked
      });

    //map out checked ids
    let checkedItemIds: number[] = checkedItems.map((item) => {
      return item.id
    }
    );
    return checkedItemIds;
  }

}
