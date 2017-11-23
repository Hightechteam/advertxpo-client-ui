import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { UserService } from '../services/user.service';

import { APP_CONFIGS } from '../configs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [UtilityService, UserService]
})
export class SignupComponent implements OnInit {

  loadingInProgress: boolean = false;

  signUpError: boolean = false;
  signup_error_message: string = "";

  first_name: string = "";
  phone_number: string = "";
  password: string = "";
  password_confirmation:string = "";
  isTermsAccepted:boolean = false;

  constructor(private router: Router, private utility: UtilityService,
    private userService: UserService) { }

  ngOnInit() {
    if(this.userService.isUserLoggedIn()){
       this.router.navigate(['/manage_adverts']);
    }
  }

  signUpFormSubmitted() {

    console.log("Is terms accepted here: " + this.isTermsAccepted);

    this.validateEntries();

    if (!this.signUpError) {
      this.loadingInProgress = true;
      this.sendCreateAccountRequest();
    }
  }

  validateEntries() {
    if (this.first_name.trim() == "") {
      
      this.signUpError = true;
      this.signup_error_message = "Please provide a valid first name"
    
    } else if (!this.utility.validateMsisdn(this.phone_number)) {
      
      this.signUpError = true;
      this.signup_error_message = "Please provide a valid phone number"
    
    } else if (this.password.trim().length < 6) {
      
      this.signUpError = true;
      this.signup_error_message = "Please provide a valid password"
    
    } else if (this.password != this.password_confirmation) {
      
      this.signUpError = true;
      this.signup_error_message = "Passwords entered do not match, Please try again.";
      this.password = "";
      this.password_confirmation = "";

    } else if(!this.isTermsAccepted){ 

      console.log("Is terms accepted: " + this.isTermsAccepted);
      
      this.signUpError = true;
      this.signup_error_message = "Please read and accept the terms to continue";

    } else {
      this.signUpError = false;
      this.signup_error_message = "";
    }
  }

  sendCreateAccountRequest() {
    this.userService.registerNewUser(this.first_name,
      this.phone_number, this.password)
      .subscribe((response) => this.handleCreateAccountResponse(response),
      (error) => this.handleErrorResponse(error)
      )
  }

  handleCreateAccountResponse(response) {
    this.loadingInProgress = false;

    if (response.success) {
      var token = response.data.token_id;
      var current_user = {
        user_id: response.data.user_id,
        first_name: response.data.first_name,
        account_status: response.data.account_status
      }

      localStorage.setItem(APP_CONFIGS.TOKEN_REFERENCE_KEY, token);
      localStorage.setItem(APP_CONFIGS.CURRENT_USER_REFERENCE_KEY,
        JSON.stringify(current_user));

      this.signUpError = false;
      this.signup_error_message = "";

      this.router.navigate(['/confirm_otp']);

    } else {
      //failed to create account
      this.signUpError = true;
      this.signup_error_message = this.utility.extractErrorMessages(response);
    }
  }

  handleErrorResponse(error) {

    this.loadingInProgress = false;

    this.signUpError = true;
    this.signup_error_message = "Something went wrong,  Please check your connection and try again"
  }

}
