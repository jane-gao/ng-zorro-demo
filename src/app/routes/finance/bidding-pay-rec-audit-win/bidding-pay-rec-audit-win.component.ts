import {Component, Input, OnInit} from "@angular/core";
import {MainService} from "../../../public/service/main.service";
import {NzModalRef} from "ng-zorro-antd";
import {FinanceService} from "../finance.service";
import {Setting} from "../../../public/setting/setting";
declare var $: any;

@Component({
  selector: 'app-bidding-pay-rec-audit-win',
  templateUrl: './bidding-pay-rec-audit-win.component.html',
  styleUrls: ['./bidding-pay-rec-audit-win.component.css']
})
export class BiddingPayRecAuditWinComponent implements OnInit {
  @Input('data') data: any = {};
  public state: any;//审核状态
  public isAgree: string = 'N';         //默认是通过
  public yesOrNo: any;         //审核是否通过枚举
  public reason: any;  //备注
  images: Array<string> = [];

  public payRecStateEnum: any = Setting.ENUMSTATE.payRecState;

  constructor(private financeService: FinanceService, private modal: NzModalRef) {
  }

  ngOnInit() {
    this.yesOrNo = MainService.getEnumDataList('9000');  // 用户审核是否通过
    let me = this;
    me.images.push(me.data.realUrl);
  }

  /**
   * 改为处理中
   * @param id
   */
  deal(id) {
    let me = this;
    let data = {
      id: id,
      state: Setting.ENUMSTATE.payRecState.deal
    };
    $.when(me.financeService.updatePayRecState(data)).done(res => {
      me.modal.triggerOk();
    })
  }

  /**
   * 认证通过
   */
  access(id) {
    let me = this;
    let data = {
      id: id,
      state: Setting.ENUMSTATE.payRecState.done
    };
    $.when(me.financeService.updatePayRecState(data)).done(res => {
      me.modal.triggerOk();
    })
  }

  refuse(id) {
    let me = this;
    let data = {
      id: id,
      state: Setting.ENUMSTATE.payRecState.refuse,
      failureReason: me.reason
    };
    $.when(me.financeService.updatePayRecState(data)).done(res => {
      me.modal.triggerOk();
    })
  }

  closeWin() {
    this.modal.destroy();
  }
}
