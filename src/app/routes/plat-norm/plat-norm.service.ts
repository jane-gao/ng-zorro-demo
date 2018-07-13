import { Injectable } from '@angular/core';
import {NzNotificationService} from "ng-zorro-antd";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
declare var $: any;


@Injectable()
export class PlatNormService {

  constructor(public _notification: NzNotificationService) { }

  /**
   * 获取标准列表
   * @param data
   * @returns {any<T>}
   */
  getStandardList(data) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.brand.getBrandPages,
      data: data,
      success: (res) => {
        let info = res.info;
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
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 添加标准
   * @param params
   * @returns {any<T>}
   */
  addStandard(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.brand.addBrand,
      data: params,
      success: (res) => {
        let info = res.info;
        if (res.success) {
          defer.resolve(true);
          me._notification.success(`操作成功`, res.info);
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
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 修改标准
   * @param params
   * @returns {any<T>}
   */
  upStandard(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.brand.updateBrand,
      data: params,
      success: (res) => {
        let info = res.info;
        if (res.success) {
          defer.resolve(true);
          me._notification.success(`操作成功`, res.info);
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
    return defer.promise(); //返回异步请求休息
  }
  /**
   * 修改标准
   * @param params
   * @returns {any<T>}
   */
  upStandardValueByCode(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.brand.updateBrand,
      data: params,
      success: (res) => {
        let info = res.info;
        if (res.success) {
          defer.resolve(true);
          me._notification.success(`操作成功`, res.info);
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
    return defer.promise(); //返回异步请求休息
  }

}
