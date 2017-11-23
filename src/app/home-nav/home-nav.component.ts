import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';
import { APP_CONFIGS } from '../configs';

declare var $: any;

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent implements OnInit {

  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {

    this.router.events.subscribe((evt) => { //has issue, when u navigate back, if previous page was scrolled down, state is not maintained - it scrolls to top as well
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
      //$("body").animate({ scrollTop: 0 }, 100);
    });

    /*this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationStart) {
        if (ev.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (ev instanceof NavigationEnd) {
        if (ev.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else
          window.scrollTo(0, 0);
          $("body").animate({ scrollTop: 0 }, 1000);
      }
    });*/
  }

  ngAfterViewInit() {

  }

  signOutClicked() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  isUserLoggedIn() {
    if (localStorage.getItem(APP_CONFIGS.CURRENT_USER_REFERENCE_KEY)) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentUserName() {
    if (this.isUserLoggedIn()) {
      return JSON.parse(localStorage.getItem(APP_CONFIGS.CURRENT_USER_REFERENCE_KEY)).first_name;
    } else {
      return "";
    }
  }


  // Closes the Responsive Menu on Menu Item Click

  closeMenu(): void {

    $('.navbar-collapse ul li a').click(function () {

      if (!($(this).closest('li').has('ul').length)) {

        $('.navbar-toggle:visible').click();
      }
    });
  }
}
