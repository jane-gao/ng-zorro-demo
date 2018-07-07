import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Setting} from "../../../public/setting/setting";
import {SettingUrl} from "../../../public/setting/setting_url";
import {LoginService} from "../login.service";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  array = ['../../../assets/img/bak/1.png'];//广告banner
  validateForm: FormGroup;//登录的表单
  app = Setting.APP; //平台基本信息

  constructor(public fb: FormBuilder, public loginService: LoginService, public router: Router, public cookieService: CookieService) {
    this.validateForm = this.fb.group({
      loginCode: [null, [Validators.required]],
      pwd: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    //判断是否已经登录，已经登录，引导进入首页
    let loginCookie = this.cookieService.get(Setting.cookie.loginCookie);
    if (loginCookie) this.router.navigate([SettingUrl.ROUTERLINK.basic.home]); //路由跳转（首页）
  }

  /**
   * 登录
   * @param $event
   * @param value
   */

  login = ($event) => {
    $event.preventDefault();
    let me = this;
    for (const key in me.validateForm.controls) {
      me.validateForm.controls[key].markAsDirty();
    }
    let callback = function () {
      me.router.navigate([SettingUrl.ROUTERLINK.basic.home])
    }
    me.loginService.login(me.validateForm.value, callback);
  };

  /**
   * from表单
   * @param name
   * @returns {AbstractControl}
   */
  getFormControl(name) {
    return this.validateForm.controls[name];
  }


}
