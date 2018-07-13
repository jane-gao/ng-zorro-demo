import {Injectable} from '@angular/core';
import {NzNotificationService} from "ng-zorro-antd";
import {SettingUrl} from "../../public/setting/setting_url";
import {AjaxService} from "../../public/service/ajax.service";
declare var $: any;

@Injectable()
export class AuthLimitService {

  constructor(public _notification: NzNotificationService) {
  }

  /**
   * getLimitList
   * @param data
   * @returns {any<T>}
   */
  static getLimitList(data) {
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.admin.limitList,
      data: data,
      success: (res) => {
        if (res) defer.resolve(res);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * getStaffList
   * @param data(表单数据)
   * @returns {any<T>}
   */
  static getStaffList(data) {
    let me = this;
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.staff.list,
      data: data,
      success: (res) => {
        if (res) defer.resolve(res);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * getMenuList
   * @param data(表单数据)
   * @returns {any<T>}
   */
  static getMenuList(data) {
    let me = this;
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.limit.menuList,
      data: data,
      success: (res) => {
        if (res) defer.resolve(res);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * getRolesList
   * @param data(表单数据)
   * @returns {any<T>}
   */
  getRolesList(data) {
    let me = this;
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.staff.rolesList,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          defer.reject(res.data);
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        defer.reject(res.data);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * getStaffByCode
   * @param data
   * @returns {any<T>}
   */
  getStaffByCode(data) {
    let me = this;
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.staff.load,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          defer.reject(res.data);
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        defer.reject(res.data);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * getMenuByCode
   * @param data
   * @returns {any<T>}
   */
  getMenuByCode(data) {
    let me = this;
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.limit.load,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          defer.reject(res.data);
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        defer.reject(res.data);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 添加addStaff
   * @param formValue
   */
  addStaff(formValue) {
    const me = this;
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.staff.add,
      mask: true,
      data: formValue,
      success: (res) => {
        if (res.success) {
          defer.resolve(true);
        } else {
          defer.reject(false);
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        defer.reject(false);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 添加addMenu
   * @param formValue
   */
  addMenu(formValue) {
    const me = this;
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.limit.addMenu,
      data: formValue,
      success: (res) => {
        if (res.success) {
          defer.resolve(true);
          me._notification.success('操作成功', res.info)
        } else {
          defer.reject(false);
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        defer.reject(false);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 为管理员分配角色
   * @param formValue
   */
  addRolesRelation(formValue) {
    const me = this;
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.staff.addRolesRelation,
      data: formValue,
      success: (res) => {
        if (res.success) {
          defer.resolve(true);
          me._notification.success('操作成功', res.info);
        } else {
          defer.reject(false);
          me._notification.error(`错误提示`, res.info);
        }
      },
      error: (res) => {
        defer.reject(false);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 为角色分配菜单权限
   * @param formValue
   */
  addLimitRelationForRole(formValue) {
    const me = this;
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.admin.addRelation,
      data: formValue,
      success: (res) => {
        if (res.success) {
          defer.resolve(true);
          me._notification.success(`操作成功`, res.info);
        } else {
          defer.reject(false);
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        defer.reject(false);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * upStaff
   * @param formValue
   */
  upStaff(formValue) {
    const me = this;
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.staff.update,
      data: formValue,
      success: (res) => {
        if (res.success) {
          defer.resolve(true);
          me._notification.success('操作成功', res.info)
        } else {
          defer.reject(true);
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        defer.reject(true);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * upMenu
   * @param formValue
   */
  upMenu(formValue) {
    const me = this;
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.limit.update,
      data: formValue,
      success: (res) => {
        if (res.success) {
          defer.resolve(true);
          me._notification.success('操作成功', res.info)
        } else {
          defer.reject(true);
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        defer.reject(true);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * upStaff
   * @param formValue
   */
  upStaffPwd(formValue) {
    const me = this;
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.staff.updatePwd,
      data: formValue,
      success: (res) => {
        if (res.success) {
          defer.resolve(true);
          me._notification.success('操作成功', res.info)
        } else {
          defer.reject(false);
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        defer.reject(false);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * upMenuState
   * @param formValue
   */
  upMenuState(formValue) {
    const me = this;
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.limit.updateState,
      data: formValue,
      success: (res) => {
        if (res.success) {
          defer.resolve(true);
          me._notification.success(`操作成功`, res.info)
        } else {
          defer.reject(false);
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        defer.reject(false);
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 查询管理员列表
   * @param data
   * @returns {any<T>} （查询参数）
   */
  adminList(data: any) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.basicSettings.list,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          defer.reject(res.data);
        }
      },
      error: (res) => {
        defer.reject(res.data);//页面不能空白，默认的数据
        me._notification.error(res.status, res.statusText);
      }
    });
    return defer.promise(); //返回异步请求消息
  }

  /**
   * 添加管理员信息
   * @param data
   * @returns {any<T>} （查询参数）
   */
  addList(data: any) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    //执行查询（异步）
    AjaxService.post({
      url: SettingUrl.URL.admin.addRole,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
          me._notification.success('成功了', res.info);
        } else {
          me._notification.error('出错了', res.info);
          defer.reject(res.data);
        }
      },
      error: (res) => {
        defer.reject(res.data);//页面不能空白，默认的数据
        me._notification.error(res.status, res.statusText);
      }
    });
    return defer.promise(); //返回异步请求消息
  }


  /**
   * 查看管理员
   * @param data
   * @returns {any<T>} （查询参数）
   */
  seeAdmin(data: any) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.login.load,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error('出错了', res.info);
          defer.reject(res.data);
        }
      },
      error: (res) => {
        defer.reject(res.data);//页面不能空白，默认的数据
        me._notification.error(res.status, res.statusText);
      }
    });
    return defer.promise(); //返回异步请求消息
  }


  /**
   * 修改管理员信息
   * @param data
   * @returns {any<T>} （查询参数）
   */
  update(data: any) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    //执行查询（异步）
    AjaxService.put({
      url: SettingUrl.URL.admin.updateRole,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
          me._notification.success('成功了', res.info);
        } else {
          me._notification.error('出错了', res.info);
          defer.reject(res.data);
        }
      },
      error: (res) => {
        defer.reject(res.data);//页面不能空白，默认的数据
        me._notification.error(res.status, res.statusText);
      }
    });
    return defer.promise(); //返回异步请求消息
  }


  /**
   * 修改管理员密码
   * @param data
   * @returns {any<T>} （查询参数）
   */
  updatePwd(data: any) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    //执行查询（异步）
    AjaxService.put({
      url: SettingUrl.URL.login.otherPwd,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
          me._notification.success('成功了', res.info);
        } else {
          me._notification.error('出错了', res.info);
          defer.reject(res.data);
        }
      },
      error: (res) => {
        defer.reject(res.data);//页面不能空白，默认的数据
        me._notification.error(res.status, res.statusText);
      }
    });
    return defer.promise(); //返回异步请求消息
  }

  /**
   * 删除管理员
   * @param data
   * @returns {any<T>} （查询参数）
   */
  delList(data: any) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    //执行查询（异步）
    AjaxService.put({
      url: SettingUrl.URL.login.del,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
          me._notification.success('成功', '成功删除此管理员');
        } else {
          defer.reject(res.data);
        }
      },
      error: (res) => {
        defer.reject(res.data);//页面不能空白，默认的数据
        me._notification.error(res.status, res.statusText);
      }
    });
    return defer.promise(); //返回异步请求消息
  }


  /**
   * 查询角色列表
   * @param data （查询参数）
   */
  roleList(data: any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.admin.rolelist,
      data: data,
      success: (res) => {
        if (res) defer.resolve(res);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 查询角色列表
   * @param data （查询参数）
   */
  loadRoleList(data: any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.admin.loadRole,
      data: data,
      success: (res) => {
        if (res) defer.resolve(res);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 添加管理员信息
   * @param data
   * @returns {any<T>} （查询参数）
   */
  addRole(data: any) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    //执行查询（异步）
    AjaxService.post({
      url: SettingUrl.URL.login.insert,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
          me._notification.success('成功了', res.info);
        } else {
          me._notification.error('出错了', res.info);
          defer.reject(res.data);
        }
      },
      error: (res) => {
        defer.reject(res.data);//页面不能空白，默认的数据
        me._notification.error(res.status, res.statusText);
      }
    });
    return defer.promise(); //返回异步请求消息
  }


  /**
   * 修改管理员密码
   * @param data
   * @returns {any<T>} （查询参数）
   */
  updateRole(data: any) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    //执行查询（异步）
    AjaxService.put({
      url: SettingUrl.URL.login.otherPwd,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
          me._notification.success('成功了', res.info);
        } else {
          me._notification.error('出错了', res.info);
          defer.reject(res.data);
        }
      },
      error: (res) => {
        defer.reject(res.data);//页面不能空白，默认的数据
        me._notification.error(res.status, res.statusText);
      }
    });
    return defer.promise(); //返回异步请求消息
  }

  /**
   * 删除管理员
   * @param data
   * @returns {any<T>} （查询参数）
   */
  delRole(data: any) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    //执行查询（异步）
    AjaxService.put({
      url: SettingUrl.URL.login.del,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
          me._notification.success('成功', '成功删除此管理员');
        } else {
          defer.reject(res.data);
        }
      },
      error: (res) => {
        defer.reject(res.data);//页面不能空白，默认的数据
        me._notification.error(res.status, res.statusText);
      }
    });
    return defer.promise(); //返回异步请求消息
  }

  //分配权限
  assignPowerList() {
    console.log("█ 111 ►►►", 111);
  }

  /**
   * 是否启用角色
   */
  stateRoleList(data: any) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    //执行查询（异步）
    AjaxService.post({
      url: SettingUrl.URL.admin.stateRole,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
          me._notification.success('成功了', res.info);
        } else {
          me._notification.error('出错了', res.info);
          defer.reject(res.data);
        }
      },
      error: (res) => {
        defer.reject(res.data);//页面不能空白，默认的数据
        me._notification.error(res.status, res.statusText);
      }
    });
    return defer.promise(); //返回异步请求消息
  }
}
