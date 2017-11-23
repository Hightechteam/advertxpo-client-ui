import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { BasicAdInfo } from '../models/basic_ad_info.model';
import { APP_CONFIGS } from '../configs';
import { UtilityService } from '../services/utility.service';
import { DataService } from '../services/data.service';
import { AdvertEstimates } from '../models/advert_estimates.model';

declare var $: any;

@Component({
  selector: 'app-advertstatus',
  templateUrl: './advertstatus.component.html',
  styleUrls: ['./advertstatus.component.scss'],
  providers: [DataService]
})
export class AdvertstatusComponent implements OnInit, AfterViewInit {

  @Input() ad_basic_info: BasicAdInfo = new BasicAdInfo;
  @Input() advert_estimates: AdvertEstimates = new AdvertEstimates;

  payment_completed: boolean = false;
  advert_in_review: boolean = false;
  advert_approved: boolean = false;


  query_status_timeout: any;

  constructor(router: Router, private dataService: DataService) {

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        clearTimeout(this.query_status_timeout);
      }
    });

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.queryForAdvertStatus();
  }

  queryForAdvertStatus() {

    this.dataService.getUserAdverts([this.ad_basic_info.advert_id])
      .subscribe(
      response => {
        if (response.success) {
          var status_code = response.data[0].campaign_status;
          this.handleStatusCode(status_code);
        } else {
          console.log("Server returned false");
          this.handleStatusCode(0);
        }
      },
      error => {
        console.log("Something went wrong");
      }
      );
  }

  handleStatusCode(status_code) {

    if (status_code == APP_CONFIGS.PAYMENT_PENDING_STATUS_CODE) {
      this.queryStatusAgainAfterSetInterval();
    } else if (status_code == APP_CONFIGS.ADVERT_IN_REVIEW_STATUS_CODE) {
      this.payment_completed = true;
      this.advert_in_review = true;
      console.log("Advert In-review now");
      this.queryStatusAgainAfterSetInterval();
    } else if (status_code == APP_CONFIGS.ADVERT_SCHEDULED_STATUS_CODE) {
      this.advert_approved = true;
      this.advert_in_review = false;
    } else {
      this.queryStatusAgainAfterSetInterval();
    }
  }


  queryStatusAgainAfterSetInterval() {
    var main_ref = this;
    this.query_status_timeout = setTimeout(function () {
      main_ref.queryForAdvertStatus();
    }, APP_CONFIGS.STATUS_QUERY_TIME_INTERVAL);
  }


  hideAdvertStatusModal() {
    clearTimeout(this.query_status_timeout);
    $("#advertPlacedModal").modal("hide");
  }

}
