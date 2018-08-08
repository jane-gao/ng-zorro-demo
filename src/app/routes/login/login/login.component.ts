import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Setting} from "../../../public/setting/setting";
import {SettingUrl} from "../../../public/setting/setting_url";
import {LoginService} from "../login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  array = ['../../../assets/img/index/index-1.png'];//广告banner
  validateForm: FormGroup;//登录的表单
  app = Setting.APP; //平台基本信息

  constructor(public fb: FormBuilder, public loginService: LoginService, public router: Router) {
    this.validateForm = this.fb.group({
      loginCode: [null, [Validators.required]],
      pwd: [null, [Validators.required]],
    });
  }

  ngOnInit() {
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
    let callback = function (data) {
      //menus菜单
      me.router.navigate([SettingUrl.ROUTERLINK.basic.home]);
      if (data && data.menuVOList) Setting.MENUS = data.menuVOList;  //menus菜单
      else Setting.MENUS =  [];
      localStorage.setItem(Setting.cookie.menusInfo, JSON.stringify(Setting.MENUS)); //menus菜单存入localStorage
    };
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
