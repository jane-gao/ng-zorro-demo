import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Setting} from "../../public/setting/setting";
import {Router} from "@angular/router";
import {SettingUrl} from "../../public/setting/setting_url";
import {HomeService} from "../../routes/home/home.service";
import {AjaxService} from "../../public/service/ajax.service";
import {Util} from "../../public/util/util";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

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

  constructor(public router: Router) {
    const users = {
      menuName: '用户管理',
      menuIcon: 'usergroup-add',
      menuUrl: '/main/user',
      subMenuList: [
        {
          menuName: '所有用户',
          menuUrl: '/main/user/all'
        },
        {
          menuName: '待审核用户',
          menuUrl: '/main/user/auth'
        }
      ]
    };
    const candy = {
      menuName: '糖果系统',
      menuIcon: 'bell',
      menuUrl: '/main/candy'
    };

    const finance = {
      menuName: '财务管理',
      menuIcon: 'pay-circle-o',
      menuUrl: '/main/finance'
    };

    const ad = {
      menuName: '公告/通知',
      menuIcon: 'bell',
      menuUrl: '/main/announce'
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
          menuUrl: '/main/operation/help-kind'
        }
      ]
    };

    Setting.MENUS = [users, ad, set, authLimit, operation]
  }

  ngOnInit() {
    const _this = this;
    _this.menus = Setting.MENUS; //菜单信息
    //设置消息通知
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
