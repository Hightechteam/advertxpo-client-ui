import { Credentials } from '../Utilities/custom-types';
/**
 * Requests to the central server take a certain form which needs be respected.
 * This interface enforces that.
 * 
 * @author SmallGod
 */
export interface ApiRequest {

    method: string;
    credentials: Credentials;
    params?: {};
}
