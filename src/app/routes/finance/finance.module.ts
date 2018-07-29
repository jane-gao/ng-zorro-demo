import {NgModule} from "@angular/core";
import {FinanceComponent} from "./finance/finance.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {FinanceService} from "./finance.service";
import {BiddingSettleComponent} from "./bidding-settle/bidding-settle.component";
import {FinanceDetailComponent} from "./finance-detail/finance-detail.component";
import {BiddingPayRecComponent} from "./bidding-pay-rec/bidding-pay-rec.component";
import {BiddingPayRecListComponent} from "./bidding-pay-rec-list/bidding-pay-rec-list.component";
import {BiddingPayRecDetailComponent} from "./bidding-pay-rec-detail/bidding-pay-rec-detail.component";
import {BiddingPayRecAuditWinComponent} from "./bidding-pay-rec-audit-win/bidding-pay-rec-audit-win.component";
import {BiddingSettleListComponent} from "./bidding-settle-list/bidding-settle-list.component";
import {BiddingSettleDetailComponent} from "./bidding-settle-detail/bidding-settle-detail.component";
import {BiddingSettleAuditWinComponent} from "./bidding-settle-audit-win/bidding-settle-audit-win.component";

const routes: Routes = [
  {path: '', component: FinanceComponent},
  {path: 'financeManager', component: FinanceComponent},
  {path: 'financeRecDetail', component: FinanceDetailComponent},
  {path: 'biddingPayRec', component: BiddingPayRecComponent},
  {path: 'biddingPayRecDetail', component: BiddingPayRecDetailComponent},
  {path: 'biddingSetttleRec', component: BiddingSettleComponent},
  {path: 'biddingSetttleRecDetail', component: BiddingSettleDetailComponent},
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [FinanceComponent, BiddingSettleComponent, FinanceDetailComponent, BiddingPayRecComponent, BiddingPayRecListComponent, BiddingPayRecDetailComponent, BiddingPayRecAuditWinComponent, BiddingSettleListComponent, BiddingSettleDetailComponent, BiddingSettleAuditWinComponent],
  providers: [FinanceService],
  entryComponents: [BiddingPayRecAuditWinComponent, BiddingSettleAuditWinComponent]
})
export class FinanceModule {
}
