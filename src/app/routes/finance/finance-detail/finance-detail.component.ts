import {Component, OnInit} from '@angular/core';
import {FinanceService} from "../finance.service";
import {ActivatedRoute} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-finance-detail',
  templateUrl: './finance-detail.component.html',
  styleUrls: ['./finance-detail.component.css']
})
export class FinanceDetailComponent implements OnInit {
  public tc: string; //交易码
  public platRec: any = {};  //流水记录
  constructor(private financeService: FinanceService, public route: ActivatedRoute,) {
  }

  ngOnInit() {
    let me = this;
    me.tc = this.route.snapshot.queryParams['tc'];
    if (me.tc) {
      $.when(me.financeService.loadPlatRec(me.tc)).done(res => {
        if (res) me.platRec = res; //赋值
        console.log("platRec", me.platRec);
      });
    }
  }
}
