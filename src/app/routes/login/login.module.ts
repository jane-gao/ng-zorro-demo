import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {LoginService} from "./login.service";

const routes: Routes = [
  {path: '', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent],
  exports: [
    RouterModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule {
}
