import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BiddingComponent} from './bidding/bidding.component';
import {BiddingService} from "./bidding.service";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {path: '', redirectTo: 'biddingManager'},
  {path: 'biddingManager', component: BiddingComponent},
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [BiddingComponent],
  providers: [BiddingService]
})
export class BiddingModule {
}
