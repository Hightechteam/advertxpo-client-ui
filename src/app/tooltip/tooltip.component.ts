import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  message: string = "";

  constructor(elm: ElementRef) {
    this.message = elm.nativeElement.getAttribute('message'); 
  }

  ngOnInit() {
  }

}
