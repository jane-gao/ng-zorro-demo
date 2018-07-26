import {Component, Input, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";
import {FinanceService} from "../finance.service";
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {Page} from "../../../public/util/page";
import {NzNotificationService} from "ng-zorro-antd";
declare var $: any;

@Component({
  selector: 'app-bidding-settle-list',
  templateUrl: './bidding-settle-list.component.html',
  styleUrls: ['./bidding-settle-list.component.css']
})
export class BiddingSettleListComponent implements OnInit {
  public _loading: boolean = false;                 //是否加载中
  @Input('state') state: string = '';
  public searchParams: any = {};  //搜索参数
  public queryParams: any = {};   //查询参数
  public page: Page = new Page();  //支付记录分页对象
  public enums = Setting.ENUM;
  public subject = MainService.getEnumDataList(this.enums.platSubject); //平台会计科目
  public userType = MainService.getEnumDataList(this.enums.userType);  //交易对象类型
  constructor(private financeService: FinanceService, private _notification: NzNotificationService) { }

  ngOnInit() {
  }

  /**
   * 查询平台财务流水
   */
  querySettleList(curPage?: number) {
    let me = this;
    me._loading = true;
    if (!isNullOrUndefined(curPage)) me.page.curPage = curPage;//当有页码时，查询该页数据
    me.queryParams = {
      curPage: me.page.curPage, //目标页码
      pageSize: me.page.pageSize, //每页条数
      projectCode: me.searchParams.projectCode, //项目编码
      payCustType: me.searchParams.payCustType, //交易对象类型
      payCustCode: me.searchParams.payCustCode, //交易对象编码
      subject: me.searchParams.subject, //会计科目
      state: me.state, //状态
    };
    $.when(me.financeService.querySettleRec(me.queryParams)).always(res => {
      me._loading = false;
      if (res) me.page = res; //赋值
    })
  }

  /**
   * 标记支付记录为处理中状态
   */
  update2Deal(projectCode: string) {
    let me = this;
    let data = {
      projectCode: projectCode,
      state: Setting.ENUMSTATE.payRecState.deal
    };
    $.when(me.financeService.updatePayRecState(data)).done(res => {
      me._notification.success("成功", "操作成功");
    })
  }

  /**
   * 标记为成功状态
   */
  update2Done(projectCode: string) {
    let me = this;
    let data = {
      projectCode: projectCode,
      state: Setting.ENUMSTATE.payRecState.done
    };
    $.when(me.financeService.updatePayRecState(data)).done(res => {
      me._notification.success("成功", "操作成功");
    })
  }

  resetSearch() {
    this.searchParams = {};
    this.querySettleList();
  }
}
