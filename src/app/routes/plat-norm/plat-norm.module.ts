import {NgModule} from "@angular/core";
import {PlatNormService} from "./plat-norm.service";
import {NormValueComponent} from "./norm-value/norm-value.component";
import {NormsComponent} from "./norms/norms.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {NormAddComponent} from './norm-add/norm-add.component';
import {NormUpComponent} from './norm-up/norm-up.component';
import {OperationService} from "../operation/operation.service";

const routes: Routes = [
  {path: '', component: NormsComponent},
  {path: 'values', component: NormValueComponent}
];
@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [NormValueComponent, NormsComponent, NormAddComponent, NormUpComponent],
  providers: [PlatNormService, OperationService],
  entryComponents: [NormAddComponent, NormUpComponent]
})
export class PlatNormModule {
}
