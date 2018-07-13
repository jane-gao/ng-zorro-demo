import {Injectable} from '@angular/core';
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {Location} from "@angular/common";
import {NzNotificationService} from "ng-zorro-antd";
declare var $: any;

@Injectable()
export class AnnounceService {

  constructor(public location: Location, public _notification: NzNotificationService) {
  }

  /**
   * getAnnounceList
   * @param data
   * @returns {any<T>}
   */
  static getAnnounceList(data) {
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.announce.list,
      data: data,
      complete: (res) => {
        defer.resolve(res.responseJSON);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * getAnnounceById
   * @param id
   * @returns {any<T>}
   */
  static getAnnounceById(id) {
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.announce.load,
      data: {id:id},
      complete: (res) => {
        defer.resolve(res.responseJSON.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 创建公告
   * @param formValue
   */
  createAnnounce(formValue) {
    const me = this;
    AjaxService.post({
      url: SettingUrl.URL.announce.create,
      data: formValue,
      success: (res) => {
        if (res.success) {
          me.location.back();
        } else {
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
  }

  /**
   * 修改公告
   * @param formValue
   */
  updateAnnounce(formValue) {
    const me = this;
    AjaxService.put({
      url: SettingUrl.URL.announce.update,
      data: formValue,
      success: (res) => {
        if (res.success) {
          me.location.back();
        } else {
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
  }

  /**
   * 删除公告
   * @param id
   * @returns {any<T>}
   */
  deleteAnnounce(id) {
    var me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.del({
      url: SettingUrl.URL.announce.delete,
      data: {id: id},
      complete: (res) => {
        let result = res.responseJSON;
        if (result.success) {
          defer.resolve(true);
          me._notification.success('操作成功', result.info)
        } else {
          me._notification.error('操作失败', result.info)
        }
      }
    });
    return defer.promise(); //返回异步请求休息
  }

}
