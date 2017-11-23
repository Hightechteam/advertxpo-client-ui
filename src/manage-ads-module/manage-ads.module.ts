import { DataTableModule } from './../data-tables-module/data-table.module';
import { AuthGuard } from './../app/guards/auth.guard';
import { DataService } from './../app/services/data.service';
import { UtilityService } from './../app/services/utility.service';
import { ManageAdsComponent } from './manage-ads/manage-ads.component';
import { manageAdsRouting } from './manage-ads.routing';
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    manageAdsRouting,
    DataTableModule
  ],
  declarations: [ManageAdsComponent],
  providers: [],
})
export class ManageAdModule { } //with default we don't have to add '#' to loadChildren value
