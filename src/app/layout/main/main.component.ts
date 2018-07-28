import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Setting} from "../../public/setting/setting";
import {Router} from "@angular/router";
import {SettingUrl} from "../../public/setting/setting_url";
import {AjaxService} from "../../public/service/ajax.service";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  public isCollapsed = false; //menu折叠
  public app = Setting.APP; //平台信息
  public menus: Array<any> = new Array(); //菜单信息
  public msg: Array<any> = new Array(); //消息通知
  public msgNum: number = 0; //消息通知总条数
  public home: string = SettingUrl.ROUTERLINK.basic.home; //首页路由

  constructor(public router: Router, public cookieService: CookieService) {
    const finance = {
      menuName: '财务管理',
      menuIcon: 'anticon anticon-pay-circle-o',
      menuUrl: '/main/finance',
      subMenuList: [
        {
          menuName: '平台财务管理',
          menuUrl: '/main/finance/financeManager'
        }, {
          menuName: '竞价支付',
          menuUrl: '/main/finance/biddingPayRec'
        }, {
          menuName: '竞价结算',
          menuUrl: '/main/finance/biddingSetttleRec'
        }
      ]
    };
    const bidding = {
      menuName: '竞价项目',
      menuIcon: 'anticon anticon-pay-circle-o',
      menuUrl: '/main/bidding',
      subMenuList: [
        {
          menuName: '竞价项目管理',
          menuUrl: '/main/bidding/biddingManager'
        } /* {
         menuName: '常用设置',
         menuUrl: '/main/setting/basic'
         }*/
      ]
    };
    const product = {
      menuName: '产品管理',
      menuIcon: 'anticon anticon-pay-circle-o',
      menuUrl: '/main/product/productManager'
    };

    const plat_norms = {
      menuName: '平台标准管理',
      menuIcon: 'anticon anticon-pay-circle-o',
      menuUrl: '/main/plat_norms'
    };

    const set = {
      menuName: '基本配置',
      menuIcon: 'anticon anticon-setting',
      menuUrl: '/main/setting',
      subMenuList: [
        {
          menuName: '区域管理',
          menuUrl: '/main/setting/area'
        }, {
          menuName: '数据字典',
          menuUrl: '/main/setting/data'
        }, /* {
         menuName: '常用设置',
         menuUrl: '/main/setting/basic'
         }*/
      ]
    };

    const ad = {
      menuName: '公告/通知',
      menuIcon: 'anticon anticon-bell',
      menuUrl: '/main/announce'
    };
    const cust = {
      menuName: '用户管理',
      menuIcon: 'anticon anticon-user',
      menuUrl: '/main/cust',
      subMenuList: [
        {
          menuName: '用户管理',
          menuUrl: '/main/cust/custManager'
        }, {
          menuName: '认证审核',
          menuUrl: '/main/cust/custAudit'
        }
      ]
    };

    const enterprise = {
      menuName: '企业管理',
      menuIcon: 'anticon anticon-bank',
      menuUrl: '/main/enterprise',
      subMenuList: [
        {
          menuName: '企业管理',
          menuUrl: '/main/enterprise/enterpriseManager'
        }, {
          menuName: '企业认证',
          menuUrl: '/main/enterprise/enterpriseAudit'
        }
      ]
    };

    const authLimit = {
      menuName: '权限管理',
      menuIcon: 'anticon anticon-safety',
      menuUrl: '/main/auth',
      subMenuList: [
        {
          menuName: '菜单管理',
          menuUrl: '/main/auth/menu'
        }, {
          menuName: '角色管理',
          menuUrl: '/main/auth/role'
        }, {
          menuName: '管理员管理',
          menuUrl: '/main/auth/staff'
        }
      ]
    };

    const operation = {
      menuName: '运营管理',
      menuIcon: 'anticon anticon-safety',
      menuUrl: '/main/operation',
      subMenuList: [
        {
          menuName: '分类管理',
          menuUrl: '/main/operation/kinds'
        }, {
          menuName: '品牌管理',
          menuUrl: '/main/operation/brands'
        }, {
          menuName: '帮助中心',
          menuUrl: '/main/operation/help-center'
        }
      ]
    };

    Setting.MENUS = [authLimit, set, cust, enterprise, finance, bidding, product, plat_norms, ad, operation]
  }

  ngOnInit() {
    const _this = this;
    _this.menus = Setting.MENUS; //菜单信息
    //设置消息通知
    //判断是否已经登录，已经登录，引导进入首页
    let loginCookie = this.cookieService.get(Setting.cookie.loginCookie);
    if (!loginCookie) this.router.navigate([SettingUrl.ROUTERLINK.pass.login]); //路由登录
  }

  /**
   * 退出登录
   */
  logout() {
    localStorage.clear(); //清空所有storage
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.login.logout,
      success: (result) => {
        if (result.success) {
          this.router.navigate([SettingUrl.ROUTERLINK.pass.login])//跳到登录页面
        }
      }
    });
  }

  /**
   * 前往指定页面
   * @param {string} url
   */
  goUrl(url: string) {
    const _this = this;
    if (url) _this.router.navigate([url]);
  }
}
