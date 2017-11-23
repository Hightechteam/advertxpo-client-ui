import { ScheduleType } from '../enums/schedule-type.enum';
import { UtilityService } from '../services/utility.service';

export class ScheduleInfo {

  scheduleFieldsLoading: boolean = false;

  schedule_type: string;
  start_date: string = (new UtilityService).dateToMDY(new Date);
  end_date: string = (new UtilityService).dateToMDY(new Date);; 

  default_start_date: Object = this.getCurrentDateASObject();
  default_end_date: Object = this.getCurrentDateASObject();


  time_slots = [];  

  prime_time_selected: boolean = false;
  rush_hour_selected:  boolean = false;
  early_bird_selected: boolean = false;
  lunch_hour_selected: boolean = false;
  late_night_selected: boolean = false;
  freebie_selected: boolean = false;

  isScheduleTypeSelected: boolean = true;
  timeSlotHasError: boolean = false;

  errors = [];

  prime_time_frequency: number = -1;
  prime_time_prefered_time: number = -1;
  prime_time_days = [];

  rush_hour_frequency: number = -1;
  rush_hour_prefered_time: number = -1;
  rush_hour_days = [];
  
  early_bird_frequency: number = -1;
  early_bird_prefered_time: number = -1;
  early_bird_days = [];

  lunch_hour_frequency: number = -1;
  lunch_hour_prefered_time: number = -1;
  lunch_hour_days = [];

  late_night_frequency: number = -1;
  late_night_prefered_time: number = -1;
  late_night_days = [];

  freebie_frequency: number = -1;
  freebie_prefered_time: number = -1;
  freebie_days = [];

  sheduleLaterSelected(): boolean{
    return (this.schedule_type == "2")
  }

  sheduleNowSelected(): boolean{
    return (this.schedule_type == "1")
  }

  validateRecords(){
    this.errors = [];
    this.validateScheduleType();
    this.validateTimeSlot();
    this.validateStartAndEndDate();
    return this.errors;
  }

  validateScheduleType(){
    if(this.schedule_type == undefined || 
        this.schedule_type == null){
          this.isScheduleTypeSelected = false;
          this.errors.push("Please select schedule type");
    }else{
      this.isScheduleTypeSelected = true;
    }
  }

  validateTimeSlot(){
    if(this.schedule_type == "2"){
      if(!this.prime_time_selected &&
          !this.rush_hour_selected &&
          !this.early_bird_selected &&
          !this.lunch_hour_selected &&
          !this.late_night_selected &&
          !this.freebie_selected ){
            this.timeSlotHasError = true;
            this.errors.push("Please select atleast one time slot");
      }else{
        this.timeSlotHasError = false;
      }
    }else{
      this.timeSlotHasError = false;
    }
  }

  validateStartAndEndDate(){
    if(this.schedule_type == "2"){
      if(this.start_date == null || this.end_date == null){
        this.errors.push("Please select valid start and end dates");
      }else if(this.start_date > this.end_date){
        this.errors.push("End date must be later than start date")
      }
    }
  }

  getCurrentDateASObject(){
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var object = { date: { year: y, month: m, day: d } };
    return object;
  }

}