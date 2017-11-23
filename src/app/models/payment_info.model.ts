import { PaymentMethod } from '../enums/payment-method.enum';

export class PaymentInfo {

    payment_method: string;
    account_number: string;

    paymentMethodNotSelected: boolean = false;
    accountNumberIsInvalid: boolean = false;

    paymentFieldsLoading: boolean = false;

    errors = [];

    validateRecords() {
        this.errors = [];
        this.validatePaymentMethod();
        this.validateAccountNumber();
        return this.errors;
    }

    validatePaymentMethod() {
        if (this.payment_method == null ||
            this.payment_method == undefined) {
            this.paymentMethodNotSelected = true;
            this.errors.push("Please select a payment method");
        } else {
            this.paymentMethodNotSelected = false;
        }
    }

    validateAccountNumber() {
        if (this.payment_method != null &&
            this.payment_method != undefined) {
            if (this.validateMsisdn(this.account_number) == false) {

                this.accountNumberIsInvalid = true;
                this.errors.push("Please enter valid number");
            } else {
                this.accountNumberIsInvalid = false;
            }
        } else {
            this.accountNumberIsInvalid = false;
        }
    }

    //TO DO: Use regular expressions validator instead (it is much easier & shorter!)
    validateMsisdn(msisdn) {

        if (msisdn == undefined) {
            return false;
        } else if (msisdn.trim().length > 12 || msisdn.trim().length < 9) {
            return false;
        } else {

            var mtn_prefixes = ["077", "078", "039", "25677", "25678", "25639", "77", "78", "39"];

            var prefix = msisdn.substring(0, 5);
            if (mtn_prefixes.indexOf(prefix) == -1) {

                prefix = msisdn.substring(0, 3);
                if (mtn_prefixes.indexOf(prefix) == -1) {

                    prefix = msisdn.substring(0, 2);
                    if (mtn_prefixes.indexOf(prefix) == -1) {

                        return false;
                    }
                }



            } else {
                return true;
            }
        }
    }
}