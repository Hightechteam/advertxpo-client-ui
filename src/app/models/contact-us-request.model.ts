import { Credentials } from '../Utilities/custom-types';
export interface ContactUsRequest {

    method: string;
    credentials: Credentials;
    params: {
        first_name: string,
        last_name: string,
        email: string
        phone_contact: string,
        message: string
        
    }
}