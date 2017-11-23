import { CheckboxPipesComponent } from './../checkbox-pipes/checkbox-pipes.component';
import { CheckboxesComponent } from './../checkboxes/checkboxes.component';
import { CreateLocationComponent } from './../create-location/create-location.component';
//import { ManageLocationComponent } from './../manage-location/manage-location.component';
import { FaqsComponent } from './../faqs-component/faqs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadChildren, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { NewadvertComponent } from '../newadvert/newadvert.component';
import { HomeComponent } from '../home/home.component';
import { PricingComponent } from '../pricing/pricing.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { EditAdvertComponent } from '../edit-advert/edit-advert.component';
import { ShowAdvertComponent } from '../show-advert/show-advert.component';
import { AdvertTemplatesComponent } from '../advert-templates/advert-templates.component';
import { ManageAccountComponent } from '../manage-account/manage-account.component';
import { ConfirmOtpComponent } from '../confirm-otp/confirm-otp.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { TermsComponent } from '../terms/terms.component';



const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'checkbox-pipe', component: CheckboxPipesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'newadvert', component: NewadvertComponent },
  { path: 'create_location', component: CreateLocationComponent },
  { path: 'checkbox', component: CheckboxesComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'advert_templates', component: AdvertTemplatesComponent },
  { path: 'manage_account', component: ManageAccountComponent, canActivate: [AuthGuard] },
  //{ path: 'manage_location', component: ManageLocationComponent, canActivate: [AuthGuard] },
  //{path: 'manage_ads', component: ManageAdvertsComponent , canActivate: [AuthGuard] },
  { path: 'manage_adverts', loadChildren: 'manage-ads-module/manage-ads.module#ManageAdModule' },
  { path: 'edit_advert/:id', component: EditAdvertComponent },
  { path: 'show_advert/:id', component: ShowAdvertComponent, canActivate: [AuthGuard] },
  { path: 'confirm_otp', component: ConfirmOtpComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' } //means catch all/any path name and redirect to '' i.e. home. Now, may be we can create a 404 page for this & redirect users here instead of just home
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  NewadvertComponent,
  PricingComponent]
