/**
 * The response expected when there is any kind of error.
 * 
 * Our server responds with the following object structure
 * 2-first level elements, success - boolean & data consisting of an array of errors []
 * 
 * @author SmallGod
 */
export interface ApiErrorResponse {

    success: false;
    data: {
        request_id?: number;
        errors: {
            error_code: string;
            description: string;
            additional_details: string;
        }[] //----> [] is a type meaning the type errors has an array of {error_code:"", desc:"", add:""} objects

    };
}