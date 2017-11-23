import { ValidationErrorNames } from './../configs';
//import { balanceAnimationKeyframes } from '@angular/compiler/src/private_import_core';
import { FormControl, ValidationErrors } from '@angular/forms';

export class ValidationService {



    /**
     * Get appropriate error validation message
     * 
     * @param validatorName 
     * @param validatorValue 
     * 
     * @return errorMessage
     */
    public static getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {

        let config: ValidationErrorNames = {

            required: 'Field is reqired!',
            invalidCreditCard: 'invalid credit card number',
            invalidEmailAddress: 'invalid email address',
            invalidPassword: 'invalid password. Password must be at least 6 characters long, and contain a number.',
            momoAccountValidator: 'invalid MTN mobile money number',
            phone_number_validator: 'invalid phone contact',
            minlength: `min. length should be: ${validatorValue.requiredLength}`,
            maxlength: `max. length should be: ${validatorValue.requiredLength}`
        };

        return config[validatorName];
    }

    static momoAccountValidator(control: FormControl): ValidationErrors {

        //^ beginning of string
        // (0|256)? either 0 or 256 at the beginning or nothing (?)
        //(77|39) either 77 or 39 following
        //(2|4|8|9) either 2 or 4 or 8 or 9
        //[0-9] digit between 0 and 9, both inclusive, note: \d and [0-9] both mean the same thing
        //{6} should be exactly 6 occurrencies
        let regEx = new RegExp(/^(0|256)?(77|39)(2|4|8|9)[0-9]{6}$/); //an MTN mobile money number

        if (control.value.match(regEx)) {
            return null;
        } else {
            return { 'momoAccountValidator': true };
        }
    }

    static phoneNumberValidator(control: FormControl): ValidationErrors {

        //^ beginning of string
        // (0|256)? either 0 or 256 at the beginning or nothing (?)
        //(4|7|3) either 4 or 7 or 3
        //[0-9] digit between 0 and 9, both inclusive, note: \d and [0-9] both mean the same thing
        //{6} should be exactly 8 occurrencies
        let regEx = new RegExp(/^(0|256)?(4|7|3)[0-9]{8}$/); //a phone number in uganda e.g. 0412 111 333

        if (control.value.match(regEx)) {
            return null;
        } else {
            return { 'phone_number_validator': true };
        }
    }



    static telesolaAccountValidator(control: FormControl) {

        //let regEx = new RegExp(/^[a-zA-Z]\d{9}$/);
        let regEx = new RegExp(/^(0|256)?(77|39|70|72|71|79|75)[0-9]{7}$/); //a phone number

        if (control.value.match(regEx)) {
            return null;
        } else {
            return { 'telesolaAccountValidator': true };
        }
    }

    static macAddressValidator(control: FormControl) {

        let regEx = new RegExp(/^[a-zA-Z-]$/)
    }
    static creditCardValidator(control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        } else {
            return { 'invalidCreditCard': true };
        }
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }


}

