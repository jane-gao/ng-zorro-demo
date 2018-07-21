import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {MainService} from "../../../public/service/main.service";
import {CustService} from "../cust.service";
import {NzModalRef} from "ng-zorro-antd";
import {forEach} from "@angular/router/src/utils/collection";
declare var $: any;
@Component({
  selector: 'app-cust-audit-win',
  templateUrl: './cust-audit-win.component.html',
  styleUrls: ['./cust-audit-win.component.css']
})
export class CustAuditWinComponent implements OnInit {
  @Input('data') data: any = {};
  public state: any;//审核状态
  public showRecord: boolean = true;         //默认是通过
  public isAgree: string = 'N';         //默认是通过
  public yesOrNo: any;         //用户审核是否通过枚举
  images: Array<string> = [];
  public reason: string = '';//驳回原因
  public reasonList: any = {};//选中的驳回原因
  public reasons: Array<any> = [
    {label: '姓名必须与身份证姓名保持一致', value: '1'},
    {label: '身份证号有误', value: '2'},
    {label: '身份证有效期有误', value: '3'},
    {label: '身份证正面照有误', value: '4'},
    {label: '身份证正面照不清晰', value: '5'},
    {label: '身份证反面照有误', value: '6'},
    {label: '身份证反面照不清晰', value: '7'},
    {label: '姓名必须与身份证姓名保持一致', value: '8'},
    {label: '手持身份证照片有误', value: '9'},
    {label: '手持身份证照片不清晰', value: '10'},
    {label: '没有按顺序上传图片', value: '11'}
  ];

  constructor(private custService: CustService, private modal: NzModalRef) {
  }

  ngOnInit() {
    this.yesOrNo = MainService.getEnumDataList('9000');  // 用户审核是否通过
    let me = this;
    me.images.push(me.data.idcardPic1, me.data.idcardPic2, me.data.idcardPic3);
  }

  /**
   * 获取驳回原因
   * @param event
   * @param idx
   */
  getReason() {
    let me = this;
    for (let obj of me.reasons) {
      if (obj.checked) {
        me.reasonList[obj.value] = obj;
      } else {
        delete me.reasonList[obj.value];
      }
    }
    if (me.reasonList != {}) {
      me.reason = "";
      for (let name in me.reasonList) {
        me.reason += "," + me.reasonList[name].label;
      }
      me.reason = me.reason.substring(1);
    } else {
      me.reason = "";
    }
  }

  /**
   * 认证通过
   */
  access(id) {
    let me = this;
    let data = {
      id: id,
      state: 'PASS'
    };
    if (me.isAgree == "N") {
      data.state = "UNPASS";
      data["verifyReason"] = me.reason;
    }
    $.when(me.custService.updateCustAuthState(data)).done(res => {
      me.modal.triggerOk();
    })
  }

  closeWin() {
    this.modal.destroy();
  }

  imageViewerReady($event: any) {
    console.log($event);
  }
}
