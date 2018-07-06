import {Component, OnInit} from '@angular/core';
import {Setting} from "../../../public/setting/setting";
import {Util} from "../../../public/util/util";
import {AuthLimitService} from "../auth-limit.service";
import {NzModalRef, NzNotificationService} from "ng-zorro-antd";
declare var $: any;

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.css']
})
export class MenuAddComponent implements OnInit {
  public validateForm: any = {};            //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  private _preMenuCode: string;
  set preMenuCode(value: string) {
    this._preMenuCode = value;
  }

  constructor(private authLimitService: AuthLimitService,
              private modal: NzModalRef, public _notification: NzNotificationService) {
  }

  ngOnInit() {
  }

  handleOk() {
    let me = this, staff: any = {};
    if (me._preMenuCode) me.validateForm.preMenuCode = me._preMenuCode;
    $.when(me.authLimitService.addMenu(me.validateForm)).then(data => {
      if (data) me.modal.destroy(true);
    })
  }

  handleCancel() {
    this.modal.destroy()
  }

}
