import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIGS } from '../configs';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.scss'],
  providers: [ToastService, UserService]
})
export class ConfirmOtpComponent implements OnInit {

  otp: string="";

  verify_account_in_progress: boolean = false;
  resending_otp_in_progress: boolean = false;

  constructor(private router: Router, private userService: UserService, 
    private toastService: ToastService) { }

  ngOnInit() {
  }

  confirmOTP(){
    if(this.otp.trim()==""){
      this.toastService.showToast("error", "One time PIN", "Please enter PIN");
    }else{
      this.verify_account_in_progress = true;
      this.userService.verifyAccount(this.otp)
      .subscribe(
        response => {
          this.verify_account_in_progress = false;
          if(response.success){
             this.router.navigate(['/manage_adverts']);
          }else{
            this.toastService.showToast("error", "One time PIN", "Wrong OTP, Please try again");
          }
        },
        error =>{
          this.verify_account_in_progress = false;
          this.toastService.showToast("error", "One time PIN", "Something went wrong, Please check your connection and try again");
        }
      );
    }
  }

  resendOTP(){
    this.resending_otp_in_progress = true;
    this.userService.resendOTP()
    .subscribe(
      response => {
        this.resending_otp_in_progress = false;
        if(response.success){
          this.toastService.showToast("success", "Resend One time PIN successful", "A One time Pin has been sent to your phone.");
        }else{
          this.toastService.showToast("error", "Resend One time PIN", "Failed to resend PIN, Please try again");
        }
      },
      error => {
        this.resending_otp_in_progress = false;
        this.toastService.showToast("error", "Resend One time PIN", "Something went wrong, Please check your connection and try again");
      }
    );
  }

}
