import {Component, OnInit} from "@angular/core";
import {Page} from "../../../public/util/page";
import {NzModalService} from "ng-zorro-antd";
import {AuthLimitService} from "../auth-limit.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {isNullOrUndefined} from "util";
import {BindRolesComponent} from "../bind-roles/bind-roles.component";
import {UpPwdComponent} from "../up-pwd/up-pwd.component";
declare var $: any;


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  public staffList: Page = new Page();        //糖果变动记录
  public _loading: boolean = false;                 //是否加载中
  public query: any = {};                   //搜索条件
  validateForm: any = {};
  public showList: boolean = true;            //是否添加键值
  public upPwdModal: any;
  public bindRolesModal: any;
  public routerLink: any = SettingUrl.ROUTERLINK;

  constructor(private modalService: NzModalService) {
  }

  ngOnInit() {
    this.queryStaffList()
  }

  queryStaffList(curPage?: number) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.staffList.curPage = curPage;//当有页码时，查询该页数据
    me.staffList.params = { //查询参数
      curPage: me.staffList.curPage, //目标页码
      pageSize: me.staffList.pageSize, //每页条数
      staffName: me.query.staffName
    }
    $.when(AuthLimitService.getStaffList(me.staffList.params)).done(res => {
      me._loading = false; //解除锁屏
      if (res) me.staffList = res; //赋值
    })
  }

  resetSearch() {
    this.query = {}
    this.queryStaffList()
  }


  /**
   * 点击添加类型，弹窗出现
   */
  showBindRolesTemplate(name, code?) {
    this.bindRolesModal = this.modalService.create({
      nzTitle: `给“${name}”绑定角色`,            //弹窗标题
      nzContent: BindRolesComponent,                 //弹窗内容组件
      nzWidth: 500,                                //弹窗宽度
      nzFooter: null,
      nzComponentParams: {                           //传参数
        staffCode: code
      },
    });
  }

  showUpPwdTemplate(name, code?) {
    this.upPwdModal = this.modalService.create({
      nzTitle: `修改“${name}”的密码`,            //弹窗标题
      nzContent: UpPwdComponent,                 //弹窗内容组件
      nzWidth: 500,                                //弹窗宽度
      nzFooter: null,
      nzComponentParams: {                           //传参数
        staffCode: code
      }
    });
  }

  activate(event) {
    this.showList = false;
  }

  onDeactivate(event) {
    this.showList = true;
    if (event.ifRefreshParent) this.queryStaffList();//如果子页面有修改则返回时刷新列表
  }

}
