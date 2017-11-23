import { Credentials } from '../Utilities/custom-types';
import { Injectable } from '@angular/core';
import { APP_CONFIGS } from '../configs';


@Injectable()
export class UtilityService {

  constructor() { }

  dateToYMD(date_to_convert) {
    var date = new Date(date_to_convert);
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  dateToMDY(date_to_convert) {
    var date = new Date(date_to_convert);
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + (m <= 9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d) + '/' + y;
  }

  getPercentage(value, total): number {
    return Math.round((value * 100) / total);
  }

  dateToObject(date_to_convert) {
    var date = new Date(date_to_convert);
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var object = { date: { year: y, month: m, day: d } };
    return object;
  }

  getDayName(day: string): string {
    switch (Number(day)) {
      case 1:
        return "Moday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 7:
        return "Sunday";
      default:
        return "Unknown";
    }
  }

  getCredentials() {
    var token;

    if (localStorage.getItem(APP_CONFIGS.TOKEN_REFERENCE_KEY)) {
      token = localStorage.getItem(APP_CONFIGS.TOKEN_REFERENCE_KEY);
    } else {
      token = "";
    }

    return {
      app_id: APP_CONFIGS.APP_ID,
      api_password: APP_CONFIGS.API_PASSWORD,
      token_id: token
    }
  }

  validateMsisdn(msisdn) {
    if (msisdn == undefined) {
      return false;
    } else if (msisdn.trim().length != 10) {
      return false;
    } else {
      var prefix = msisdn.substring(0, 2);
      var prefixes = ["07"];
      if (prefixes.indexOf(prefix) == -1) {
        return false
      } else {
        return true;
      }
    }
  }

  isUserLoggedIn() {
    if (localStorage.getItem(APP_CONFIGS.CURRENT_USER_REFERENCE_KEY)) {
      return true;
    } else {
      return false;
    }
  }

  reloadPage() {
    location.reload();
  }

  extractErrorMessages(response) {
    var error_description = response.data.errors[0].description;
    return error_description;
  }



}
