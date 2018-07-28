import {Component, OnInit} from '@angular/core';
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {BiddingService} from "../bidding.service";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-bidding-detail',
  templateUrl: './bidding-detail.component.html',
  styleUrls: ['./bidding-detail.component.css']
})
export class BiddingDetailComponent implements OnInit {
  public projectCode: string; //交易码
  public data: any = {};  //竞价项目

  public enums = Setting.ENUM;
  public subject = MainService.getEnumDataList(this.enums.platSubject); //平台会计科目
  public userType = MainService.getEnumDataList(this.enums.userType);  //交易对象类型

  constructor(private biddingService:BiddingService,public route: ActivatedRoute,public location: Location) {
  }

  ngOnInit() {
    let me = this;
    me.projectCode = this.route.snapshot.queryParams['projectCode'];
    if (me.projectCode) {
      $.when(me.biddingService.loadBidding(me.projectCode)).done(res => {
        if (res) me.data = res; //赋值
      });
    }
  }

  //返回
  back() {
    this.location.back();
  }
}
