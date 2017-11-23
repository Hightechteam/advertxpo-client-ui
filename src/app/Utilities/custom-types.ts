/**
 * @author SmallGod
 */
export declare type Credentials = {
    app_id: string,
    api_password: string,
    token_id?: string //we may or may not recieve a token_id (tag or value) in the credentials body/type
}