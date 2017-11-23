import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UtilityService } from '../services/utility.service';

import { APP_CONFIGS } from '../configs';


@Injectable()
export class JsonreaderService {

  constructor(private http: Http) { }


  fetchAdvertJsonFromTheServer(advertid){
     //console.log("Fetching JSON for advertID: "+advertid);
    var request_body = {
      method: APP_CONFIGS.DUPLICATE_ADVERT,
      params: {
          campaign_id: advertid
        },
      credentials: (new UtilityService).getCredentials()
    }

    console.log(JSON.stringify(request_body));
    
    return this.http.post(APP_CONFIGS.API_URL, JSON.stringify(request_body))
            .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
            .map((response: Response) => response.json())
            .catch(this.error_handler);
  
  }

  error_handler(error: Response){
    console.log("logging error response");
    console.log(error);
    return Observable.throw(error || "Server error" );
  }

}
