import {Component, Input, OnInit} from '@angular/core';
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {Page} from "../../../public/util/page";
import {EnterpriseService} from "../enterprise.service";
import {isNullOrUndefined} from "util";
declare var $: any;

@Component({
  selector: 'app-enterprise-join-list',
  templateUrl: './enterprise-join-list.component.html',
  styleUrls: ['./enterprise-join-list.component.css']
})
export class EnterpriseJoinListComponent implements OnInit {
  @Input('state') state: string = "";
  public searchParams: any = {};  //搜索参数
  public queryParams: any = {};   //查询参数
  public _loading: boolean = false;                 //是否加载中
  public page: Page = new Page();  //用户分页对象
  public enums = Setting.ENUM;
  public authEnums = MainService.getEnumDataList(this.enums.authState); //用户认证状态枚举集合
  public stateEnums = MainService.getEnumDataList(this.enums.enterpriseState);  //用户状态枚举集合
  constructor(private enterpriseService: EnterpriseService) {
  }

  ngOnInit() {
  }

  /**
   * 查询企业列表
   */
  queryEnterpriseJoinList(curPage?: number) {
    let me = this;
    me._loading = true;
    if (!isNullOrUndefined(curPage)) me.page.curPage = curPage;//当有页码时，查询该页数据
    me.queryParams = {
      curPage: me.page.curPage, //目标页码
      pageSize: me.page.pageSize, //每页条数
      epName: me.searchParams.epName, //企业名称
      legalPersonName: me.searchParams.legalPersonName, //法人名
      enterPriseJoinState: this.state, //企业状态
    };
    $.when(me.enterpriseService.queryEnterpriseJoinList(me.queryParams)).always(res => {
      me._loading = false;
      if (res) me.page = res; //赋值
    })
  }

  resetSearch() {
    this.searchParams = {};
    this.queryEnterpriseJoinList();
  }
}
