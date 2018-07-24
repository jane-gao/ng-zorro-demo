import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FinanceComponent} from './finance/finance.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {FinanceService} from "./finance.service";
import {BiddingSettleComponent} from './bidding-settle/bidding-settle.component';
import { FinanceDetailComponent } from './finance-detail/finance-detail.component';

const routes: Routes = [
  {path: '', component: FinanceComponent},
  {path: 'financeManager', component: FinanceComponent},
  {path: 'biddingSetttle', component: BiddingSettleComponent},
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [FinanceComponent, BiddingSettleComponent, FinanceDetailComponent],
  providers: [FinanceService]
})
export class FinanceModule {
}
