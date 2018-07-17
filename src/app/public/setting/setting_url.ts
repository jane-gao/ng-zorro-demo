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
    area: {
      addArea: '/admin/area/addArea',//添加区域
      deleteAreaByCode: '/admin/area/deleteAreaByCode',//删除区域
      queryAreasByCode: '/admin/area/queryAreasByCode',//查询区域
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
      deleteDatadictType: '/admin/datadict/deleteDatadictType',//删除数据字典key
      deleteDatadict: '/admin/datadict/deleteDatadict',//删除数据字典val
      getTypeList: '/admin/datadict/querryDatadictTypeList',//查询类型列表
      getValList: '/admin/datadict/querryDatadictList',//查询值列表
      getTypeByCode: '/admin/datadict/loadDatadictType',
      getValByCode: '/admin/datadict/loadDatadictByCode'
    },
    announce: {
      list: '/admin/announce/queryAnnounce',//查询公告列表
      create: '/admin/announce/addAnnounce',//创建公告
      delete: '/admin/announce/deleteAnnounce',//删除公告
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
      addBrand: '/admin/productBrand/addBrand',//添加品牌
      updateBrand: '/admin/productBrand/updateBrand',//修改品牌
      updateState: '/admin/productBrand/updateState',//修改品牌状态
      updateShowType: '/admin/productBrand/updateShowType',//修改品牌展示类型
      updateRecommend: '/admin/productBrand/updateRecommend',//修改品牌是否推荐
      deleteBrand: '/admin/productBrand/deleteBrand',//删除品牌
      getBrandPages: '/admin/productBrand/queryBrandPagesByNA',//根绝条件查询品牌
      loadBrandById: '/admin/productBrand/loadBrandById',//根据id查询品牌
      queryAll: '/admin/productBrand/queryAll',//查询所有品牌
    },
    kind: {
      addProductKind: '/admin/productKind/addProductKind',//增加商品分类
      addRelateBrandAndKind: '/admin/productKind/addRelateBrandAndKind',//添加品牌与分类关系
      deleteProductKind: '/admin/productKind/deleteProductKind',//删除商品分类
      loadProductKindById: '/admin/productKind/loadProductKindById',//按id获取某个商品分类信息
      queryBrandByKindId: '/admin/productKind/queryBrandByKindId',//根据分类id查询分类关联的所有品牌
      queryKindByParentId: '/admin/productKind/queryProductByParentId',//按分类父ID查询商品分类信息
      queryProductKindPageByParentId: '/admin/productKind/queryProductKindPageByParentId',//按分类父ID分页查询商品分类信息
      updateProductKind: '/admin/productKind/updateProductKind',//修改商品分类
      updateStateById: '/admin/productKind/updateStateById',//控制显示隐藏
    },
    norm: {
      queryPlateNormByPage: '/admin/productPlatNorm/queryPlateNormByPage',//查询标准分页列表
      loadNormByNormCode: '/admin/productPlatNorm/loadParamByNormCode',//查询标准
      addPlatNorm: '/admin/productPlatNorm/addPlatNorm',//添加标准
      deletePlatNorm: '/admin/productPlatNorm/deletePlatNorm',//删除标准
      updatePlatNorm: '/admin/productPlatNorm/updatePlatNorm',//修改标准
      updateStateByCode: '/admin/productPlatNorm/updateStateByCode',//修改标准状态
    },
    normParam:{
      loadParamByNormCode: '/admin/platNormParam/loadParamByNormCode',//查询标准参数列表
      addPlatNorm: '/admin/platNormParam/addPlatNormParam',//添加标准参数
      deletePlatNorm: '/admin/platNormParam/deletePlatNormParam',//删除标准参数
      updatePlatNorm: '/admin/platNormParam/updatePlatNormParam',//修改标准参数
      updateStateByCode: '/admin/platNormParam/updateStateByCode',//修改标准参数状态
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
    },
    announce: {
      list: '/main/announce',
      add: '../add',
      update: '../update',
      detail: '../detail',
    },
    helpCenter: {
      addQuestion: 'question-add',
      upQuestion: 'question-up',
    },
    norm: {
      params: 'param',
      paramAdd: 'param-add',
    }
  }
}
