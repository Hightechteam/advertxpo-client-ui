import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { APP_CONFIGS } from '../configs';
import { UtilityService } from '../services/utility.service';

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

declare var $:any;

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  fetchLocatonInfomation(){

    var request_body = {
        method: APP_CONFIGS.GET_AREAS,
        params: {
          ordering_info: {
            order_by: "name",
            order: "ASC"
          },
          paging_info: {
            current_page: 1,
            page_size: 0,
            total_pages: 1,
            total_rows: 0
          }
        },
        credentials: (new UtilityService).getCredentials()
      }

    return this.http.post(APP_CONFIGS.API_URL,
            JSON.stringify(request_body))
            .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
            .map((response: Response) => response.json())
            .catch(this.error_handler);
  }

  fetchBusinessTypesInfomation(){
   var request_body = {
        method: APP_CONFIGS.GET_BUSINESS_TYPES,
        params: {
          ordering_info: {
            order_by: "name",
            order: "ASC"
          },
          paging_info: {
            current_page: 1,
            page_size: 0,
            total_pages: 1,
            total_rows: 0
          }
        },
        credentials: (new UtilityService).getCredentials()
      }

    return this.http.post(APP_CONFIGS.API_URL,
            JSON.stringify(request_body))
            .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
            .map((response: Response) => response.json())
            .catch(this.error_handler);
  }

  fetchAudienceTypesInfomation(){
     var request_body = {
        method: APP_CONFIGS.GET_AUDIENCE_TYPES,
        params: {
          ordering_info: {
            order_by: "name",
            order: "ASC"
          },
          paging_info: {
            current_page: 1,
            page_size: 0,
            total_pages: 1,
            total_rows: 0
          }
        },
        credentials: (new UtilityService).getCredentials()
      }

    return this.http.post(APP_CONFIGS.API_URL,
            JSON.stringify(request_body))
            .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
            .map((response: Response) => response.json())
            .catch(this.error_handler);
  }

  fetchScreens(){
     var request_body = {
        method: APP_CONFIGS.GET_SCREENS,
        params: {
          screen_codes: []
        },
        credentials: (new UtilityService).getCredentials()
      }

    return this.http.post(APP_CONFIGS.API_URL,
            JSON.stringify(request_body))
            .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
            .map((response: Response) => response.json())
            .catch(this.error_handler);
  }

  getUserAdverts(campaign_ids: any[]){
  
     var request_body = {
        method: APP_CONFIGS.GET_USER_ADVERTS,
        params: {
         campaign_id: campaign_ids
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

  getTemplateAdverts(){
    var request_body = {
        method: APP_CONFIGS.GET_TEMPLATE_ADVERTS,
        params: {
        },
        credentials: (new UtilityService).getCredentials()
      }

    return this.http.post(APP_CONFIGS.API_URL,
            JSON.stringify(request_body))
            .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
            .map((response: Response) => response.json())
            .catch(this.error_handler);
  }

  queryForPriceEstimates(request_body){
    return this.http.post(APP_CONFIGS.API_URL,
            JSON.stringify(request_body))
            .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
            .map((response: Response) => response.json())
            .catch(this.error_handler);
  }

  placeAdvert(request_body){
    return this.http.post(APP_CONFIGS.API_URL,
            request_body)
            .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
            .map((response: Response) => response.json() )
            .catch(this.error_handler);
  }

  getAdvertStatus(request_body){
    return this.http.post(APP_CONFIGS.API_URL,
            request_body)
            .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
            .map((response: Response) => response.json() )
            .catch(this.error_handler);
  }

  saveAdvert(request_body){
    return this.http.post(APP_CONFIGS.API_URL,
            request_body)
            .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
            .map((response: Response) => response.json() )
            .catch(this.error_handler);
  }

  saveAccountInformation(request_body){
    return this.http.post(APP_CONFIGS.API_URL,
            request_body)
            .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
            .map((response: Response) => response.json() )
            .catch(this.error_handler);
  }
  

  error_handler(error: Response){
    console.log(error);
    return Observable.throw(error || "Server error" );
  }

}
