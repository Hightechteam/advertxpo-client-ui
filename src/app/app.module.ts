//import { DataTableModule } from 'angular-4-data-table';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { ToastService } from './services/toast.service';
import { AppService } from './services/app.service';
import { UtilityService } from './services/utility.service';
import { ControlMessagesComponent } from './services/control-messages';
import { MapToKeysPipe } from './checkbox-pipes/map-to-keys.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ToastyModule } from 'ng2-toasty';

import { MyDatePickerModule } from 'mydatepicker';

import { AppRoutingModule, routingComponents } from './app-routing/app-routing.module';
import { AuthGuard } from './guards/auth.guard';
//import { ImageUploadModule } from 'angular2-image-upload';

import { AppComponent } from './app.component';
import { BasicAdInfoComponent } from './basic-ad-info/basic-ad-info.component';
import { TargetingComponent } from './targeting/targeting.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PreviewComponent } from './preview/preview.component';
import { PaymentComponent } from './payment/payment.component';
import { AdvertstatusComponent } from './advertstatus/advertstatus.component';
import { ScreenFilterPipe } from './pipes/screen-filter.pipe';
import { LoginComponent } from './login/login.component';
import { EditAdvertComponent } from './edit-advert/edit-advert.component';
import { TargetingSearchPipe } from './pipes/targeting-search.pipe';
import { ShowAdvertComponent } from './show-advert/show-advert.component';
import { SignupComponent } from './signup/signup.component';
import { AdvertTemplatesComponent } from './advert-templates/advert-templates.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { ConfirmOtpComponent } from './confirm-otp/confirm-otp.component';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { FaqsComponent } from './faqs-component/faqs.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CreateLocationComponent } from './create-location/create-location.component';
import { CheckboxesComponent } from './checkboxes/checkboxes.component';
import { CheckboxPipesComponent } from './checkbox-pipes/checkbox-pipes.component';
import { FooterComponent } from './footer/footer.component';
import { TermsComponent } from './terms/terms.component';
import { NewAdvertModalComponent } from './new-advert-modal/new-advert-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    BasicAdInfoComponent,
    TargetingComponent,
    ScheduleComponent,
    PreviewComponent,
    PaymentComponent,
    AdvertstatusComponent,
    ScreenFilterPipe,
    TargetingSearchPipe,
    LoginComponent,
    EditAdvertComponent,
    TargetingSearchPipe,
    ShowAdvertComponent,
    SignupComponent,
    AdvertTemplatesComponent,
    ManageAccountComponent,
    TooltipComponent,
    ConfirmOtpComponent,
    HomeNavComponent,
    FaqsComponent,
    ContactUsComponent,
    CreateLocationComponent,
    CheckboxesComponent,
    CheckboxPipesComponent,
    MapToKeysPipe,
    ControlMessagesComponent,
    FooterComponent,
    TermsComponent,
    NewAdvertModalComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MyDatePickerModule,
    MultiselectDropdownModule,
    ToastyModule.forRoot()
  ],
  providers: [UserService, UtilityService, DataService, AppService, ToastService, AuthGuard, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }