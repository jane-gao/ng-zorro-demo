import {NgModule} from '@angular/core';
import {EnterpriseComponent} from './enterprise/enterprise.component';
import {EnterpriseAuditComponent} from './enterprise-audit/enterprise-audit.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {EnterpriseService} from "./enterprise.service";
import {EnterpriseJoinListComponent} from './enterprise-join-list/enterprise-join-list.component';
import {EnterpriseDetailComponent} from './enterprise-detail/enterprise-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'enterpriseManager'},
  {path: 'enterpriseManager', component: EnterpriseComponent},
  {path: 'enterpriseAudit', component: EnterpriseAuditComponent},
  {path: 'detail', component: EnterpriseDetailComponent}
];
@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [EnterpriseComponent, EnterpriseAuditComponent, EnterpriseJoinListComponent, EnterpriseDetailComponent],
  providers: [EnterpriseService]
})
export class EnterpriseModule {
}
