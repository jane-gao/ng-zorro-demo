import {NgModule} from "@angular/core";
import {StaffComponent} from "./staff/staff.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {AuthLimitService} from "./auth-limit.service";
import {StaffAddComponent} from "./staff-add/staff-add.component";
import {FileUploadModule} from "ng2-file-upload";
import {RoleComponent} from "./role/role.component";
import {AssignPowerComponent} from "./assign-power/assign-power.component";
import {AddRoleComponent} from "./add-role/add-role.component";
import {UpdateRoleComponent} from "./update-role/update-role.component";
import {MenuComponent} from "./menu/menu.component";
import {MenuAddComponent} from "./menu-add/menu-add.component";
import {MenuUpComponent} from "./menu-up/menu-up.component";
import {UpPwdComponent} from "./up-pwd/up-pwd.component";
import {BindRolesComponent} from "./bind-roles/bind-roles.component";

const routes: Routes = [
  {path: '', redirectTo: 'staff'},
  {
    path: 'staff', component: StaffComponent, children: [
    {path: 'add', component: StaffAddComponent},
    {path: 'up', component: StaffAddComponent},
  ]
  },
  {
    path: 'role', component: RoleComponent, children: [
    {path: 'assignRole', component: AssignPowerComponent},
  ]
  },
  {path: 'menu', component: MenuComponent},
  {path: 'addRole', component: AddRoleComponent},
  {path: 'updateRole', component: UpdateRoleComponent},
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes),
    FileUploadModule
  ],
  declarations: [
    StaffComponent,
    StaffAddComponent,
    RoleComponent,
    AddRoleComponent,
    UpdateRoleComponent,
    AssignPowerComponent,
    MenuComponent,
    MenuAddComponent,
    MenuUpComponent,
    UpPwdComponent,
    BindRolesComponent],
  providers: [AuthLimitService],
  entryComponents: [UpPwdComponent, BindRolesComponent, AddRoleComponent, UpdateRoleComponent, MenuAddComponent, MenuUpComponent]
})
export class AuthLimitModule {
}
