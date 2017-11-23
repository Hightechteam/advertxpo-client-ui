import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/timeout";
import "rxjs/add/observable/throw";

import { APP_CONFIGS } from '../configs';
import { UtilityService } from '../services/utility.service';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  currentUser() {
    if (this.isUserLoggedIn()) {
      return JSON.parse(localStorage.getItem(APP_CONFIGS.CURRENT_USER_REFERENCE_KEY))
    } else {
      return null;
    }
  }
  authenticateUser(user_id, password) {

    var request_body = {
      method: APP_CONFIGS.USER_AUTHENITCATION,
      params: {
        user_id: user_id,
        password: password,
        user_type: "CLIENT"
      },
      credentials: (new UtilityService).getCredentials()
    }

    console.log(JSON.stringify(request_body));

    return this.http.post(APP_CONFIGS.API_URL,
      JSON.stringify(request_body))
      .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
      .map((response: Response) => response.json())
      .catch(this.error_handler);
  }

  registerNewUser(
    first_name: string, phone_numner: string,
    password: string) {

    var request_body = {
      method: APP_CONFIGS.CREATE_ACCOUNT,
      params: {
        personal_info: {
          first_name: first_name,
          primary_phone: phone_numner,
          preferred_password: password
        },
        additional_info: {
          user_type: "CLIENT",
          agreed_to_terms: true
        }
      },
      credentials: (new UtilityService).getCredentials(),
      
    }

    console.log(JSON.stringify(request_body));

    return this.http.post(APP_CONFIGS.API_URL,
      JSON.stringify(request_body))
      .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
      .map((response: Response) => response.json())
      .catch(this.error_handler);

  }

  authenticateGuestUser() {
    var request_body = {
      method: APP_CONFIGS.GUEST_LOGIN,
      params: {
        user_type: "CLIENT",
        agreed_to_terms: true
      },
      credentials: (new UtilityService).getCredentials()
    }

    console.log(JSON.stringify(request_body));

    return this.http.post(APP_CONFIGS.API_URL,
      JSON.stringify(request_body))
      .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
      .map((response: Response) => response.json())
      .catch(this.error_handler);
  }

  isTokenSet(): boolean {
    if (localStorage.getItem(APP_CONFIGS.TOKEN_REFERENCE_KEY)) {
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    if (localStorage.getItem(APP_CONFIGS.CURRENT_USER_REFERENCE_KEY)) {
      return true;
    } else {
      return false;
    }
  }

  verifyAccount(otp: string) {
    var current_user = this.currentUser();

    var request_body = {
      method: APP_CONFIGS.VERIFY_ACCOUNT,
      params: {
        user_id: current_user.user_id,
        otp: otp
      },
      credentials: (new UtilityService).getCredentials()
    }

    console.log(JSON.stringify(request_body));

    return this.http.post(APP_CONFIGS.API_URL,
      JSON.stringify(request_body))
      .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
      .map((response: Response) => response.json())
      .catch(this.error_handler);

  }

  resendOTP(){
    var current_user = this.currentUser();

    var request_body = {
      method: APP_CONFIGS.RESEND_OTP,
      params: {
        user_id: current_user.user_id,
        primary_phone: ""
      },
      credentials: (new UtilityService).getCredentials()
    }

    console.log(JSON.stringify(request_body));

    return this.http.post(APP_CONFIGS.API_URL,
      JSON.stringify(request_body))
      .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
      .map((response: Response) => response.json())
      .catch(this.error_handler);
  }

  error_handler(error: Response) {
    return Observable.throw(error || "Server error");
  }

}
