import {Injectable} from '@angular/core';
import {NzNotificationService} from "ng-zorro-antd";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
declare var $: any;


@Injectable()
export class PlatNormService {

  constructor(public _notification: NzNotificationService) {
  }

  /**
   * 获取标准列表
   * @param data
   * @returns {any<T>}
   */
  getPlatNormList(data) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.norm.queryPlateNormByPage,
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
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 获取标准
   * @param data
   * @returns {any<T>}
   */
  loadNormByNormCode(normCode) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.norm.loadNormByNormCode,
      data: {normCode: normCode},
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
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 添加标准
   * @param params
   * @returns {any<T>}
   */
  addPlatNorm(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.norm.addPlatNorm,
      data: params,
      success: (res) => {
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
  upPlatNorm(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.norm.updatePlatNorm,
      data: params,
      success: (res) => {
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
   * 修改标准状态
   * @param params
   * @returns {any<T>}
   */
  upPlatNormStateByCode(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.norm.updateStateByCode,
      data: params,
      success: (res) => {
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
   * 删除标准
   * @param params
   * @returns {any<T>}
   */
  deletePlatNorm(normCode) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.del({
      url: SettingUrl.URL.norm.deletePlatNorm,
      data: {normCode:normCode},
      success: (res) => {
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
   * 获取标准参数列表
   * @param data
   * @returns {any<T>}
   */
  loadParamByNormCode(normCode) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.normParam.loadParamByNormCode,
      data: {normCode: normCode},
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
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 添加标准参数
   * @param params
   * @returns {any<T>}
   */
  addPlatNormParam(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.normParam.addPlatNorm,
      data: JSON.stringify(params),
      contentType: "application/json",
      success: (res) => {
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
   * 修改标准参数
   * @param params
   * @returns {any<T>}
   */
  upPlatNormParam(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.normParam.updatePlatNorm,
      data: params,
      success: (res) => {
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
   * 修改标准参数状态
   * @param params
   * @returns {any<T>}
   */
  upPlatNormParamStateByCode(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.normParam.updateStateByCode,
      data: params,
      success: (res) => {
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
   * 删除标准参数
   * @param params
   * @returns {any<T>}
   */
  deletePlatNormParam(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.del({
      url: SettingUrl.URL.normParam.deletePlatNorm,
      data: params,
      success: (res) => {
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
