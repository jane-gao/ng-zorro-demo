import {Component, OnInit} from '@angular/core';
import {Setting} from "../../../public/setting/setting";
import {MainService} from "../../../public/service/main.service";
import {Page} from "../../../public/util/page";
import {isNullOrUndefined} from "util";
import {EnterpriseService} from "../enterprise.service";
declare var $: any;

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})
export class EnterpriseComponent implements OnInit {
  public searchParams: any = {};  //搜索参数
  public queryParams: any = {};   //查询参数
  public _loading: boolean = false;                 //是否加载中
  public page: Page = new Page();  //企业分页对象
  public enums = Setting.ENUM;
  public authEnums = MainService.getEnumDataList(this.enums.authState); //企业认证状态枚举集合
  public stateEnums = MainService.getEnumDataList(this.enums.enterpriseState);  //企业状态枚举集合

  public enterpriseState = Setting.ENUMSTATE.enterpriseState; //企业状态信息
  public enterpriseJoinState = Setting.ENUMSTATE.enterpriseJoinState; //企业状态信息

  constructor(private enterpriseService: EnterpriseService) {
  }

  ngOnInit() {
  }


  /**
   * 查询企业列表
   */
  queryCustList(curPage?: number) {
    let me = this;
    me._loading = true;
    if (!isNullOrUndefined(curPage)) me.page.curPage = curPage;//当有页码时，查询该页数据
    me.queryParams = {
      curPage: me.page.curPage, //目标页码
      pageSize: me.page.pageSize, //每页条数
      custName: me.searchParams.custName, //企业名称
      custPhone: me.searchParams.custPhone, //企业手机
      authState: me.searchParams.authState, //认证状态
      state: me.searchParams.state, //企业状态
    };
    $.when(me.enterpriseService.queryEnterpriseList(me.queryParams)).always(res => {
      me._loading = false;
      if (res) me.page = res; //赋值
    })
  }

  resetSearch() {
    this.searchParams = {};
    this.queryCustList();
  }
}
