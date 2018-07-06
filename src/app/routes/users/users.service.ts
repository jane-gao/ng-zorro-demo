import {Injectable} from '@angular/core';
import {SettingUrl} from "../../public/setting/setting_url";
import {AjaxService} from "../../public/service/ajax.service";
import {NzNotificationService} from "ng-zorro-antd";
declare var $: any;

@Injectable()
export class UsersService {

  constructor(public _notification: NzNotificationService) {
  }

  static getAllUsers(data) {
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.user.getList,
      data: data,
      complete: (res) => {
        defer.resolve(res.responseJSON);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 修改用户状态
   * @param custStateEnum
   * @param custCode
   * @returns {any<T>}
   */
  changeUserState(custStateEnum, custCode) {
    var me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.user.updateState,
      data: {
        custStateEnum: custStateEnum,
        custCode: custCode
      },
      complete: (res) => {
        let result = res.responseJSON;
        if (result.success) {
          defer.resolve(result.success);
          me._notification.success('操作成功', result.info)
        } else {
          me._notification.error('操作失败', '修改用户状态失败')
        }
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * getHecList
   * @param data
   * @returns {any<T>}
   */
  static getHecList(data) {
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.hec.list,
      data: data,
      complete: (res) => {
        defer.resolve(res.responseJSON);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * getFactorList
   * @param data
   * @returns {any<T>}
   */
  static getFactorList(data) {
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.factor.list,
      data: data,
      complete: (res) => {
        defer.resolve(res.responseJSON);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

}
