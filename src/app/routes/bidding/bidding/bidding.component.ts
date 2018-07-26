import {Component, OnInit} from '@angular/core';
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {Page} from "../../../public/util/page";
import {isNullOrUndefined} from "util";
import {BiddingService} from "../bidding.service";
declare var $: any;
@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {
  public searchParams: any = {};  //搜索参数
  public queryParams: any = {};   //查询参数
  public _loading: boolean = false;                 //是否加载中
  public page: Page = new Page();  //企业分页对象
  public enums = Setting.ENUM;
  public stateEnums = MainService.getEnumDataList(this.enums.biddingState);  //招标项目状态枚举集合

  constructor(private biddingService: BiddingService) {
  }

  ngOnInit() {
    this.queryBiddingList();
  }

  /**
   * 查询竞标列表
   */
  queryBiddingList(curPage?: number) {
    let me = this;
    me._loading = true;
    if (!isNullOrUndefined(curPage)) me.page.curPage = curPage;//当有页码时，查询该页数据
    me.queryParams = {
      curPage: me.page.curPage, //目标页码
      pageSize: me.page.pageSize, //每页条数
      projectCode: me.searchParams.projectCode, //项目编码
      custCode: me.searchParams.custCode, //用户编码
      epCode: me.searchParams.epCode, //企业编码
      startTime: me.searchParams.startTime, //开始时间
      endTime: me.searchParams.endTime, //结束时间
      state: me.searchParams.state, //结束时间
    };
    $.when(me.biddingService.queryBidingList(me.queryParams)).always(res => {
      me._loading = false;
      if (res) me.page = res; //赋值
    })
  }

  resetSearch() {
    this.searchParams = {};
    this.queryBiddingList();
  }

  onChange($event) {
    console.log("$event", $event);
  }
}
