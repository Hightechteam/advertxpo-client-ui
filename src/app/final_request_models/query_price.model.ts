import { APP_CONFIGS } from '../configs'; 
import { PreviewComponent } from '../preview/preview.component'; 
import { ScheduleType } from '../enums/schedule-type.enum';
import { UtilityService } from '../services/utility.service';

export class QueryPriceParams{

    preview_component: PreviewComponent;

    utility = new UtilityService;
    
    constructor(_preview_component: PreviewComponent) {
        this.preview_component = _preview_component;
    }

    getAdvertLength(): number{
        return Number(this.preview_component.ad_basic_info.advert_length);
    }

    getlayoutType(): string{
        if( this.preview_component.ad_basic_info.layout_type== null ||
            this.preview_component.ad_basic_info.layout_type == undefined ||
            this.preview_component.ad_basic_info.layout_type.trim() == ""){
                
                return APP_CONFIGS.TEXT;
        }else{
            return this.preview_component.ad_basic_info.layout_type;
        }
    }

    getTargetScreenCodes(): any{
        if(this.preview_component.targeting_info.target_specific_screen_selected){
           return this.preview_component.targeting_info.selected_screens.map( x => x.screen_code)
        }else{
            return [];
        }
    }

    getAreas(): any{
        if(this.preview_component.targeting_info.target_specific_screen_selected){
            return [];
        }else if(this.preview_component.targeting_info.all_locations_selected){
            return [1];
        }else{
            return this.preview_component.targeting_info.selected_locations.map(x => x.id);
        }
    }

    getLocationTypes(): any{
        if(this.preview_component.targeting_info.target_specific_screen_selected){
            return [];
        }else if(this.preview_component.targeting_info.all_business_types){
            return ["1"];
        }else{
            return this.preview_component.targeting_info.selected_business_types.map(x => x.id);
        }
    }

    getAudienceTypes(): any{
        if(this.preview_component.targeting_info.target_specific_screen_selected){
            return [];
        }else if(this.preview_component.targeting_info.all_audience_types){
            return ["1"];
        }else{
            return this.preview_component.targeting_info.selected_audience_types.map(x => x.id);
        }
    }

    getStartDate(): string{
        if( this.preview_component.schedule_info.start_date == null ||
            this.preview_component.schedule_info.start_date == undefined ||
            this.preview_component.schedule_info.schedule_type == APP_CONFIGS.SCHEDULE_TYPE_INSTANT ||
            this.preview_component.schedule_info.start_date.trim() == "" ){
                return this.utility.dateToYMD(new Date);
        }else{
            return this.utility.dateToYMD(this.preview_component.schedule_info.start_date);
        }
    }

    getEndDate(): string{
        if(this.preview_component.schedule_info.end_date == null ||
            this.preview_component.schedule_info.end_date == undefined ||
            this.preview_component.schedule_info.schedule_type == APP_CONFIGS.SCHEDULE_TYPE_INSTANT ||
            this.preview_component.schedule_info.end_date.trim() == "" ){
                return this.utility.dateToYMD(new Date);
        }else{
            return this.utility.dateToYMD(this.preview_component.schedule_info.end_date);
        }
    }


    getSlots(): any{
        var slots = [];

        if(this.preview_component.schedule_info.sheduleNowSelected()){
             var slot = {
                    name: APP_CONFIGS.SCHEDULE_INSTANT,
                    preferred_hour: -1,                    
                    frequency: -1,
                    days: []
                };
                slots.push(slot);            
        }else if(this.preview_component.schedule_info.sheduleLaterSelected()){

            if(this.preview_component.schedule_info.rush_hour_selected){
                var slot = {
                    name: APP_CONFIGS.SCHEDULE_RUSHHOUR,
                    preferred_hour: this.preview_component.schedule_info.rush_hour_prefered_time,
                    frequency: this.preview_component.schedule_info.rush_hour_frequency,
                    days: this.preview_component.schedule_info.rush_hour_days
                };
                slots.push(slot);
            }

            if(this.preview_component.schedule_info.prime_time_selected){
                var slot = {
                    name: APP_CONFIGS.SCHEDULE_PRIME,
                     preferred_hour: this.preview_component.schedule_info.prime_time_prefered_time,
                    frequency: this.preview_component.schedule_info.prime_time_frequency,
                    days: this.preview_component.schedule_info.prime_time_days
                };
                slots.push(slot);
            }

            if(this.preview_component.schedule_info.early_bird_selected){
                var slot = {
                    name: APP_CONFIGS.SCHEDULE_EARLY,
                     preferred_hour: this.preview_component.schedule_info.early_bird_prefered_time,
                    frequency: this.preview_component.schedule_info.early_bird_frequency,
                    days: this.preview_component.schedule_info.early_bird_days
                };
                slots.push(slot);
            }

            if(this.preview_component.schedule_info.lunch_hour_selected){
                var slot = {
                    name: APP_CONFIGS.SCHEDULE_LUNCHHOUR,
                     preferred_hour: this.preview_component.schedule_info.lunch_hour_prefered_time,
                    frequency: this.preview_component.schedule_info.lunch_hour_frequency,
                    days: this.preview_component.schedule_info.lunch_hour_days
                };
                slots.push(slot);
            }

            if(this.preview_component.schedule_info.late_night_selected){
                var slot = {
                    name: APP_CONFIGS.SCHEDULE_LATENIGHT,
                     preferred_hour: this.preview_component.schedule_info.late_night_prefered_time,
                    frequency: this.preview_component.schedule_info.late_night_frequency,
                    days: this.preview_component.schedule_info.late_night_days
                };
                slots.push(slot);
            }

            if(this.preview_component.schedule_info.freebie_selected){
                var slot = {
                    name: APP_CONFIGS.SCHEDULE_FREEBIE,
                     preferred_hour: this.preview_component.schedule_info.freebie_prefered_time,
                    frequency: this.preview_component.schedule_info.freebie_frequency,
                    days: this.preview_component.schedule_info.freebie_days
                };
                slots.push(slot);
            }
        }

        return slots;
    }


}