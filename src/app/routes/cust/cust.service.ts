import {Injectable} from '@angular/core';
import {AjaxService} from "../../public/service/ajax.service";
import {NzNotificationService} from "ng-zorro-antd";
import {SettingUrl} from "../../public/setting/setting_url";
declare var $: any;

@Injectable()
export class CustService {
  constructor(public _notification: NzNotificationService) {
  }


  /**
   *  获取用户列表
   * @param url
   * @param data
   */
  queryCustList(data) {
    let me = this, defer = $.Deferred();
    AjaxService.get({
      url: SettingUrl.URL.cust.list,
      data: data,
      async: false,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          defer.reject(false);
          me._notification.error(`错误提示`, res.info);
        }
      },
      error: () => {
        defer.reject(false);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
  }


}
