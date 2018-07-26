import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BiddingComponent} from './bidding/bidding.component';
import {BiddingService} from "./bidding.service";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { BiddingDetailComponent } from './bidding-detail/bidding-detail.component';
import {NzPopoverDirective, NzPopoverModule} from "ng-zorro-antd";

const routes: Routes = [
  {path: '', redirectTo: 'biddingManager'},
  {path: 'biddingManager', component: BiddingComponent},
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes),

  ],
  declarations: [BiddingComponent, BiddingDetailComponent],
  providers: [BiddingService]
})
export class BiddingModule {
}
