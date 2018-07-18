import {NgModule} from "@angular/core";
import {CustComponent} from "./cust/cust.component";
import {CustAuditComponent} from "./cust-audit/cust-audit.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {CustService} from "./cust.service";

const routes: Routes = [
  {path: '', redirectTo: 'custManager'},
  {path: 'custManager', component: CustComponent},
  {path: 'custAudit', component: CustAuditComponent}
];
@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [CustComponent, CustAuditComponent],
  providers: [CustService]
})
export class CustModule {
}
