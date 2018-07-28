import {Component, Input, OnInit} from "@angular/core";
import {MainService} from "../../../public/service/main.service";
import {NzModalRef} from "ng-zorro-antd";
import {FinanceService} from "../finance.service";
import {Setting} from "../../../public/setting/setting";
declare var $: any;


@Component({
  selector: 'app-bidding-settle-audit-win',
  templateUrl: './bidding-settle-audit-win.component.html',
  styleUrls: ['./bidding-settle-audit-win.component.css']
})
export class BiddingSettleAuditWinComponent implements OnInit {
  @Input('data') data: any = {};
  public state: any;//审核状态
  public yesOrNo: any;         //审核是否通过枚举
  images: Array<string> = [];

  public payRecStateEnum: any = Setting.ENUMSTATE.payRecState;
  constructor(private financeService: FinanceService, private modal: NzModalRef) {
  }

  ngOnInit() {
    this.yesOrNo = MainService.getEnumDataList('9000');  // 用户审核是否通过
    let me = this;
    me.images = me.images.concat(me.data.realUrl);
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
    $.when(me.financeService.updateSettleRecState(data)).done(res => {
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
    $.when(me.financeService.updateSettleRecState(data)).done(res => {
      me.modal.triggerOk();
    })
  }

  closeWin() {
    this.modal.destroy();
  }
}
