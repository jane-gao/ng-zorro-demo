import {NgModule} from "@angular/core";
import {UsersAllComponent} from "./users-all/users-all.component";
import {UsersFreezedComponent} from "./users-freezed/users-freezed.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {UserCandyComponent} from "./user-candy/user-candy.component";
import {UserFactorComponent} from "./user-factor/user-factor.component";
import {UserAuthComponent} from "./user-auth/user-auth.component";
import {UsersUnauthComponent} from "./users-unauth/users-unauth.component";
import {UsersService} from "./users.service";

const routes: Routes = [
  {path: '', redirectTo: 'all'},
  {path: 'all', component: UsersAllComponent},
  {path: 'freeze', component: UsersFreezedComponent},
  {path: 'auth', component: UsersUnauthComponent},
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  declarations: [UsersAllComponent, UsersFreezedComponent, UserCandyComponent, UserFactorComponent, UserAuthComponent, UsersUnauthComponent],
  entryComponents: [UserFactorComponent, UserCandyComponent, UserAuthComponent],//模态框注入
  providers:[UsersService]
})
export class UsersModule {
}
