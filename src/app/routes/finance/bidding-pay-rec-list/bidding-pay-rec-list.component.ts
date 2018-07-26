import {Component, Input, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";
import {FinanceService} from "../finance.service";
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {Page} from "../../../public/util/page";
import {NzModalService, NzNotificationService} from "ng-zorro-antd";
import {BiddingPayRecAuditWinComponent} from "../bidding-pay-rec-audit-win/bidding-pay-rec-audit-win.component";
declare var $: any;

@Component({
  selector: 'app-bidding-pay-rec-list',
  templateUrl: './bidding-pay-rec-list.component.html',
  styleUrls: ['./bidding-pay-rec-list.component.css']
})

export class BiddingPayRecListComponent implements OnInit {
  public _loading: boolean = false;                 //是否加载中
  @Input('state') state: string = '';
  public searchParams: any = {};  //搜索参数
  public queryParams: any = {};   //查询参数
  public page: Page = new Page();  //支付记录分页对象
  public enums = Setting.ENUM;
  public subject = MainService.getEnumDataList(this.enums.platSubject); //平台会计科目
  public userType = MainService.getEnumDataList(this.enums.userType);  //交易对象类型
  public payRecState = MainService.getEnumDataList(this.enums.payRecState);  //状态类型

  public payRecStateEnum: any = Setting.ENUMSTATE.payRecState;

  constructor(private financeService: FinanceService, private _notification: NzNotificationService, private modalService: NzModalService) {
  }

  ngOnInit() {
  }

  /**
   * 查询平台财务流水
   */
  queryPayRecList(curPage?: number) {
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
    $.when(me.financeService.queryPayRec(me.queryParams)).always(res => {
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
    this.queryPayRecList();
  }

  /**
   * 审核支付记录认证
   * @param data 用户实名认证信息
   */
  auditPayRec(data ?: object) {
    let me = this;
    this.modalService.create({
      nzTitle: '审核支付记录认证',
      nzContent: BiddingPayRecAuditWinComponent,
      nzComponentParams: {data: data},
      nzWidth: '1200',
      nzFooter: null,
      nzOnOk: function () {
        me.queryPayRecList();
      }
    });
  }
}