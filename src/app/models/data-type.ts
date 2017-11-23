/**
 * Responses from the server have a data type
 */
export interface Data {

    id: number;
    campaign_id: number;
    campaign_name: string;
    cost: number;
    screen_reach: number;
    audience_reach: number;
    campaign_status: string;
    start_date: string;
    end_date: string;
    display_count: number;
    description: string;
}