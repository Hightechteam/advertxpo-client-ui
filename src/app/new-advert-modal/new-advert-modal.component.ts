import { APP_CONFIGS } from './../configs';
import { UserService } from './../services/user.service';
import { ToastService } from './../services/toast.service';
import { UtilityService } from './../services/utility.service';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-new-advert-modal',
  templateUrl: './new-advert-modal.component.html',
  styleUrls: ['./new-advert-modal.component.scss'],
  providers: [UserService, ToastService, UtilityService]
})
export class NewAdvertModalComponent implements OnInit {

  public authenticating_guest_in_progress: boolean = false;

  constructor(
    private utilityService: UtilityService,
    private userService: UserService,
    private toastService: ToastService) { }

  ngOnInit() {
  }

  public hideGuestModal(): void {
    $("#guestLoginModal").modal("hide");
  }

  public showGuestModal(): void {
    $("#guestLoginModal").modal();
  }

  public proceedAnywayClicked(): void {

    this.authenticating_guest_in_progress = true;
    this.userService.authenticateGuestUser()
      .subscribe(
      response => {
        this.authenticating_guest_in_progress = false;
        if (response.success) {
          var token = response.data.token_id;
          localStorage.setItem(APP_CONFIGS.TOKEN_REFERENCE_KEY, token);

          this.hideGuestModal();
        } else {
          this.toastService.showToast("error", "Error", this.utilityService.extractErrorMessages(response));
        }
      },
      error => {
        this.authenticating_guest_in_progress = false;
        this.toastService.showToast("error", "Error", "please check the internet connection and try again");
      }
      );
  }

}
