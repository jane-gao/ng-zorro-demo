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

  /**
   * 查询企业入驻申请分页列表
   * @param data
   * @returns {any<T>}
   */
  queryEnterpriseJoinList(data) {
    let me = this, defer = $.Deferred();
    AjaxService.get({
      url: SettingUrl.URL.enterprise.joinList,
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
   * 查询企业详情
   * @param epCode
   */
  loadEnterprise(epCode ?: string) {
    let me = this, defer = $.Deferred();
    AjaxService.get({
      url: SettingUrl.URL.enterprise.loadEnterprise,
      data: {
        epCode: epCode
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
   * 查询企业入驻详情
   * @param epCode
   */
  loadEnterpriseJoin(epCode ?: string) {
    let me = this, defer = $.Deferred();
    AjaxService.get({
      url: SettingUrl.URL.enterprise.loadEnterpriseJoin,
      data: {
        epCode: epCode
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
   * 查询企业入驻审核记录
   * @param epCode
   */
  queryEnterpriseAuditResList(epCode ?: string) {
    let me = this, defer = $.Deferred();
    AjaxService.get({
      url: SettingUrl.URL.enterprise.auditRecList,
      data: {
        epCode: epCode
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
   * 审核企业入驻
   * @param data
   * @returns {any<T>}
   */
  auditEnterprise(data) {
    let me = this, defer = $.Deferred();
    AjaxService.put({
      url: SettingUrl.URL.enterprise.auditEnterprise,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res);
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
