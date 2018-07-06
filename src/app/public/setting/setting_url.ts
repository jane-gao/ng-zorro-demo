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
      enum: '/res/enum/',            //获取枚举接口
      uploadRetHttpUrl: '/upload/basic/uploadRetHttpUrl',  //上传图片
      upload: '/upload/basic/upload',  //上传图片
      uuid: '/upload/basic/uid',      //获取上传图片的编码
    },
    /**
     * 登录接口
     */
    login: {
      storeLogin: ' /login/login',//登录接口
      logout: "/login/logout", //（get）退出登录登录
      getSms: ' /sms/forgetPasswordSMS',//（post）获取验证码
      checkSmsCode: ' /sms/checkSmsCode',//（get）验证码的校验
    },
    announce: {
      list: '/announce/list',//查询公告列表
      create: '/announce/create',//创建公告
      load: '/announce/load',//查看公告
      update: '/announce/update',//修改公告
      delete: '/announce/delete',//删除公告
    },
    user: {
      getList: '/cust/list',//获取用户列表
      updateState: '/cust/updateState',//修改用户状态：冻结或解冻
    },
    hec: {
      list: '/custHec/list'//糖果流水
    },
    factor: {
      list: '/custFactor/list'//算力流水
    },
    datadict: {
      addType: '/datadict/addDatadictType',//添加类型
      addVal: '/datadict/addDatadict',//添加值
      upType: '/datadict/updateDatadictType',//修改类型
      upVal: '/datadict/updateDatadict',//修改值
      enableType: '/datadict/updateTypeEnable',//修改类型是否可用
      enableVal: '/datadict/updateEnable',//修改值是否可用
      getTypeList: '/datadict/querryDatadictTypeList',//查询类型列表
      getValList: '/datadict/querryDatadictList',//查询值列表
      getTypeByCode: '/datadict/loadDatadictType',
      getValByCode: '/datadict/loadDatadictByCode'
    },
    limit: {
      menuList: '/limitMenu/listpage',//获取菜单列表
      addMenu: '/limitMenu/add',//增加菜单
      load: '/limitMenu/load',//获取菜单信息
      update: '/limitMenu/update',//修改菜单
      updateState: '/limitMenu/updateState',//修改菜单状态
    },
    admin: {//管理员角色
      rolelist: "/role/listpage",//角色列表
      addRole: "/role/add",//创建角色
      updateRole: "/role/update",//修改角色
      loadRole: "/role/load",//获取角色信息
      stateRole: "/role/updateState",//是否启用角色
      limitList: "/role/limitList",//权限菜单列表
      addRelation: "/role/addRelation"//为角色关联菜单权限
    },
    staff: {
      list: '/staff/listpage',//管理员列表
      add: '/staff/add',//添加管理员
      update: '/staff/update',//修改管理员
      updatePwd: '/staff/updatePwd',//修改管理员密码
      load: '/staff/load',//查看管理员
      rolesList: '/staff/rolesList',//角色
      addRolesRelation: '/staff/addRolesRelation',//分配管理员角色
    },
    help: {
      getAllHelpKinds: '/helpKind/queryAll',//查询所有帮助分类
      getHelpKindById: '/helpKind/loadById',//根据id获取帮助分类
      helpKindList: '/helpKind/pageQueryAll',//获取帮助分类列表
      updateHelpKind: '/helpKind/updateHelpKind',//修改帮助分类
      updateHelpKindState: '/helpKind/updateHelpKindState',//修改帮助分类状态
      deleteHelpKind: '/helpKind/deleteHelpKind',//删除帮助分类
      getHelpAnswerById: '/helpQuestions/loadHelpQuestions',//根据id获取帮助问答
      helpAnswerList: '/helpQuestions/pageQuery',//获取帮助分类问答
      updateHelpQuestion: '/helpQuestions/updateHelpQuestions',//修改帮助分类问答
      updateHelpQuestionState: '/helpQuestions/updateHelpKindState',//修改帮助分类问答状态
      deleteHelpQuestions: '/helpQuestions/deleteHelpQuestions',//删除帮助分类问答
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
    user: {
      list: "/main/user/all",
      auth: "/main/user/auth",
    },
    announce: {
      list: '/main/announce',
      add: '../add',
      update: '../update',
      detail: '../detail',
    },
    staff: {
      list: '/main/auth/staff',
      add: 'add',
      up: 'up',
      assignRole: 'assignRole'
    }
  }
}
