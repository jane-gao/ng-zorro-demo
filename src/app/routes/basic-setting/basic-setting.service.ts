import {Injectable} from '@angular/core';
import {SettingUrl} from "../../public/setting/setting_url";
import {AjaxService} from "../../public/service/ajax.service";
import {NzNotificationService} from "ng-zorro-antd";
declare var $: any;

@Injectable()
export class BasicSettingService {

  constructor(public _notification: NzNotificationService) {
  }

  /**
   * getList
   * @param data(表单数据)
   * @param type('type' | 'val')
   * @returns {any<T>}
   */
  static getList(type, data) {
    var defer = $.Deferred(); //封装异步请求结果
    let repUrl = type === 'type' ? SettingUrl.URL.datadict.getTypeList : SettingUrl.URL.datadict.getValList;
    AjaxService.get({
      url: repUrl,
      data: data,
      complete: (res) => {
        defer.resolve(res.responseJSON);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * getDataByCode
   * @param type
   * @param data
   * @returns {any<T>}
   */
  static getDataByCode(type, data) {
    var defer = $.Deferred(); //封装异步请求结果
    let repUrl = type === 'type' ? SettingUrl.URL.datadict.getTypeByCode : SettingUrl.URL.datadict.getValByCode;
    AjaxService.get({
      url: repUrl,
      data: data,
      complete: (res) => {
        defer.resolve(res.responseJSON);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 添加addData
   * @param formValue({name, remark, code, isUniqueVal} | {typeCode, info, remark})
   * @param type('type' | 'val')
   */
  addData(formValue, type) {
    const me = this;
    var defer = $.Deferred(); //封装异步请求结果
    let repUrl = type === 'type' ? SettingUrl.URL.datadict.addType : SettingUrl.URL.datadict.addVal;
    AjaxService.post({
      url: repUrl,
      data: formValue,
      success: (res) => {
        if (res.success) {
          defer.resolve(true);
        } else {
          defer.resolve(false);
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        defer.resolve(false);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 修改upData
   * @param formValue({name, remark, code} | {typeCode, code, info, remark})
   * @param type('type' | 'val')
   */
  upData(formValue, type) {
    const me = this;
    var defer = $.Deferred(); //封装异步请求结果
    let repUrl = type === 'type' ? SettingUrl.URL.datadict.upType : SettingUrl.URL.datadict.upVal;
    AjaxService.put({
      url: repUrl,
      data: formValue,
      success: (res) => {
        if (res.success) {
          defer.resolve(true);
        } else {
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 修改upEnable
   * @param data({code, enable})
   * @param type('type' | 'val')
   */
  upEnable(data, type) {
    const me = this;
    var defer = $.Deferred(); //封装异步请求结果
    let repUrl = type === 'type' ? SettingUrl.URL.datadict.enableType : SettingUrl.URL.datadict.enableVal;
    AjaxService.put({
      url: repUrl,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(true);
          me._notification.success(`操作成功`, res.info)
        } else {
          defer.resolve(false);
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        defer.resolve(false);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }
  /**
   * deleteDatadictType
   * @param data({code, enable})
   * @param type('type' | 'val')
   */
  deleteDatadict(data, type) {
    const me = this;
    var defer = $.Deferred(); //封装异步请求结果
    let repUrl = type === 'type' ? SettingUrl.URL.datadict.deleteDatadictType : SettingUrl.URL.datadict.deleteDatadict;
    AjaxService.del({
      url: repUrl,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(true);
          me._notification.success(`操作成功`, res.info)
        } else {
          defer.resolve(false);
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        defer.resolve(false);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }

}
