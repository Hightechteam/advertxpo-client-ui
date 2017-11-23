import { NewAdvertModalComponent } from './../new-advert-modal/new-advert-modal.component';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ScheduleType } from '../enums/schedule-type.enum';

import { BasicAdInfo } from '../models/basic_ad_info.model';
import { TargetingInfo } from '../models/targeting_info.model';
import { ScheduleInfo } from '../models/schedule_info.model';
import { PaymentInfo } from '../models/payment_info.model';

import { UserService } from "../services/user.service";
import { ToastService } from '../services/toast.service';
import { UtilityService } from '../services/utility.service';
import { APP_CONFIGS } from '../configs';

import { PreviewComponent } from '../preview/preview.component';

declare var $: any;

@Component({
  selector: 'app-newadvert',
  templateUrl: './newadvert.component.html',
  styleUrls: ['./newadvert.component.scss'],
  providers: [UserService, ToastService, UtilityService]
})

export class NewadvertComponent implements OnInit, AfterViewInit {

  @ViewChild(PreviewComponent) previewComponentRef: PreviewComponent;

  ad_basic_info: BasicAdInfo;
  targeting_info: TargetingInfo;
  schedule_info: ScheduleInfo;
  payment_info: PaymentInfo;
  newAdModal: NewAdvertModalComponent;

  failed_to_load_advert_form: boolean = false;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private utilityService: UtilityService) {

    this.newAdModal = new NewAdvertModalComponent(utilityService, userService, toastService);
  }

  ngOnInit() {
    if (!this.userService.isTokenSet()) {
      this.newAdModal.showGuestModal();
    }
  }

  ngAfterViewInit() {
  }

  updateBasicAdInfo(_ad_basic_info: BasicAdInfo) {
    this.ad_basic_info = _ad_basic_info;
  }

  updateTargetingInfo(_ad_targeting_info: TargetingInfo) {
    this.targeting_info = _ad_targeting_info;
    if (this.previewComponentRef != undefined) {
      this.previewComponentRef.queryForPriceReachEstimates();
    }
  }

  updateScheduleInfo(_schedule_info: ScheduleInfo) {
    this.schedule_info = _schedule_info;
    if (this.previewComponentRef != undefined) {
      this.previewComponentRef.queryForPriceReachEstimates();
    }
  }

  updatePaymentInfo(_payment_info: PaymentInfo) {
    this.payment_info = _payment_info;
  }

  updateReachEstimates() {
    console.log("Updating estimates");
    this.previewComponentRef.queryForPriceReachEstimates();
  }

  showNewAdvertForm() {
    if (this.ad_basic_info == null || this.ad_basic_info == undefined) {
      return true;
    } else if (!this.ad_basic_info.advertSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  scrollToBasicInfo() {
    try {
      $('html, body').animate({
        scrollTop: $("#basic_info_card").offset().top - 100
      }, 1000);
    } catch (error) {
    }
  }

  scrollToAudienceInfo() {
    try {
      $('html, body').animate({
        scrollTop: $("#audience_info_card").offset().top - 100
      }, 1000);
    } catch (error) {
    }
  }

  scrollToScheduleInfo() {
    try {
      $('html, body').animate({
        scrollTop: $("#schedule_info_card").offset().top - 100
      }, 1000);
    } catch (error) {
    }
  }


  scrollToPaymentInfo() {
    try {
      $('html, body').animate({
        scrollTop: $("#payment_info_card").offset().top - 100
      }, 1000);
    } catch (error) {
    }
  }

  reloadPage() {
    this.utilityService.reloadPage();
  }





}
