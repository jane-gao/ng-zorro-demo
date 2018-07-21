import {NgModule} from '@angular/core';
import {EnterpriseComponent} from './enterprise/enterprise.component';
import {EnterpriseAuditComponent} from './enterprise-audit/enterprise-audit.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {EnterpriseService} from "./enterprise.service";

const routes: Routes = [
  {path: '', redirectTo: 'enterpriseManager'},
  {path: 'enterpriseManager', component: EnterpriseComponent},
  {path: 'enterpriseAudit', component: EnterpriseAuditComponent},
  {path: 'enterpriseDetail', component: EnterpriseAuditComponent}
];
@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [EnterpriseComponent, EnterpriseAuditComponent],
  providers: [EnterpriseService]
})
export class EnterpriseModule {
}
