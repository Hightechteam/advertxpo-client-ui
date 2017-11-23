import { ToastService } from './toast.service';
import { Error } from 'tslint/lib/error';
import { ApiSuccessResponse } from './../models/api-success-response.interface';
import { ApiErrorResponse } from '../models/api-error-response.interface';
import { ApiRequest } from './../models/api-request.interface';
import { UtilityService } from './utility.service';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIGS } from './../configs';
import { Headers, Http, Request, RequestMethod, RequestOptions, Response, ResponseType } from '@angular/http';
import { Inject, Injectable, Component } from '@angular/core';


@Injectable()
export class AppService {

    // alternatively you can use URL to JSON file
    //private apiRequestUrl: string = "http://localhost:4200/assets/create-location-response.json";
    private apiRequestUrl: string = APP_CONFIGS.API_URL;

    apiResponse: ApiSuccessResponse | ApiErrorResponse;

    constructor(private http: Http, private toastService: ToastService) { }

    testLocalAPI(): Observable<ApiSuccessResponse | ApiErrorResponse> {
        //  alert(`saved!!! ${JSON.stringify(this.person)}`);

        return this.http.get(this.apiRequestUrl)
            .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
            .map<any, ApiSuccessResponse | ApiErrorResponse>((resp, index) => this.extractData(resp, index))
            .catch(error => this.handleError(error));
    }

    /**
     * 
     * Post Request to API server and register an observable for the response
     * 
     */
    private postRequest(apiRequestData: ApiRequest): Observable<ApiSuccessResponse | ApiErrorResponse> {


        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //headers.append("Authorization", 'Bearer ' + localStorage.getItem('id_token'));
        let headers = new Headers();
        headers.append("Content-Type", 'application/json');

        let options = new RequestOptions(

            {
                headers: headers,
                method: RequestMethod.Post,
                url: this.apiRequestUrl,
                body: JSON.stringify(apiRequestData)
            }
        );

        //return this.http.post(this.apiUrl, { name }, options) .map(this.extractData).catch(this.handleError);
        return this.http.request(new Request(options))
            .timeout(APP_CONFIGS.REQUEST_TIMEOUT)
            .map<any, ApiSuccessResponse | ApiErrorResponse>((response, index) => this.extractData(response, index)) //this map function is different from the other map of arrays
            .catch(error => this.handleError(error));

        // TypeScript/ES6
        //.map(response => response.json())
        // ES5
        //.map(function(response){ return response.json(); })
    }

    /**
     * The function that is required by the map function of the http.request function
     * returns a response and the index of the i-th emission (at index) of the observable. 
     * This function is applied to each `value` emitted by the source Observable. 
     * The `index` parameter is the number `i` for the i-th emission that has happened since the
     * subscription, starting from the number `0`.
     * 
     * @param response 
     * @param index check out the map function on the http request to know what these parameters are
     */
    private extractData(response: Response, index: number): ApiSuccessResponse | ApiErrorResponse {

        let errMsg: string;

        if (response) {

            try {

                let body = <ApiSuccessResponse | ApiErrorResponse>response.json();
                console.log("Server status : " + response.status);
                console.log("API Response  : " + JSON.stringify(body));//returns body as a 'JSON' parsed object
                //return body.data || {};

                return body;

            } catch (error) {

                console.error("Error caught here : " + (<Error>error).message);
                console.error("Error caught name : " + (<Error>error).name);
                console.error("Error caught stack: " + (<Error>error).stack);

                errMsg = `Failed to parse server response as JSON, expected a JSON body from the server. Error name: ${(<Error>error).name} - Error message: ${(<Error>error).message} - Error stack: ${(<Error>error).stack}`;

            }
        }

        return { //either return the bode(successful response) or compose an error response
            success: false,
            data: {
                errors: [
                    {
                        error_code: "PROCESSING_ERROR",
                        description: "Sorry, an error occurred. Pleast try again later",
                        additional_details: "Failed to process: " + errMsg
                    }
                ]
            }
        };
    }


    /**
     * Retrieve/create the error message
     * and send it to the observable to handle
     * 
     * @param error 
     */
    private handleError(error: Response | any) {

        //TO-DO: this code snippet doesn't belong here, find some use for it elsewhere
        let responseType: ResponseType = error.type;
        console.log("Response type: " + responseType);
        switch (responseType) {

            case ResponseType.Basic:
                break;

            case ResponseType.Error:
                break;

            case ResponseType.Default:
                break;

            case ResponseType.Opaque:
                break;

            case ResponseType.Cors:
                break;

            default:
                break;
        }
        //snippet ends here

        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {

            try {

                const body = error.json();
                const err = body.error || JSON.stringify(body);
                errMsg = `Error status: ${error.status} - StatusText: ${error.statusText || ''} - ErrorBody: ${err}`;

            } catch (error) {

                console.error("Error caught here : " + (<Error>error).message);
                console.error("Error caught name : " + (<Error>error).name);
                console.error("Error caught stack: " + (<Error>error).stack);

                errMsg = `Failed to parse server response as JSON, expected a JSON body from the server. Error name: ${(<Error>error).name} - Error message: ${(<Error>error).message} - Error stack: ${(<Error>error).stack}`;
            }

        } else {

            errMsg = error.message ? error.message : error.toString();
        }
        console.error("SG says: Error occurred: " + errMsg);

        let errorObj: ApiErrorResponse = { //compose an error response
            success: false,
            data: {
                errors: [
                    {
                        error_code: "PROCESSING_ERROR",
                        description: "Sorry, something went wrong, please try again later",
                        additional_details: "Processing error: " + errMsg
                    }
                ]
            }
        };
        return Observable.throw(errorObj); //pass on error details to subscriber
    }

    /**
     * Post an HTTP request to an API server and Subscribe 
     * to recieve events on the response callback - note operation is async - wont return immediately
     * 
     * @param apiRequestData 
     */
    public postRequestAndSubscribe(apiRequestData: ApiRequest): void {

        if (!apiRequestData) {

            let error = { //compose an error response
                success: false,
                data: {
                    errors: [
                        {
                            error_code: "BAD_REQUEST",
                            description: "Sorry, failed to process your request. Please try again later",
                            additional_details: "User or client app might be sending a bad request - Request is empty!"
                        }
                    ]
                }
            }
            this.subscriberErrorHandler(error);
        } else {
            //this.testLocalAPI()
            this.postRequest(apiRequestData)
                .subscribe( //NOTE: http calls are async - you get an observable instead of a synchronous value returned. 
                //you have to subscribe to it and in the call back in ther you get the data. No way around it
                (response) => this.subscriberResponseHandler(response),
                (error) => this.subscriberErrorHandler(error),
                () => this.subscriberCompleteHandler()
                );
        }
    }

    /**
     * 
     * @param response 
     */
    private subscriberResponseHandler(response: ApiSuccessResponse | ApiErrorResponse): void {

        console.log("About to print..");
        console.log("Response in subscribe: " + JSON.stringify(response));

        //this.apiResponse = Object.assign(this.apiResponse, <ApiSuccessResponse | ApiErrorResponse>response);
        this.apiResponse = <ApiSuccessResponse | ApiErrorResponse>response;

        if (!this.apiResponse.success) {
            let errorDescription = this.extractErrorMessages(<ApiErrorResponse>this.apiResponse);
            console.log("Error description is: " + errorDescription);

            this.toastService.showToast("error", "Failed", errorDescription);

        } else {
            this.toastService.showToast("success", "Sucessful", "processed successfuly");
        }

    }

    /**
     * 
     */
    private subscriberErrorHandler(error: any): void {

        //this.apiResponse = Object.assign(this.apiResponse, <ApiSuccessResponse | ApiErrorResponse>error);
        this.apiResponse = <ApiErrorResponse>error;
        console.error("Error in subscriber       : " + JSON.stringify(error));
        console.error("Error's additional details: " + this.apiResponse.data.errors[0].additional_details);

        if (!this.apiResponse.success) {
            let errorDescription = this.extractErrorMessages(<ApiErrorResponse>this.apiResponse);
            this.toastService.showToast("error", "Error", errorDescription);

        }
        return;
    }

    private subscriberCompleteHandler(): void {

        console.log("Finally completed!!");
        return;
    }

    //TO DO: Extract other errors too
    private extractErrorMessages(errorResponse: ApiErrorResponse): string {
        let errorDescription = errorResponse.data.errors[0].description;
        return errorDescription;
    }
}