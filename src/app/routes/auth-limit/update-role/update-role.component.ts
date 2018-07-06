import {Component, OnInit} from '@angular/core';
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {NzModalRef, NzNotificationService} from "ng-zorro-antd";
import {AuthLimitService} from "../auth-limit.service";
declare var $: any;
@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {
  public param: any;

  set params(value: string) {
    this.param = value;
  }

  public _loading = false;                    //查询时锁屏,默认关闭
  public validateForm: any = {};//表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  constructor(public _notification: NzNotificationService,
              private authLimitService: AuthLimitService,
              private modal: NzModalRef,) {
  }


  ngOnInit() {
    this.loadIofoRole();
  }

  /**
   * 查询角色表
   */
  loadIofoRole() {
    let me = this;
    me._loading = true;//锁屏
    $.when(me.authLimitService.loadRoleList({roleCode: me.param.roleCode})).always(data => {
      me._loading = false;//解除锁屏
      if (data) {
        me.validateForm = data.data;
      }
    })
  };


  /**
   * 提交修改后的信息
   */
  handleOk() {
    let me = this;
    let data = { //查询参数
      roleCode: me.param.roleCode,
      roleName: me.validateForm.roleName,
      remarks: me.validateForm.remarks,
    };
    $.when(me.authLimitService.update(data)).always(data => {
      if (data) me.modal.destroy('success');
    })
  }

  /**
   * 取消
   */
  handleCancel() {
    this.modal.destroy('success');
  }


}
