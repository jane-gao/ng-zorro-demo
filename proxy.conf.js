const sz = 'http://192.168.10.112:';  //尚泽
const zyg = 'http://192.168.10.114:'; //张阳光
const wp = 'http://192.168.10.182:';  //万鹏
const csj = 'http://192.168.10.221:';  //测试机

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
    target: sz + "8899",   //拦截 context配置路径，经过此地址
    secure: false
  }
];

module.exports = PROXY_CONFIG;
