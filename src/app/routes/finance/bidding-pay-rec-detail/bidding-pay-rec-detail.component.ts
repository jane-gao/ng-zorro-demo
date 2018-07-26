import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {FinanceService} from "../finance.service";
import {ActivatedRoute} from "@angular/router";
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
declare var $: any;

@Component({
  selector: 'app-bidding-pay-rec-detail',
  templateUrl: './bidding-pay-rec-detail.component.html',
  styleUrls: ['./bidding-pay-rec-detail.component.css']
})
export class BiddingPayRecDetailComponent implements OnInit {
  public tc: string; //交易码
  public payRec: any = {};  //流水记录

  public enums = Setting.ENUM;

  constructor(private financeService: FinanceService, public route: ActivatedRoute, public location: Location) {
  }

  ngOnInit() {
    let me = this;
    me.tc = this.route.snapshot.queryParams['tc'];
    if (me.tc) {
      $.when(me.financeService.loadPayRec(me.tc)).done(res => {
        if (res) me.payRec = res; //赋值
        console.log("payRec", me.payRec);
      });
    }
  }

  //返回
  back() {
    this.location.back();
  }
}
