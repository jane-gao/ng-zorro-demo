import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Setting} from "../../../public/setting/setting";
import {ActivatedRoute} from "@angular/router";
import {FinanceService} from "../finance.service";
declare var $: any;
@Component({
  selector: 'app-bidding-settle-detail',
  templateUrl: './bidding-settle-detail.component.html',
  styleUrls: ['./bidding-settle-detail.component.css']
})
export class BiddingSettleDetailComponent implements OnInit {
  public tc: string; //交易码
  public settleRec: any = {};  //结算流水记录

  public enums = Setting.ENUM;

  public payRecStateEnum: any = Setting.ENUMSTATE.payRecState;
  constructor(private financeService: FinanceService, public route: ActivatedRoute, public location: Location) {
  }

  ngOnInit() {
    let me = this;
    me.tc = this.route.snapshot.queryParams['tc'];
    if (me.tc) {
      $.when(me.financeService.loadSettleRec(me.tc)).done(res => {
        if (res) me.settleRec = res; //赋值
        console.log("settleRec", me.settleRec);
      });
    }
  }

  //返回
  back() {
    this.location.back();
  }
}
