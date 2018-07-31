import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";
import {Setting} from "../../public/setting/setting";
import {Util} from "../../public/util/util";
declare var $: any;

@Injectable()
export class LoginService {

  constructor(public router: Router, public _notification: NzNotificationService) {
  }
  /**
   * 登录
   * @param requestDate
   * @param callback
   */
  login(requestDate: any, callback) {
    const me = this;
    AjaxService.post({
      url: SettingUrl.URL.login.login,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          callback(res.data)
        } else {
          me._notification.error(`失败`, res.info);
        }
      },
      error: (res) => {
        me._notification.error(`失败`, res.info);
      }
    });
  }

}
