import {Injectable} from "@angular/core";
import {SettingUrl} from "../../public/setting/setting_url";
import {AjaxService} from "../../public/service/ajax.service";
import {NzNotificationService} from "ng-zorro-antd";
declare var $: any;

@Injectable()
export class OperationService {

  constructor(public _notification: NzNotificationService) {
  }

  /**
   * 获取所有品牌列表
   * @param data
   * @returns {any<T>}
   */
  getBrandsAll(data) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.brand.queryAll,
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
   * 获取品牌列表
   * @param data
   * @returns {any<T>}
   */
  getBrandsList(data) {
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
   * 关联品牌和分类
   * @param params
   * @returns {any<T>}
   */
  addRelateBrandAndKind(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.kind.addRelateBrandAndKind,
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
   * 添加品牌
   * @param params
   * @returns {any<T>}
   */
  addBrand(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.brand.addBrand,
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
   * 修改品牌
   * @param params
   * @returns {any<T>}
   */
  updateBrand(params) {
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
   * 根据id获取品牌（含相关分类）
   * @param id，type = 'BRAND' | 'BRANDKIND'
   * @returns {any<T>}
   */
  getBrandById(id, type = 'BRAND') {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.brand.loadBrandById,
      data: {id: id, type: type},
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
   * 修改品牌是否推荐
   * @param id, brandRecommend
   * @returns {any<T>}
   */
  updateRecommend(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.brand.updateRecommend,
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
   * 修改品牌是否展示
   * @param id, state
   * @returns {any<T>}
   */
  updateBrandState(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.brand.updateState,
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
   * 删除品牌
   * @param id, state
   * @returns {any<T>}
   */
  deleteBrand(id) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.del({
      url: SettingUrl.URL.brand.deleteBrand,
      data: {id: id},
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
   * 按分类父ID分页查询商品分类信息
   * @param data
   * @returns {any<T>}
   */
  queryProductKindPageByParentId(data) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.kind.queryProductKindPageByParentId,
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
   * 增加商品分类
   * @param params
   * @returns {any<T>}
   */
  addProductKind(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.kind.addProductKind,
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
   * 根据分类id查询分类关联的所有品牌
   * @param id
   * @returns {any<T>}
   */
  queryBrandByKindId(id) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.kind.queryBrandByKindId,
      data: {id: id},
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
   * 按分类父ID查询商品分类信息
   * @param id
   * @returns {any<T>}
   */
  getKindByParentId(id) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.kind.queryKindByParentId,
      data: {kindParentId: id},
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
   * 按分类ID查询商品分类信息
   * @param id
   * @returns {any<T>}
   */
  loadProductKindById(id) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.kind.loadProductKindById,
      data: {id: id},
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
   * 修改商品分类
   * @param params
   * @returns {any<T>}
   */
  updateProductKind(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.kind.updateProductKind,
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
   * 控制分类显示隐藏
   * @param id, state
   * @returns {any<T>}
   */
  updateKindStateById(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.kind.updateStateById,
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
   * 删除商品分类
   * @param id, state
   * @returns {any<T>}
   */
  deleteProductKind(id) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.del({
      url: SettingUrl.URL.kind.deleteProductKind,
      data: {id: id},
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
   * 查询所有帮助分类
   * @param data
   * @returns {any<T>}
   */
  getAllHelpKinds(data) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.help.getAllHelpKinds,
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
   * 获取帮助分类列表
   * @param data
   * @returns {any<T>}
   */
  getHelpKindList(data) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.help.helpKindList,
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
   * 根据id获取帮助分类
   * @param id
   * @returns {any<T>}
   */
  getHelpKindById(id) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.help.getHelpKindById,
      data: {id: id},
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
   * 添加帮助分类
   * @param kindName, description, sort
   * @returns {any<T>}
   */
  addHelpKind(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.help.addHelpKind,
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
   * 修改帮助分类
   * @param id, kindName, description, sort
   * @returns {any<T>}
   */
  updateHelpKind(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.help.updateHelpKind,
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
   * 修改帮助分类状态
   * @param id, state
   * @returns {any<T>}
   */
  updateHelpKindState(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.help.updateHelpKindState,
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
   * 删除帮助分类
   * @param id, state
   * @returns {any<T>}
   */
  deleteHelpKind(id) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.help.deleteHelpKind,
      data: {id: id},
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
   * 获取帮助分类问答
   * @param data
   * @returns {any<T>}
   */
  getHelpAnswerList(data) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.help.helpAnswerList,
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
   * 根据id获取帮助问答
   * @param id
   * @returns {any<T>}
   */
  getHelpAnswerById(id) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.help.getHelpAnswerById,
      data: {id: id},
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
   * 添加帮助问答
   * @param kindId,question, answer, sort
   * @returns {any<T>}
   */
  addHelpQuestions(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.help.addHelpQuestions,
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
   * 修改帮助问答
   * @param id, question, answer, sort
   * @returns {any<T>}
   */
  updateHelpQuestion(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.help.updateHelpQuestion,
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
   * 修改帮助分类问答状态
   * @param id, state
   * @returns {any<T>}
   */
  updateHelpQuestionState(params) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.help.updateHelpQuestionState,
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
   * 删除帮助分类问答状态
   * @param id, state
   * @returns {any<T>}
   */
  deleteHelpQuestions(id) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.help.deleteHelpQuestions,
      data: {id: id},
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
