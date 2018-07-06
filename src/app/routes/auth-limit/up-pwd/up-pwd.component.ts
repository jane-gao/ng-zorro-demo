import {Component, OnInit} from "@angular/core";
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {AuthLimitService} from "../auth-limit.service";
import {NzModalRef} from "ng-zorro-antd";
declare var $: any;

@Component({
  selector: 'app-up-pwd',
  templateUrl: './up-pwd.component.html',
  styleUrls: ['./up-pwd.component.css']
})
export class UpPwdComponent implements OnInit {
  public validateForm: any = {};            //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public _staffCode: any;//参数
  set staffCode(value: string) {
    this._staffCode = value;
  }

  constructor(private authLimitService: AuthLimitService,
              private modal: NzModalRef) {
  }

  ngOnInit() {
  }

  upStaffPwd() {
    let me = this;
    me.validateForm.staffCode = me._staffCode;
    $.when(me.authLimitService.upStaffPwd(me.validateForm)).then(data => {
      if (data) me.modal.destroy();
    })
  }

  handleCancel() {
    this.modal.destroy()
  }
}
