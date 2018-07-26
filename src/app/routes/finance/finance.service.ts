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
      data: {
        tc: tc
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

  /**
   * 查询付款记录列表
   */
  queryPayRec(data) {
    let me = this, defer = $.Deferred();
    AjaxService.post({
      url: SettingUrl.URL.finance.payRecList,
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
   * 加载支付记录
   * @param tc
   * @returns {any<T>}
   */
  loadPayRec(tc) {
    let me = this, defer = $.Deferred();
    AjaxService.post({
      url: SettingUrl.URL.finance.loadPayRec,
      data: {
        tc: tc
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

  /**
   * 修改支付记录状态
   */
  updatePayRecState(data) {
    let me = this, defer = $.Deferred();
    AjaxService.post({
      url: SettingUrl.URL.finance.updatePayRecState,
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
   * 查询结算记录列表
   */
  querySettleRec(data) {
    let me = this, defer = $.Deferred();
    AjaxService.post({
      url: SettingUrl.URL.finance.settleRecList,
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
   * 加载支付记录
   * @param tc
   * @returns {any<T>}
   */
  loadSettleRec(tc) {
    let me = this, defer = $.Deferred();
    AjaxService.post({
      url: SettingUrl.URL.finance.loadSettleRec,
      data: {
        tc: tc
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

  /**
   * 修改结算记录状态
   */
  updateSettleRecState(data) {
    let me = this, defer = $.Deferred();
    AjaxService.post({
      url: SettingUrl.URL.finance.updateSettleRecState,
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
