import { AppService } from './../services/app.service';
import { UtilityService } from './../services/utility.service';
import { APP_CONFIGS } from './../configs';
import { ContactUsRequest } from './../models/contact-us-request.model';
import { ApiSuccessResponse } from './../models/api-success-response.interface';
import { ApiErrorResponse } from './../models/api-error-response.interface';
import { ValidationService } from './../services/validation.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  public contactUsForm: FormGroup;
  private contactUsRequest: ContactUsRequest;
  private contactUsResponse: ApiSuccessResponse | ApiErrorResponse;

  constructor(private appService: AppService, private utilityService: UtilityService) { }

  ngOnInit() { 

    this.contactUsForm = new FormGroup({

      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phoneContact: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(12), ValidationService.phoneNumberValidator]), //outside numbers are eliminated
      message: new FormControl('', [Validators.required, Validators.minLength(2)])

    });

  }

  onSubmit(contactUsForm: FormGroup) {

    let formValues: any = contactUsForm.value;

    this.contactUsRequest = Object.assign({}, {

      method: APP_CONFIGS.CONTACT_US,
      credentials: this.utilityService.getCredentials(),
      params: {
        first_name: <string>(formValues.firstName),
        last_name: <string>(formValues.lastName),
        phone_contact: <string>(formValues.phoneContact),
        email: <string>(formValues.email),
        message: <string>(formValues.message)
      }
    });

    console.log("Contact-us Request : " + JSON.stringify(this.contactUsRequest));
    //we can't return from http here - cuz processing is async - so process the response from the observable callback
    this.appService.postRequestAndSubscribe(this.contactUsRequest);

  }

}
