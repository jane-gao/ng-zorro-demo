import {Component, OnInit} from "@angular/core";
import {Setting} from "../../../public/setting/setting";
import {Page} from "../../../public/util/page";
import {NzModalService, NzNotificationService} from "ng-zorro-antd";
import {AddRoleComponent} from "../add-role/add-role.component";
import {UpdateRoleComponent} from "../update-role/update-role.component";
import {SettingUrl} from "../../../public/setting/setting_url";
import {AuthLimitService} from "../auth-limit.service";
import {isNullOrUndefined} from "util";
declare var $: any;
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  public assignRoleUrl: string = SettingUrl.ROUTERLINK.staff.assignRole; //企业信息路由地址
  public showList: boolean = true;           //是否当前页面
  public yesOrNoState: any = Setting.ENUMSTATE; //定义枚举状态
  public validateForm: any = {};//表单
  public data: any;
  public _loading = false;                    //查询时锁屏,默认关闭
  public rolePage: Page = new Page();    //管理员列表
  constructor(private authLimitService: AuthLimitService,
              public _notification: NzNotificationService,
              public modalService: NzModalService) {
  }

  ngOnInit() {
    this.queryRoleList();//查询角色列表
  }

  /**
   * 查询角色列表
   */
  queryRoleList(curPage?: number) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.rolePage.curPage = curPage;//当有页码时，查询该页数据
    me.rolePage.params = { //查询参数
      curPage: me.rolePage.curPage, //目标页码
      pageSize: me.rolePage.pageSize //每页条数
    };
    $.when(me.authLimitService.roleList(me.rolePage.params)).done(data => {
      me._loading = false //解除锁屏
      if (data) me.rolePage = data; //赋值
    })
  };

  /**
   * 子组件加载时
   * @param event
   */
  activate(event) {
    this.showList = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.showList = true;
    if (event.refresh) this.queryRoleList()
  }

  /**
   * 添加信息页面
   */
  addRole() {
    let me = this;
    const modal = this.modalService.create({
      nzTitle: '添加角色信息 ',
      nzContent: AddRoleComponent,
      nzMaskClosable: false,
      nzFooter: null,
    });
    modal.afterClose.subscribe(result => {
      if (result) me.queryRoleList();
    })
  }

  /**
   * 修改角色
   */
  updateRole(roleCode) {
    let me = this;
    const modal = this.modalService.create({
      nzTitle: '修改角色信息 ',
      nzContent: UpdateRoleComponent,
      nzMaskClosable: false,
      nzFooter: null,
      nzComponentParams: {
        params: {
          roleCode: roleCode
        }
      },
    });
    modal.afterClose.subscribe(result => {
      if (result) me.queryRoleList();
    })
  }


  /**
   *是否启用
   */
  yesOrNo(event, roleCode) {
    let isUse;
    if (event) isUse = 'Y'; else  isUse = 'N';
    let me = this;
    me._loading = true; //锁屏
    me.rolePage.params = { //查询参数
      roleCode: roleCode,
      isUse: isUse,
    }
    $.when(me.authLimitService.stateRoleList(me.rolePage.params)).done(data => {
      me._loading = false //解除锁屏
    })
  }


}
