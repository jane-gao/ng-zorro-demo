import {Injectable} from '@angular/core';
import {NzNotificationService} from "ng-zorro-antd";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
declare var $: any;

@Injectable()
export class BiddingService {

  constructor(public _notification: NzNotificationService) {
  }

  /**
   * 查询竞标列表
   * @param data
   * @returns {any<T>}
   */
  queryBidingList(data) {
    let me = this, defer = $.Deferred();
    AjaxService.post({
      url: SettingUrl.URL.bidding.list,
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
   * 查询竞价详情
   * @param data
   * @returns {any<T>}
   */
  loadBidding(projectCode) {
    let me = this, defer = $.Deferred();
    AjaxService.post({
      url: SettingUrl.URL.bidding.loadBidding,
      data: {
        projectCode: projectCode
      },
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
