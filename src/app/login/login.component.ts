import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIGS } from '../configs';
import { UserService } from '../services/user.service';
import { UtilityService } from '../services/utility.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService, UtilityService]
})
export class LoginComponent implements OnInit {

  phone_number: string;
  password: string;

  success_authentication: boolean = true;
  login_error = "";
  loadingInProgress: boolean = false;

  constructor(private router: Router,
    private userService: UserService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.router.navigate(['/manage_adverts']);
    }
  }


  loginFormSubmited() {

    if (this.phone_number == undefined ||
      this.phone_number == null ||
      this.phone_number.trim() == "") {

      this.success_authentication = false;
      this.login_error = "Please enter your login phone number";

    } else if (this.password == undefined ||
      this.password == null ||
      this.password.trim() == "") {

      this.success_authentication = false;
      this.login_error = "Please enter your password to continue";

    } else {
      
      this.loadingInProgress = true;
      this.authenticateUser();
    }
  } 

  authenticateUser(): void {
    this.userService.authenticateUser(this.phone_number, this.password)
      .subscribe(
      response_data => this.handleAuthenticationResponse(response_data),
      error => this.handleErrorResponse(error));
  }

  handleAuthenticationResponse(response) {

    this.loadingInProgress = false;

    console.log(JSON.stringify(response));

    if (response.success) {

      var token = response.data.login_info.token_id;
      var current_user = {
        user_id: response.data.login_info.user_id,
        first_name: response.data.personal_info.first_name,
        account_status: response.data.login_info.account_status
      }

      localStorage.setItem(APP_CONFIGS.TOKEN_REFERENCE_KEY, token);
      localStorage.setItem(APP_CONFIGS.CURRENT_USER_REFERENCE_KEY, JSON.stringify(current_user));

      this.success_authentication = true;
      this.router.navigate(['/manage_adverts']);

    } else {

      this.success_authentication = false;
      this.login_error = this.utilityService.extractErrorMessages(response);
    }
  }

  handleErrorResponse(error) {
    
    this.loadingInProgress = false;
    this.success_authentication = false;
    this.login_error = "Something went wrong. Please try again"
  }

}
