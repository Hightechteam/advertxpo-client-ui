import { DataService } from './../../app/services/data.service';
import { UtilityService } from './../../app/services/utility.service';
import { UserAdverts } from './../../app/models/user-adverts';
import { Data } from './../../app/models/data-type';
import { DataTable, DataTableResource, DataTableTranslations } from 'angular-4-data-table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-ads',
  templateUrl: './manage-ads.component.html',
  styleUrls: ['./manage-ads.component.scss']
})
export class ManageAdsComponent implements OnInit {

  user_adverts_loaded: boolean = false;
  user_adverts_loading: boolean = false;
  failed_to_load_adverts: boolean = false;

  load_advert_error_message: string = "";

  user_has_no_adverts: boolean = false;
  user_adverts: Data[] = []; //the data part of adverts
  advertCount = 0;
  advertResources: DataTableResource<Data>;

  @ViewChild(DataTable) advertsTable;

  constructor(private dataService: DataService, private utilityService: UtilityService) {
    this.user_adverts_loading = true;
    this.fetchUserAdverts();

  }

  /* advertResources = new DataTableResource(films);
  films = Data[];
  advertCount = 0; */

  ngOnInit() {



  }

  fetchUserAdverts() {

    var user_id = JSON.parse(localStorage.getItem('current_user')).user_id;

    this.dataService.getUserAdverts([])
      .subscribe(
      response => {

        console.log(JSON.stringify(response));
        this.user_adverts_loading = false;

        if (response.success) {

          this.user_adverts = response.data;
          this.user_adverts_loaded = true;

          if (this.user_adverts.length == 0) {

            this.user_adverts = [];
            this.user_has_no_adverts = true;
          }
          this.advertResources = new DataTableResource(this.user_adverts);
          this.advertResources.count().then(count => this.advertCount = count);

        } else {

          this.failed_to_load_adverts = true;
          this.load_advert_error_message = this.utilityService.extractErrorMessages(response);
        }
      },
      error => {
        this.user_adverts_loading = false;
        this.failed_to_load_adverts = true;
        this.load_advert_error_message = "Something went wrong. Please check your internet connection!"
      }
      );
  }

  reloadPage() {
    this.utilityService.reloadPage();
  }


  //TO DO: Reload ads from server not memory
  reloadAdverts(params) {

    if (this.advertResources) {
      this.advertResources.query(params).then(user_adverts => this.user_adverts = user_adverts);
    } else {
      console.log("advertResources NOT defined");
    }
  }

  cellColor(car) {
    return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7) / 1.3) * 100)) + ')';
  };

  // special params:

  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };
}
