import {Component} from '@angular/core';
import {Setting} from "./public/setting/setting";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {SettingUrl} from "./public/setting/setting_url";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public router: Router, public location: Location, public cookieService: CookieService) {
    //判断是否已经登录，已经登录，引导进入首页
    let menusInfo: any = localStorage.getItem(Setting.cookie.menusInfo); //localStorage中取出menu菜单
    if (menusInfo) Setting.MENUS = JSON.parse(menusInfo); //menu菜单
  }

  ngOnInit() {
  }
}
