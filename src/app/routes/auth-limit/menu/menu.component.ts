import {Component, OnInit} from "@angular/core";
import {Page} from "../../../public/util/page";
import {NzModalService} from "ng-zorro-antd";
import {AuthLimitService} from "../auth-limit.service";
import {isNullOrUndefined} from "util";
import {Setting} from "../../../public/setting/setting";
import {MenuAddComponent} from "../menu-add/menu-add.component";
import {MenuUpComponent} from "../menu-up/menu-up.component";
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public menuList: Page = new Page();        //糖果变动记录
  public _loading: boolean = false;                 //是否加载中
  public addMenuModal: any;
  public addSubMenuModal: any;
  public upMenuModal: any;
  public yesOrNoState: any = Setting.ENUMSTATE;
  private childMenuCode; //菜单编码，查询子集用
  public childMenuTitList: Array<any> = []; //菜单级别面包屑

  constructor(private authLimitService: AuthLimitService, private modalService: NzModalService) {
  }

  ngOnInit() {
    this.queryMenuList()
  }

  queryMenuList(curPage?: number) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.menuList.curPage = curPage;//当有页码时，查询该页数据
    me.menuList.params = { //查询参数
      curPage: me.menuList.curPage, //目标页码
      pageSize: me.menuList.pageSize //每页条数
    }
    $.when(AuthLimitService.getMenuList(me.menuList.params)).done(res => {
      me._loading = false; //解除锁屏
      if (res) me.menuList = res; //赋值
    })
  }

  /**
   * 添加菜单
   */
  showAddMenuTemplate() {
    this.addMenuModal = this.modalService.create({
      nzTitle: `添加菜单`,            //弹窗标题
      nzContent: MenuAddComponent,                 //弹窗内容组件
      nzWidth: 600,                                //弹窗宽度
      nzFooter: null
    });
    this.addMenuModal.afterClose.subscribe((result) => {
      if (result) this.getMenuList(this.childMenuCode)
    });
  }

  /**
   * 添加子菜单
   */
  showAddSubMenuTemplate(preMenuName, preMenuCode) {
    this.addSubMenuModal = this.modalService.create({
      nzTitle: `给“${preMenuName}”添加子菜单`,            //弹窗标题
      nzContent: MenuAddComponent,                 //弹窗内容组件
      nzWidth: 600,                                //弹窗宽度
      nzFooter: null,
      nzComponentParams: {
        preMenuCode: preMenuCode
      }
    });
    this.addSubMenuModal.afterClose.subscribe((result) => {
      if (result) this.getMenuList(this.childMenuCode)
    });
  }

  /**
   * 修改菜单
   */
  showUpMenuTemplate(menuName, menuCode) {
    this.upMenuModal = this.modalService.create({
      nzTitle: `修改“${menuName}”`,            //弹窗标题
      nzContent: MenuUpComponent,                 //弹窗内容组件
      nzWidth: 600,                                //弹窗宽度
      nzFooter: null,
      nzComponentParams: {
        menuCode: menuCode
      }
    });
    this.upMenuModal.afterClose.subscribe((result) => {
      if (result) this.getMenuList(this.childMenuCode)
    });
  }

  yesOrNo(event, menuCode) {
    let state;
    if (event) state = this.yesOrNoState.yes; else  state = this.yesOrNoState.no;
    let me = this;
    me._loading = true; //锁屏
    let data = { //查询参数
      menuCode: menuCode,
      state: state
    }
    $.when(me.authLimitService.upMenuState(data)).done(data => {
      me._loading = false //解除锁屏
      if (!data) me.queryMenuList();//如果修改状态失败则刷新页面数据
    })
  }

  /**
   * 查询子集菜单列表
   */
  queryChildMenuList(childCode?, menuName?, isTit?: boolean) {
    let me = this, num = 0;
    if (childCode) {
      me.childMenuCode = childCode;
      let item = {name: menuName, code: childCode};
      if (!isTit) {
        me.getMenuList(me.childMenuCode, function () {
          me.childMenuTitList.push(item);
        })
      } //非点击面包屑路径时，添加面包屑
      else { //点击面包屑路径时，提出点击地址后的面包屑路径
        for (var i = 0; i < me.childMenuTitList.length; i++) {  //获取点击面包屑的路径地址下标
          if (item.code == me.childMenuTitList[i].code) num = i;
        }
        me.childMenuTitList.splice(num + 1); //剔除下标后的路径
        me.getMenuList(me.childMenuCode)
      }
    } else {
      me.childMenuCode = null, this.childMenuTitList = []; //清空子集查询
      me.getMenuList(me.childMenuCode)
    }
  }

  getMenuList(menuCode, callback?) {
    let me = this;
    me.menuList.params = { //查询参数
      curPage: me.menuList.curPage, //目标页码
      pageSize: me.menuList.pageSize, //每页条数
      preMenuCode: menuCode
    }
    $.when(AuthLimitService.getMenuList(me.menuList.params)).done(data => {
      me._loading = false; //解除锁屏
      if (data) {
        me.menuList = data;
        if (callback) callback()
      } //赋值
    })
  }

  /**
   * 返回上一级菜单列表
   */
  goBackMenu() {
    let num = this.childMenuTitList.length;
    if (num - 2 < 0) this.queryChildMenuList();
    else this.queryChildMenuList(this.childMenuTitList[num - 2].code, this.childMenuTitList[num - 2].name, true);
  }

}
