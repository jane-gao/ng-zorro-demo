import {Injectable} from '@angular/core';
import {AjaxService} from "../../public/service/ajax.service";
import {NzNotificationService} from "ng-zorro-antd";
import {SettingUrl} from "../../public/setting/setting_url";
declare var $: any;
@Injectable()
export class ProductService {


  constructor(private _notification: NzNotificationService) {
  }


  /**
   * 查询产品列表
   * @param data
   * @returns {any<T>}
   */
  queryProductList(data) {
    let me = this, defer = $.Deferred();
    AjaxService.get({
      url: SettingUrl.URL.product.list,
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
   * 加载一个产品
   * @param data
   * @returns {any<T>}
   */
  loadProduct(productCode) {
    let me = this, defer = $.Deferred();
    AjaxService.get({
      url: SettingUrl.URL.product.loadProduct,
      data: {
        productCode: productCode
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
   * 审核产品
   * @param data
   * @returns {any<T>}
   */
  updateState(data) {
    let me = this, defer = $.Deferred();
    AjaxService.put({
      url: SettingUrl.URL.product.updateState,
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
