
/* I think these(everything inside app that we are using here) need to be shared */
import { AuthGuard } from './../app/guards/auth.guard';

import { ManageAdsComponent } from './manage-ads/manage-ads.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

    { path: '', component: ManageAdsComponent, canActivate: [AuthGuard] }
]

export const manageAdsRouting: ModuleWithProviders = RouterModule.forChild(routes);