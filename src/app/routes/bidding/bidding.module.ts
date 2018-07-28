import {NgModule} from "@angular/core";
import {BiddingComponent} from "./bidding/bidding.component";
import {BiddingService} from "./bidding.service";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {BiddingDetailComponent} from "./bidding-detail/bidding-detail.component";

const routes: Routes = [
  {path: '', redirectTo: 'biddingManager'},
  {path: 'biddingManager', component: BiddingComponent},
  {path: 'biddingDetail', component: BiddingDetailComponent},
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
