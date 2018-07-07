/*接口访问路径配置*/

export class SettingUrl {
  // 接口通讯url集合
  static URL: any = {
    /**
     * 首页统计
     */
    home: {},
    /**
     * 基础路径配置
     */
    base: {
      enum: '/resource/enum/',            //获取枚举接口
      uploadRetHttpUrl: '/upload/basic/uploadRetHttpUrl',  //上传图片
      upload: '/upload/basic/upload',  //上传图片
      uuid: '/upload/basic/uid',      //获取上传图片的编码
    },
    /**
     * 登录接口
     */
    login: {
      login: '/login/rbac/login',//登录接口
      logout: "/login/rbac/logout", //（get）退出登录登录
      getSms: '/sms/forgetPasswordSMS',//（post）获取验证码
      checkSmsCode: '/sms/checkSmsCode',//（get）验证码的校验
    },
    datadict: {
      addType: '/admin/datadict/addDatadictType',//添加类型
      addVal: '/admin/datadict/addDatadict',//添加值
      upType: '/admin/datadict/updateDatadictType',//修改类型
      upVal: '/admin/datadict/updateDatadict',//修改值
      enableType: '/admin/datadict/updateTypeEnable',//修改类型是否可用
      enableVal: '/admin/datadict/updateEnable',//修改值是否可用
      getTypeList: '/admin/datadict/querryDatadictTypeList',//查询类型列表
      getValList: '/admin/datadict/querryDatadictList',//查询值列表
      getTypeByCode: '/admin/datadict/loadDatadictType',
      getValByCode: '/admin/datadict/loadDatadictByCode'
    },
    limit: {
      menuList: '/admin/limitMenu/listpage',//获取菜单列表
      addMenu: '/admin/limitMenu/add',//增加菜单
      load: '/admin/limitMenu/load',//获取菜单信息
      update: '/admin/limitMenu/update',//修改菜单
      updateState: '/admin/limitMenu/updateState',//修改菜单状态
    },
    admin: {//管理员角色
      rolelist: "/admin/role/listpage",//角色列表
      addRole: "/admin/role/add",//创建角色
      updateRole: "/admin/role/update",//修改角色
      loadRole: "/admin/role/load",//获取角色信息
      stateRole: "/admin/role/updateState",//是否启用角色
      limitList: "/admin/role/limitList",//权限菜单列表
      addRelation: "/admin/role/addRelation"//为角色关联菜单权限
    },
    staff: {
      list: '/admin/staff/listpage',//管理员列表
      add: '/admin/staff/add',//添加管理员
      update: '/admin/staff/update',//修改管理员
      updatePwd: '/admin/staff/updatePwd',//修改管理员密码
      load: '/admin/staff/load',//查看管理员
      rolesList: '/admin/staff/rolesList',//角色
      addRolesRelation: '/admin/staff/addRolesRelation',//分配管理员角色
    },
    help: {
      getAllHelpKinds: '/helpKind/queryAll',//查询所有帮助分类
      addHelpKind: '/admin/helpKind/addHelpKind',//添加帮助分类
      getHelpKindById: '/admin/helpKind/loadById',//根据id获取帮助分类
      helpKindList: '/admin/helpKind/pageQueryAll',//获取帮助分类列表
      updateHelpKind: '/admin/helpKind/updateHelpKind',//修改帮助分类
      updateHelpKindState: '/admin/helpKind/updateHelpKindState',//修改帮助分类状态
      deleteHelpKind: '/admin/helpKind/deleteHelpKind',//删除帮助分类

      addHelpQuestions: '/admin/helpQuestions/addHelpQuestions',//添加帮助问答
      getHelpAnswerById: '/admin/helpQuestions/loadHelpQuestions',//根据id获取帮助问答
      helpAnswerList: '/admin/helpQuestions/pageQuery',//获取帮助分类问答
      updateHelpQuestion: '/admin/helpQuestions/updateHelpQuestions',//修改帮助分类问答
      updateHelpQuestionState: '/admin/helpQuestions/updateHelpKindState',//修改帮助分类问答状态
      deleteHelpQuestions: '/admin/helpQuestions/deleteHelpQuestions',//删除帮助分类问答
    },
    brand: {
      addBrand: '/admin/goodsBrand/addBrand',//添加品牌
      updateBrand: '/admin/goodsBrand/updateBrand',//修改品牌
      updateState: '/admin/goodsBrand/updateState',//修改品牌状态
      updateShowType: '/admin/goodsBrand/updateShowType',//修改品牌展示类型
      updateRecommend: '/admin/goodsBrand/updateRecommend',//修改品牌是否推荐
      deleteBrand: '/admin/goodsBrand/deleteBrand',//删除品牌
      getBrandPages: '/admin/goodsBrand/queryBrandPagesByNA',//根绝条件查询品牌
      loadBrandById: '/admin/goodsBrand/loadBrandById',//根据id查询品牌
      queryAll: '/admin/goodsBrand/queryAll',//查询所有品牌
    },
    kind:{

    }
  }
  ;
// 路由链接信息
  static ROUTERLINK: any = {
    basic: {
      home: '/main/home'
    },
    pass: {
      login: "/page/login", //登录
    },
    staff: {
      list: '/main/auth/staff',
      add: 'add',
      up: 'up',
      assignRole: 'assignRole'
    }
  }
}
