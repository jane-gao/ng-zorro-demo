import {Injectable} from '@angular/core';
import {NzNotificationService} from "ng-zorro-antd";
import {SettingUrl} from "../../public/setting/setting_url";
import {AjaxService} from "../../public/service/ajax.service";
declare var $: any;

@Injectable()
export class EnterpriseService {

  constructor(public _notification: NzNotificationService) {
  }

  /**
   *  获取企业列表
   * @param url
   * @param data
   */
  queryEnterpriseList(data) {
    let me = this, defer = $.Deferred();
    AjaxService.get({
      url: SettingUrl.URL.enterprise.list,
      data: data,
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
    return defer.promise(); //返回异步请求消息
  }
}
