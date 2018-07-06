const sz = 'http://192.168.10.112:';  //尚泽
const zyg = 'http://192.168.10.114:'; //张阳光
const csj = 'http://192.168.10.221:';  //测试机

/**
 * 配置代理
 * @type {[null,null]}
 */
const PROXY_CONFIG = [
  {
    context: [
      "/sms",    //验证码
      "/login", //登录
      "/cust", //用户
      "/announce", //公告
      "/datadict", //数据字典
      "/staff", //管理员管理
      "/role", //角色管理
      "/limitMenu", //菜单管理
      "/helpKind", //帮助分类
      "/helpQuestions", //帮助问题
    ],
    target: zyg + "8084",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/upload" //管理员管理
    ],
    target: zyg + "8082",   //拦截 context配置路径，经过此地址
    secure: false
  }
];

module.exports = PROXY_CONFIG;
