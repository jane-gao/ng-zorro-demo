import {NgModule} from "@angular/core";
import {KindsComponent} from "./kinds/kinds.component";
import {BrandsComponent} from "./brands/brands.component";
import {HelpKindComponent} from "./help-kind/help-kind.component";
import {HelpAnswerComponent} from "./help-answer/help-answer.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {OperationService} from "./operation.service";
import {BrandAddComponent} from './brand-add/brand-add.component';
import {BrandUpComponent} from './brand-up/brand-up.component';

const routes: Routes = [
  {path: '', redirectTo: 'help-kind'},
  {path: 'kinds', component: KindsComponent},
  {path: 'brands', component: BrandsComponent},
  {path: 'help-kind', component: HelpKindComponent},
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [KindsComponent, BrandsComponent, HelpKindComponent, HelpAnswerComponent, BrandAddComponent, BrandUpComponent],
  providers: [OperationService],
  entryComponents: [BrandAddComponent, BrandUpComponent]
})
export class OperationModule {
}
