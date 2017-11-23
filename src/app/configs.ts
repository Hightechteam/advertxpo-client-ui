'use strict';

/**
 * Applications global variables/constants
 * 
 * @author 
 */

export const INTEREST_RATE: number = 0.23; //23%

//TO DO: Move the API method names from APP_CONFIGS const to their own constant (here)
//TO DO: I think instead of moving APIs here we might just need to create a type just like we did for ValidationErrorNames
export const API_METHOD_NAMES = {

}
export declare type SGNewType = { //an example of a type
    [key: string]: any;
};

/**
 * @author SmallGod
 * 
 * This type will help us minimise errors.
 * When we are giving validation type errors names, this type will constrain us
 * to giving only the names listed here on the left and only the required type of value on the right hand side.
 *
 */
export declare type ValidationErrorNames = {

    //[key: string]: any; //this will allow any value name as the key (as long as it is a string) and any value type as the value
    required: string, //left side is key, right side is value (i.e. a 'string' has to be the value to a key called 'required')
    invalidCreditCard: string,
    invalidEmailAddress: string,
    invalidPassword: string,
    momoAccountValidator: string,
    phone_number_validator: string,
    minlength: string,
    maxlength: string

}

//TO DO: Some work to do here
// export const VALIDATION_ERROR_NAMES = {

//     REQUIRED: 'required',
//     INVALID_CREDIT_CARD: 'invalidCreditCard',
//     INVALID_EMAIL_ADDRESS: 'invalidEmailAddress',
//     INVALID_PASSWORD: 'invalidPassword',
//     MOMO_ACCOUNT_VALIDATOR: 'momoAccountValidator',
//     PHONE_NUMBER_VALIDATOR: 'phone_number_validator',
//     MIN_LENGTH_VALIDATOR: 'minlength',
//     MAX_LENGTH_VALIDATOR: 'maxlength'
// }

export const APP_CONFIGS = {

    APP_ID: "thisIsdaAppID127",
    API_PASSWORD: "QW8YUEI90T%4#0Z",

    REQUEST_TIMEOUT: 30000,
    //API_URL: "http://192.168.1.107:9008/adcentral/api/json",
    //RESOURCE_UPLOAD_URL: "http://192.168.1.107:9008/adcentral/uploadfile",

    //for local testing
    //API_URL: "http://localhost/seyeya/fetchLocations.php",
    //RESOURCE_UPLOAD_URL: "http://localhost/seyeya/uploadImage.php",

    //HARDCODE_API: "http://localhost/seyeya/fetchLocations.php",

    //Server testing testing
    //API_URL: "http://67.205.155.195/seyeya/fetchLocations.php",
    //RESOURCE_UPLOAD_URL: "http://67.205.155.195/seyeya/uploadImage.php",

    // for local host
    API_URL: "http://localhost:9008/adcentral/api/json",
    RESOURCE_UPLOAD_URL: "http://localhost:9008/adcentral/uploadfile",

    //staging server.
    //API_URL: "http://advertxpo.com:9008/adcentral/api/json",
    //RESOURCE_UPLOAD_URL: "http://advertxpo.com:9008/adcentral/uploadfile",

    //RESOURCE_UPLOAD_URL: "http://t.advertexpo.com:9010/dsmbridgeservice/uploadfile",
    //RESOURCE_UPLOAD_URL: "http://192.168.43.17:9010/dsmbridgeservice/uploadfile",

    DATE_SELECT_MIN_YEAR: 2017,
    DATE_SELECT_MAX_YEAR: 2018,
    DATE_SELECT_FORMAT: "mm/dd/yyyy",

    FULLSCREEN: "FULLSCREEN",
    THREE_SPLIT: "3SPLIT",
    TWO_SPLIT: "2SPLIT",
    TEXT: "TEXT",
    FULLSCREEN_TEXT: "FULLSCREEN_TEXT",

    ADVERT_MESSAGE_CHARACTER_LIMIT: 200,

    SCHEDULE_INSTANT: "INSTANT",
    SCHEDULE_PRIME: "PRIME",
    SCHEDULE_RUSHHOUR: "RUSHHOUR",
    SCHEDULE_EARLY: "EARLYBIRD",
    SCHEDULE_LUNCHHOUR: "LUNCHHOUR",
    SCHEDULE_LATENIGHT: "LATENITE",
    SCHEDULE_FREEBIE: "FREEBIE",

    STATUS_QUERY_TIME_INTERVAL: 5000,
    PAYMENT_PENDING_STATUS_CODE: "PENDING_PAYMENT",
    ADVERT_IN_REVIEW_STATUS_CODE: "IN_REVIEW",
    ADVERT_SCHEDULED_STATUS_CODE: "ACTIVE",
    ADVERT_REJECTED_CODE: "REJECTED",
    ADVERT_REVERSED_CODE: "REVERSED",
    ADVERT_COMPLETED_CODE: "COMPLETED",
    ADVERT_FLAGGED_CODE: "FLAGGED",
    ADVERT_ESCALATED_CODE: "ESCALATED",
    ADVERT_DRAFT_CODE: "DRAFT",
    ADVERT_NEW_CODE: "NEW",



    /* advert text labels */
    ADVERT_TITLE_TEXT: "HEADER_TEXT",
    ADVERT_MESSAGE_TEXT: "SCROLL_TEXT",

<<<<<<< HEAD
    /* methods called on the server */
=======
    /* methods called on the server */
>>>>>>> 163e359053fe9ef763ea5c9769486896a1c34f47
    GET_PRICE: "GET_CAMPAIGN_STATS",
    USER_AUTHENITCATION: "AUTHENTICATE_USER",
    CREATE_ACCOUNT: "CREATE_ACCOUNT",
    GET_AREAS: "GET_SCREEN_AREAS",
    GET_BUSINESS_TYPES: "GET_BUSINESS_TYPES",
    GET_AUDIENCE_TYPES: "GET_AUDIENCE_TYPES",
    GET_ADVERT_STATUS: "GET_ADVERT_STATUS",
    GET_SCREENS: "GET_SCREENS",
    GET_USER_ADVERTS: "GET_USER_ADVERTS",
    PLACE_ADVERT: "PLACE_ADVERT",
    DUPLICATE_ADVERT: "GET_CAMPAIGN_DETAILS",
    SAVE_ADVERT: "SAVE_ADVERT",
    GET_TEMPLATE_ADVERTS: "GET_TEMPLATE_ADVERTS",
    UPDATE_ACCOUNT: "UPDATE_ACCOUNT",
    GUEST_LOGIN: "GUEST_LOGIN",
    VERIFY_ACCOUNT: "VERIFY_ACCOUNT",
    RESEND_OTP: "RESEND_OTP",
    CREATE_NEW_LOCATION: "CREATE_NEW_LOCATION",
    CONTACT_US: "CONTACT_US",
    ADD_LOCATION_DETAILS: "ADD_LOCATION_DETAILS",


    RESOURCE_TYPE_IMAGES: "IMAGE",
    RESOURCE_TYPE_VIDEO: "VIDEO",
    SCHEDULE_TYPE_INSTANT: "INSTANT",
    SCHEDULE_TYPE_LATER: "LATER",

    TOKEN_REFERENCE_KEY: "token_id",
    CURRENT_USER_REFERENCE_KEY: "current_user",

    DEFAULT_TOAST_DURATION: 7000

}


