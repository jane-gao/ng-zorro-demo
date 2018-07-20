import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {isUndefined} from "util";
import {MainService} from "../../../public/service/main.service";
import {CustService} from "../cust.service";
import {NzModalRef} from "ng-zorro-antd";
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
  images: Array<string> = ['http://pb48qefxh.bkt.clouddn.com/cust/1531367622684-1.png'];
  public reason: string = '';//驳回原因
  public reasonList: Array<string> = [];//选中的驳回原因编号
  public reasons: Array<any> = [
    {label:'姓名必须与身份证姓名保持一致',value:'a'},
    {label:'身份证号有误',value:'a'},
    {label:'身份证有效期有误',value:'b'},
    {label:'身份证正面照有误',value:'c'},
    {label:'身份证正面照不清晰',value:'d'},
    {label:'身份证反面照有误',value:'e'},
    {label:'身份证反面照不清晰',value:'f'},
    {label:'姓名必须与身份证姓名保持一致',value:'g'},
    {label:'手持身份证照片有误',value:'h'},
    {label:'手持身份证照片不清晰',value:'i'},
    {label:'没有按顺序上传图片',value:'j'}
  ];

  constructor(private custService: CustService, private modal: NzModalRef) {
  }

  ngOnInit() {
    this.yesOrNo = MainService.getEnumDataList('9000');  // 用户审核是否通过
    let me = this;
    // $('.wrapper > section').css('z-index', 200);
    // me.isAgree = 'N';
    // me.images = [];
    // me.reasonList = [];
    // me.reason = '';
    // me.images.push(me.data.idcardPic1, me.data.idcardPic2, me.data.idcardPic3);
  }

  /**
   * 获取驳回原因
   * @param event
   * @param idx
   */
  getReasonId(event, idx) {
    let me = this;
    if (event.target.checked) {
      me.reasonList.push(me.reasons[idx]);
    } else {
      me.reasonList = me.reasonList.filter(item => {
        return item !== me.reasons[idx];
      })
    }
    if (me.reasonList.length > 0) me.reason = me.reasonList.join('，') + '，请重新提交';
    else me.reason = '';
  }

  /**
   * 认证通过
   */
  access(id) {
    let me = this;
    let url = '/custAuthInfo/updateState';
    let data = {
      id: id,
      state: 'PASS',
    };
    //
    // me.submit.putRequest(url, data);
    // me.hideWindow("success");
    // me.certificationComponent.aqeuryAll('AUDIT', me.curPage);
  }

  /*
   * 审核驳回原因
   * */
  delivery(obj) {
    let me = this;
    let url = '/custAuthInfo/updateState';
    let data = {
      state: 'UNPASS',
      verifyReason: obj.reason,
    };
    // let a = this.reasonRejecService.reasonReject(url, data);
    // me.hideWindow("success");
    // me.certificationComponent.aqeuryAll('AUDIT', me.curPage);
  }

  imageViewerReady ($event: any) {
    console.log($event);
  }
}
