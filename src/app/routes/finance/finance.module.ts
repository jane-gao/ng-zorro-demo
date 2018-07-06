import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceComponent } from './finance/finance.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {FinanceService} from "./finance.service";

const routes: Routes = [
  {path: '', component: FinanceComponent},
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [FinanceComponent],
  providers: [FinanceService]
})
export class FinanceModule { }
