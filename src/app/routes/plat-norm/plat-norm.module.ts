import {NgModule} from "@angular/core";
import {PlatNormService} from "./plat-norm.service";
import {NormValueComponent} from "./norm-value/norm-value.component";
import {NormsComponent} from "./norms/norms.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {path: '', component: NormsComponent},
  {path: 'values', component: NormValueComponent}
];
@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [NormValueComponent, NormsComponent],
  providers: [PlatNormService]
})
export class PlatNormModule {
}
