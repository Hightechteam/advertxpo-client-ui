import { Credentials } from '../Utilities/custom-types';
export interface CreateLocationRequest {

    method: string;
    credentials: Credentials;
    params: {
        location_info: {
            phone_contact: string,
            business_name: string,
            screens: number
        },
        audience_types: number[],
        location_services: number[]
    }
}