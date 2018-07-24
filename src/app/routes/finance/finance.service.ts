import {Injectable} from "@angular/core";
import {SettingUrl} from "../../public/setting/setting_url";
import {AjaxService} from "../../public/service/ajax.service";
import {NzNotificationService} from "ng-zorro-antd";

declare var $: any;

@Injectable()
export class FinanceService {

  constructor(private _notification: NzNotificationService) {
  }

  /**
   * 查询平台流水
   */
  queryFinaceRec(data) {
    let me = this, defer = $.Deferred();
    AjaxService.get({
      url: SettingUrl.URL.finance.list,
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

  /**
   * 根据tc查询平台财务流水
   * @param tc
   */
  loadPlatRec(tc: string) {
    let me = this, defer = $.Deferred();
    AjaxService.get({
      url: SettingUrl.URL.finance.load,
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
  /**
   * 查询平台账户余额
   * @returns {any<T>}
   */
  loadBalance() {
    let me = this, defer = $.Deferred();
    AjaxService.get({
      url: SettingUrl.URL.finance.loadBalance,
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
