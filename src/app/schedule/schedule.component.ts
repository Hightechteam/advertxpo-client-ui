import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ScheduleInfo } from '../models/schedule_info.model';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

import { APP_CONFIGS } from '../configs';

declare var $: any;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  schedule_info: ScheduleInfo = new ScheduleInfo;

  isStartDateValid: boolean = true;
  isEndDateValid: boolean = true;

  daysSelectSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 7,
    maxHeight: '300px'
  };

  daysSelectTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    defaultTitle: 'Select days',
  };

  daysSelectOptions: IMultiSelectOption[] = [
    { id: 1, name: 'Mon' },
    { id: 2, name: 'Tue' },
    { id: 3, name: 'Wed' },
    { id: 4, name: 'Thur' },
    { id: 5, name: 'Fri' },
    { id: 6, name: 'Sat' },
    { id: 7, name: 'Sun' }
  ];


  @Output() broadcastScheduleInfo: EventEmitter<ScheduleInfo> = new EventEmitter<ScheduleInfo>();
  @Output() updateReachEstimates: EventEmitter<ScheduleInfo> = new EventEmitter<ScheduleInfo>();

  constructor() { }

  getSelectedDays():IMultiSelectOption[]{
    return this.daysSelectOptions;
  }

  ngOnInit() {
    this.passScheduleInfoToParentComponent();
  }

  private myDatePickerOptions: IMyOptions = {
    dateFormat: APP_CONFIGS.DATE_SELECT_FORMAT,
    minYear: APP_CONFIGS.DATE_SELECT_MIN_YEAR,
    maxYear: APP_CONFIGS.DATE_SELECT_MAX_YEAR,
    showClearDateBtn: false,
    editableDateField: false,
    showTodayBtn: false,
    openSelectorOnInputClick: true

  };

  passScheduleInfoToParentComponent() {
    this.broadcastScheduleInfo.emit(this.schedule_info);
  }

  broadCastUpdateEstimatesToParent() {
    this.updateReachEstimates.emit(this.schedule_info);
  }

  timeSlotFieldChanged() {
    this.schedule_info.validateTimeSlot();
    this.passScheduleInfoToParentComponent();
  }

  playNowClicked(){
    this.schedule_info.schedule_type = "1";
    this.passScheduleInfoToParentComponent();
  }

  playLaterSelected(){
    this.schedule_info.schedule_type = "2";
    this.passScheduleInfoToParentComponent();
  }

  validateStartDate(event: IMyDateModel) {

    var date = new Date(event.jsdate);
    var current_date = new Date();

    if (date >= current_date || date.toDateString() == current_date.toDateString()) {
      this.isStartDateValid = true;
      this.schedule_info.start_date = event.formatted;
      this.passScheduleInfoToParentComponent();
    } else {
      this.isStartDateValid = false;
      this.schedule_info.start_date = null;
    }

  }

  validateEndDate(event: IMyDateModel) {
    var date = new Date(event.jsdate);
    var current_date = new Date();
    if (date > current_date || date.toDateString() == current_date.toDateString()) {
      this.isEndDateValid = true;
      this.schedule_info.end_date = event.formatted;
      this.passScheduleInfoToParentComponent();
    } else {
      this.isEndDateValid = false;
      this.schedule_info.end_date = null;
    }
  }

  isStartDateBeforeEndDate(): boolean {
    var start_date = new Date(this.schedule_info.start_date);
    var end_date = new Date(this.schedule_info.end_date);
    if (this.schedule_info.end_date == null || this.schedule_info.start_date == null)
      return true;
    else if (end_date >= start_date) {
      return true;
    } else {
      return false;
    }
  }

  togglePrimeTimeAdvancedSettings() {
    $(".prime-advanced-settings").toggle();
  }

  toggleRushHourAdvancedSettings() {
    $(".rush-hour-advanced-settings").toggle();
  }

  toggleEarlyBirdTimeAdvancedSettings() {
    $(".early-bird-advanced-settings").toggle();
  }

  toggleLunchHourAdvancedSettings() {
    $(".lunch-hour-advanced-settings").toggle();
  }

  toggleLateNightAdvancedSettings() {
    $(".late-night-advanced-settings").toggle();
  }

  toggleFreebieAdvancedSettings() {
    $(".freebie-advanced-settings").toggle();
  }

  loadingDone(): boolean {
    return this.schedule_info.scheduleFieldsLoading;
  }

}
