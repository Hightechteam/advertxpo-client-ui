import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { UtilityService } from '../services/utility.service';
import { DataService } from '../services/data.service';
import { APP_CONFIGS } from '../configs';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss'],
  providers: [ ToastService, UtilityService, DataService ]
})
export class ManageAccountComponent implements OnInit {

  user_id: string="";
  first_name: string="";
  second_name: string="";
  other_phone_number: string="";
  email_address: string="";

  business_code: string = "";
  business_name: string ="";
  business_type: string ="";
  business_location: string="";
  target_audience: string="";

  payment_method: string="";
  account_number: string="";

  saving_personal_info_in_progress: boolean = false;
  saving_business_info_in_progress: boolean = false;
  saving_payment_info_in_progress: boolean = false;
  
  constructor(private toastService: ToastService, 
    private utilityService: UtilityService,
    private dataService: DataService) {      
  }
  ngOnInit() {
  }

  savePersonalInfoClicked(){
    this.saving_personal_info_in_progress = true;
    this.sendRequestToServer();
  }

  saveBusinessInformation(){
    this.saving_business_info_in_progress = true;
    this.sendRequestToServer();
  }

  savePaymentInformation(){
    this.saving_payment_info_in_progress = true;
    this.sendRequestToServer();
  }

  sendRequestToServer(){
    var request = this.formulateRequestToServer(); 
    this.dataService.saveAccountInformation(JSON.stringify(request))
    .subscribe(
      response => {
        this.hideSpinners();
        if(response.success){
          this.toastService.showToast("success", "Save", "Your profile was successfully updated");
        }else{
          this.toastService.showToast("error", "Save", "Failed to update account information, please try again");
        }
      },
      error => {
        this.hideSpinners();
        this.toastService.showToast("error", "Save", "Something went wrong, please check the connectivity and try again");
      }
    );
  }

  formulateRequestToServer(){
    var request = {
      method: APP_CONFIGS.UPDATE_ACCOUNT,
      credentials: this.utilityService.getCredentials,
      params: this.formulateRequestParams(),
    }
    console.log(JSON.stringify(request));
    return request;
  }

  formulateRequestParams(){
    var params = {

      personal_info: {
        user_id: this.user_id,
        first_name: this.first_name,
        second_name: this.second_name,
        email_address: this.email_address,
        other_phone: this.other_phone_number
      },

      business_info: {
        business_code: this.business_code,
        business_name: this.business_name,
        business_type: this.business_type,
        business_location: this.business_location,
        target_audience: this.target_audience
      },

      account_info: {
        account_number: this.account_number,
        value_store: this.payment_method
      }

    }

    return params;
  }

  hideSpinners(){
    this.saving_business_info_in_progress = false;
    this.saving_personal_info_in_progress = false;
    this.saving_payment_info_in_progress = false;
  }

}
