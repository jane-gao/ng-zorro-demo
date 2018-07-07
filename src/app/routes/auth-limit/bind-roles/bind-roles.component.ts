import {Component, OnInit} from "@angular/core";
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {AuthLimitService} from "../auth-limit.service";
import {NzModalRef, NzNotificationService} from "ng-zorro-antd";
declare var $: any;

@Component({
  selector: 'app-bind-roles',
  templateUrl: './bind-roles.component.html',
  styleUrls: ['./bind-roles.component.css']
})
export class BindRolesComponent implements OnInit {
  public validateForm: any = {};            //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public _staffCode: any;//参数
  public disabledBtn: boolean = false;//参数
  set staffCode(value: string) {
    this._staffCode = value;
  }

  public roleGroupList: Array<any> = [];//所有角色组
  public roleList: Array<any> = [];//所有角色
  public tagRoleGroupValue: Array<any> = [];//已经选中角色组的值
  public tagRoleValue: Array<any> = [];//已经选中角色的值


  constructor(private authLimitService: AuthLimitService,
              private modal: NzModalRef, public _notification: NzNotificationService) {
  }

  ngOnInit() {
    this.getRolesList();
  }

  getRolesList() {
    let me = this;
    $.when(me.authLimitService.getRolesList({staffCode: me._staffCode})).then(data => {
      if (data) {
        me.roleGroupList = data.roleGroupList;
        me.roleList = data.roleList;
        /*me.roleGroupList.forEach(item => {
         if(item.isHas === 'Y') me.tagRoleGroupValue.push(item.roleGroupCode);
         })*/
        me.roleList.forEach(item => {
          if (item.isHas === 'Y') me.tagRoleValue.push(item.roleCode);
        })
      }
    })
  }

  bindRoles() {
    let me = this, staff: any = {};
    if (me.tagRoleValue.length == 0) {
      me.disabledBtn = true;
      me._notification.warning('错误操作', '角色不能为空')
    } else {
      staff.staffCode = me._staffCode;
      staff.roleGroupCode = '';
      staff.roleCode = me.tagRoleValue.join(',');
      $.when(me.authLimitService.addRolesRelation(staff)).then(data => {
        me.modal.destroy();
      })
    }
  }

  handleCancel() {
    this.modal.destroy()
  }
}
