import { Component, OnInit } from '@angular/core';
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {NzModalRef, NzNotificationService} from "ng-zorro-antd";
import {AuthLimitService} from "../auth-limit.service";
declare var $:any;
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  public validateForm: any = {};//表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  constructor(public _notification: NzNotificationService,
              private authLimitService: AuthLimitService,
              private modal: NzModalRef,
  ) {
  }


  ngOnInit() {

  }



  /**
   * 参数返回
   */
  handleOk() {
    let me = this;
    let data = { //查询参数
      roleName: me.validateForm.roleName,
      remarks	: me.validateForm.remarks	,
    };
    $.when(me.authLimitService.addList(data)).always(data => {
      if (data) me.modal.destroy('success');
    })
  }

  /**
   * 取消
   */
  handleCancel() {
    this.modal.destroy();
  }

}
