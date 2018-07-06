import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DataTypeComponent} from "./data-type/data-type.component";
import {DataValueComponent} from "./data-value/data-value.component";
import {SharedModule} from "../../shared/shared.module";
import {BasicSettingComponent} from "./basic-setting/basic-setting.component";
import {BasicSettingService} from "./basic-setting.service";
import { AreaComponent } from './area/area.component';

const routes: Routes = [
  {path: '', redirectTo: 'data'},
  {path: 'data', component: DataTypeComponent},
  {path: 'basic', component: BasicSettingComponent},
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [DataTypeComponent, DataValueComponent, BasicSettingComponent, AreaComponent],
  providers: [BasicSettingService]
})
export class BasicSettingModule { }
