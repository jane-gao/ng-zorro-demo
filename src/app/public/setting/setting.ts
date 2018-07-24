/*基本属性配置*/
export class Setting {
  public user: any;                                   //保存管理员的基本信息
  public static AJAX: any = {
    errorTip: '处理失败，请稍候重试或联系我们：',//ajax请求错误提示信息
    failText: '服务器异常' //ajax请求失败提示信息
  };//ajax 信息

  public static APP: any = {                           //平台信息
    name: '仁中和科技-集合竞价管理系统',
    description: '集合竞价管理系统',
    copyright: '© 2017 - 仁中和-集合竞价管理系统',
    logo: '../../../assets/img/logo.png',
    logoDark: '../../../assets/img/logo-dark.png',
    defaultImg: '../../../assets/img/dummy.png',
    userDefaultImg: '../../../assets/img/user-default.png',
    refundImg: '../../../assets/img/refund.png',
    contactInformation: {
      qq: "1234567893",
      wx: "15045678912",
      phone: "15045678912",
      email: "15045678912@163.com"
    },
  };
  public static MENUS: Array<any> = new Array();      //平台菜单
  public static PAGEMSG: any = {                        //平台信息提示（公式、提示、引导等等...）
    noAuthTip: "您的权限不足",
    tipTitle: "操作提示",
    user: {
      freeze: '您确认“冻结”该账户吗？',
      unfreeze: '您确认“解冻”该账户吗？'
    },
    announce: {
      delete: '您确认“删除”该公告吗？'
    }
  }
  //定义枚举
  public static ENUM: any = {
    yesOrNo: 1001,  // 是否
    brandShowType: 1024,  // 品牌展示类型
    custState: 9009,  // 用户状态
    custSex: 9002,  // 用户性别
    authState: 9010, //认证状态
    idType: 9011,  // 营业执照类型
    enterpriseState: 9012,  //企业状态
    enterPriseJoinState: 9013,  //企业入驻状态
    platSubject: 8000, //平台会计科目
    userType: 9017,  //交易对象类型
    payWay: 8003,  //交易方式
  };

  //定义枚举状态名
  public static ENUMSTATE: any = {
    yes: 'Y',
    no: 'N',
    authState: {
      audit: 'AUDIT',//待审核
      unPass: 'UNPASS',//未通过
      pass: 'PASS',//认证通过
      unAuth: 'UNAUTH',//未认证
      expired: 'EXPIRED',//认证过期
    },
    custState: {
      freeze: 'FREEZE',//冻结
      del: 'DEL',//删除
      normal: 'NORMAL'//正常
    },
    enterpriseState: {
      freeze: 'FREEZE',//冻结
      del: 'DEL',//删除
      normal: 'NORMAL'//正常
    },
    enterpriseJoinState: {
      half: 'HALF',//待完善
      audit: 'AUDIT',//待审核
      normal: 'NORMAL',//正常
      black: 'BLACK',//黑名单
      reject: 'REJECT',//驳回
    },
    announceState: {
      online: 'ONLINE',//上线
      noline: 'NOLINE'//下线
    },
    showState: {
      show: 'SHOW',
      hide: 'HIDE',
      del: 'DEL'
    },
    showType: {
      img: 'IMG',
      text: 'TXT'
    }
  };

  /**
   * 表单校验的状态，配合Util.ngValidateErrorMsg方法使用，此状态一般用来判断显示表单提示信息
   * eg1:<div nz-form-explain *ngIf="ngValidateErrorMsg(ngPhone) == Setting.valitateState.empty">请输入手机号！</div>
   * eg2:<div nz-form-explain *ngIf="ngValidateErrorMsg(ngPhone) == Setting.valitateState.error">请输入正确的手机号！</div>
   */
  public static valitateState: any = {
    empty: "empty",
    error: "error"
  }

  //存入cookie信息的键名
  public static cookie: any = {
    loginCookie: "RBAC_LINFO", //是否已经登录，若cookie中取不出此键名对应的信息，说明未登录，反之说明已登录
  }

}
