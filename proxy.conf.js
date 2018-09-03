const berton = 'http://192.168.1.182:8083';  //berton

/**
 * 配置代理
 * @type {[null,null]}
 */
const PROXY_CONFIG = [
  {
    context: [
      "/upload", //上传
      "/resource",    //枚举
      "/sms",    //验证码
      "/login", //登录
      "/admin", //数据字典
    ],
    target: berton,   //拦截 context配置路径，经过此地址
    secure: false
  }
];

module.exports = PROXY_CONFIG;
