import {MainComponent} from "../layout/main/main.component";
import {SimpleComponent} from "../layout/simple/simple.component";
import {PageComponent} from "../layout/page/page.component";
import {SettingUrl} from "../public/setting/setting_url";
import {CanStoreProvide} from "../public/provide/can-store-provide";

export const routes = [
  {
    path: 'main',
    component: MainComponent,
    // canActivate: [CanStoreProvide], //路由守卫
    children: [
      {path: 'home', loadChildren: './home/home.module#HomeModule'}, //首页
      {path: 'user', loadChildren: './users/users.module#UsersModule'}, //用户
      {path: 'finance', loadChildren: './finance/finance.module#FinanceModule'}, //财务
      {path: 'announce', loadChildren: './announce/announce.module#AnnounceModule'}, //公告
      {path: 'setting', loadChildren: './basic-setting/basic-setting.module#BasicSettingModule'}, //基本设置
      {path: 'auth', loadChildren: './auth-limit/auth-limit.module#AuthLimitModule'}, //权限管理
      {path: 'operation', loadChildren: './operation/operation.module#OperationModule'}, //运营管理
    ]
  },
  {
    path: 'page',
    component: PageComponent,
    children: [
      {path: '', loadChildren: './login/login.module#LoginModule'},
    ]
  },
  // 路由指向找不到时，指向这里
  {path: '**', redirectTo: SettingUrl.ROUTERLINK.pass.login}
];
