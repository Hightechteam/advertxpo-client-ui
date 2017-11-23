/**
 * The expected response when the request is successfuly processed.
 * 
 * Our server responds with the following object structure
 * 2-first level elements, success - boolean(true) & data of type any
 * 
 * @author SmallGod
 */
export interface ApiSuccessResponse {

    success: true;
    data: any;
}