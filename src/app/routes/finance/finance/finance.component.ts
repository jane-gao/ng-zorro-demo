import {Component, OnInit} from '@angular/core';
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {Page} from "../../../public/util/page";
import {FinanceService} from "../finance.service";
import {isNullOrUndefined} from "util";
declare var $: any;

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {

  public balance: number;  //平台账户余额
  public searchParams: any = {};  //搜索参数
  public queryParams: any = {};   //查询参数
  public _loading: boolean = false;                 //是否加载中
  public page: Page = new Page();  //用户分页对象
  public enums = Setting.ENUM;
  public subject = MainService.getEnumDataList(this.enums.platSubject); //平台会计科目
  public userType = MainService.getEnumDataList(this.enums.userType);  //交易对象类型

  constructor(private finaceService: FinanceService) {
  }

  ngOnInit() {
    this.loadBalance();
    this.queryFinanceRecList();
  }

  /**
   * 查询平台财务流水
   */
  queryFinanceRecList(curPage?: number) {
    let me = this;
    me._loading = true;
    if (!isNullOrUndefined(curPage)) me.page.curPage = curPage;//当有页码时，查询该页数据
    me.queryParams = {
      curPage: me.page.curPage, //目标页码
      pageSize: me.page.pageSize, //每页条数
      tc: me.searchParams.tc, //交易码
      subject: me.searchParams.subject, //会计科目
      userType: me.searchParams.userType //交易对象类型
    };
    $.when(me.finaceService.queryFinaceRec(me.queryParams)).always(res => {
      me._loading = false;
      if (res) me.page = res; //赋值
    })
  }

  /**
   * 查询平台账户余额
   */
  loadBalance() {
    let me = this;
    $.when(me.finaceService.loadBalance()).always(res => {
      if (res) {
        me.balance = res; //赋值
      }
    })
  }

  resetSearch() {
    this.searchParams = {};
    this.queryFinanceRecList();
  }
}
