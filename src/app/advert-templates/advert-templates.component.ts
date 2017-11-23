import { UtilityService } from './../services/utility.service';
import { ToastService } from './../services/toast.service';
import { NewAdvertModalComponent } from './../new-advert-modal/new-advert-modal.component';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

declare var $: any;

@Component({
  selector: 'app-advert-templates',
  templateUrl: './advert-templates.component.html',
  styleUrls: ['./advert-templates.component.scss'],
  providers: [DataService, UserService, ToastService, UtilityService]
})
export class AdvertTemplatesComponent implements OnInit {

  templates_loading: boolean = false;
  failed_to_load_templates: boolean = false;
  newAdModal: NewAdvertModalComponent;

  templates: any[];


  constructor(
    private dataService: DataService,
    private toastService: ToastService,
    private utilityService: UtilityService,
    private userService: UserService) {

    this.newAdModal = new NewAdvertModalComponent(utilityService, userService, toastService);

  }

  ngOnInit() {

    if (!this.userService.isTokenSet()) {

      this.newAdModal.showGuestModal();

    } else {

      this.templates_loading = true;
      this.fetchTemplateAdverts();
    }
  }

  fetchTemplateAdverts() {
    this.dataService.getTemplateAdverts()
      .subscribe(
      response => {
        this.templates_loading = false;
        if (response.success) {
          this.templates = response.data;
        } else {
          this.failed_to_load_templates = true;
        }
      },
      error => {
        this.templates_loading = false;
        this.failed_to_load_templates = true;
      }
      );
  }

}
