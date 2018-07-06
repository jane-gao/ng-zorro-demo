import {Component, OnInit} from '@angular/core';
import {Setting} from "../../../public/setting/setting";
import {Util} from "../../../public/util/util";
import {AuthLimitService} from "../auth-limit.service";
import {NzModalRef, NzNotificationService} from "ng-zorro-antd";
declare var $: any;

@Component({
  selector: 'app-menu-up',
  templateUrl: './menu-up.component.html',
  styleUrls: ['./menu-up.component.css']
})
export class MenuUpComponent implements OnInit {
  public validateForm: any = {};            //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  private _menuCode: string;
  set menuCode(value: string) {
    this._menuCode = value;
  }

  constructor(private authLimitService: AuthLimitService,
              private modal: NzModalRef, public _notification: NzNotificationService) {
  }

  ngOnInit() {
    this.loadMenuByCode();
  }

  loadMenuByCode() {
    let me = this;
    $.when(me.authLimitService.getMenuByCode({menuCode: me._menuCode})).then(data => {
      if (data) me.validateForm = data
    })
  }

  handleOk() {
    let me = this, staff: any = {};
    $.when(me.authLimitService.upMenu(me.validateForm)).then(data => {
      if (data) me.modal.destroy(true);
    })
  }

  handleCancel() {
    this.modal.destroy()
  }

}

