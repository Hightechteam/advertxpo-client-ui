import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PaymentInfo } from '../models/payment_info.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {

  @Output() broadcastPaymentInfo: EventEmitter<PaymentInfo> = new EventEmitter<PaymentInfo>();

  paymentInfo: PaymentInfo = new PaymentInfo;

  constructor() { }

  ngOnInit() {
    this.passPaymentInfoToParentComponent();
  }


  passPaymentInfoToParentComponent(){
    this.broadcastPaymentInfo.emit(this.paymentInfo);
  }

  paymentMethodChanged(){
    this.paymentInfo.validatePaymentMethod();
    this.passPaymentInfoToParentComponent();
  }

  accountNumberChanged(){
    this.paymentInfo.validateAccountNumber();
    this.passPaymentInfoToParentComponent();
  }

  isMobileMoneySelected(): boolean{
    return(this.paymentInfo.payment_method == "MTNMOMO_UG")
  }

  loadingDone(): boolean{
    return this.paymentInfo.paymentFieldsLoading;
  }

}
