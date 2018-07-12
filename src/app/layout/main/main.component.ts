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
      menuIcon: 'pay-circle-o',
      menuUrl: '/main/finance'
    };

    const set = {
      menuName: '基本配置',
      menuIcon: 'setting',
      menuUrl: '/main/setting',
      subMenuList: [
        {
          menuName: '数据字典',
          menuUrl: '/main/setting/data'
        }, {
          menuName: '常用设置',
          menuUrl: '/main/setting/basic'
        }
      ]
    };

    const authLimit = {
      menuName: '权限管理',
      menuIcon: 'safety',
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
      menuIcon: 'safety',
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

    Setting.MENUS = [set, authLimit, operation]
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
