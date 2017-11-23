import { ValidationService } from './validation.service';
import { FormControl } from '@angular/forms';
import { Component, Input, style } from '@angular/core';

@Component({
    selector: 'control-messages',
    template: `<div class="error-div" *ngIf="errorMessage !== null"> {{errorMessage}}</div>`,
    styles: [`.error-div{ color:red; opacity:0.7; font-size:75%;}`]
})
export class ControlMessagesComponent {
    //errorMessage: string;

    @Input()
    control: FormControl;

    constructor() { }

    get errorMessage() {

        console.log("errors: " + JSON.stringify(this.control.errors));

        //gets property names/keys while for..of gets property values
        for (let propertyName in this.control.errors) {

            console.log("control value: " + this.control.value);
            console.log("control propertyName: " + propertyName);

            // If control has an error
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {

                console.log("control has property: " + propertyName);

                // Return the appropriate error message from the Validation Service
                return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
        return null;
    }
}