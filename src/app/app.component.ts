import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIGS } from './configs';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {


  current_user: any;

  constructor(private router: Router) { }

  ngAfterViewInit() {

    $(document).ready(function () {

      var homeComponent = $('#home-component');

      // var scroll_start = 0;
      // var startchange = $('#startchange');
      // var offset = startchange.offset();

      //if (startchange.length) {

      $(document).scroll(function () {

        //scroll_start = $(this).scrollTop();
        //var targetPos = $('#stick-position-home').offset().top;
        var navBar = $('#navig-bar').offset().top;
        //var signupPage = $('#signup-page').offset().top;

        //console.log("document scroll top    : " + scroll_start);
        //console.log("#startchange offset top: " + offset.top);
        //console.log("growbiz position       : " + targetPos);
        console.log("navbar position        : " + navBar);
        //console.log("signup position        : " + signupPage);

        if (navBar > 50) {

          $(".navbar-default").css({
            'background-color': 'rgba(0,0,0,0.95)',
            'box-shadow': '0 3px 5px rgba(57, 63, 72, 0.3)',
            '-moz-box-shadow': '0 3px 5px rgba(57, 63, 72, 0.3)',
            '-webkit-box-shadow': '0 3px 5px rgba(57, 63, 72, 0.3)'
          });

        } else {

          $('.navbar-default').css({
            //'background-color': 'transparent',
            'box-shadow': 'none',
            '-moz-box-shadow': 'none',
            '-webkit-box-shadow': 'none'
          });
          
        }
      });
      //}

    });

  }

  // signOutClicked(){
  //   localStorage.clear();
  //   this.router.navigate(['/home']);
  // }

  // isUserLoggedIn(){
  //  if (localStorage.getItem(APP_CONFIGS.CURRENT_USER_REFERENCE_KEY)) {
  //         return true;
  //   }else{
  //       return false;
  //   }
  // }

  // getCurrentUserName(){
  //   if(this.isUserLoggedIn()){
  //     return JSON.parse(localStorage.getItem(APP_CONFIGS.CURRENT_USER_REFERENCE_KEY)).first_name;
  //   }else{
  //     return "";
  //   }
  // }

}
