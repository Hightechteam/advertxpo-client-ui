import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  current_user: any = JSON.parse(localStorage.getItem('current_user'));

  advertiserButtonText: string;
  locationOwnerButtonText: string;
  signUpEarnButtonText: string;

  constructor(private userService: UserService, private router: Router) {
    console.log("constructor 0");
    console.log(this.advertiserButtonText);
  }

  public isUserLoggedIn(): boolean {
    return (this.userService.isUserLoggedIn());

  }

  ngOnChanges() {
    console.log("ngOnChanges 1");
    console.log(this.advertiserButtonText);
  }
  ngOnInit() {
    console.log("ngOnInit 2");
    console.log(this.advertiserButtonText);
  }



  ngDoCheck() {

    if (this.isUserLoggedIn()) {
      this.advertiserButtonText = "Advertise now";
      this.locationOwnerButtonText = "Sign up a location";
      this.signUpEarnButtonText = "Add a location";

    } else {
      this.advertiserButtonText = "I'm an advertiser";
      this.locationOwnerButtonText = "I'm a location owner";
      this.signUpEarnButtonText = "GET STARTED";

    }

    console.log("ngDoCheck 3");
    console.log(this.advertiserButtonText);
  }
  ngAfterContentInit() {
    console.log("ngAfterContentInit 4");
    console.log(this.advertiserButtonText);
  }
  ngAfterContentChecked() {
    console.log("ngAfterContentChecked 5");
    console.log(this.advertiserButtonText);
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit 6");
    console.log(this.advertiserButtonText);
  }
  ngAfterViewChecked() {
    console.log("ngAfterViewChecked 7");
    console.log(this.advertiserButtonText);
  }
  ngOnDestroy() {
    console.log("ngOnDestroy 8");
    console.log(this.advertiserButtonText);
  }

}
