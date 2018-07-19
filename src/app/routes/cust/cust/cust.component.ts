import {Component, OnInit} from '@angular/core';
import {Page} from "../../../public/util/page";
import {CustService} from "../cust.service";
import {NzModalService} from "ng-zorro-antd";
import {isNullOrUndefined} from "util";
import {Setting} from "../../../public/setting/setting";
import {MainService} from "../../../public/service/main.service";
declare var $: any;
@Component({
  selector: 'app-cust',
  templateUrl: './cust.component.html',
  styleUrls: ['./cust.component.css']
})
export class CustComponent implements OnInit {
  public searchParams: any = {};  //搜索参数
  public queryParams: any = {};   //查询参数
  public _loading: boolean = false;                 //是否加载中
  public page: Page = new Page();  //用户分页对象
  public enums = Setting.ENUM;
  public authEnums = MainService.getEnumDataList(this.enums.custAuthState); //用户认证状态枚举集合
  public stateEnums = MainService.getEnumDataList(this.enums.custState);  //用户状态枚举集合

  public custState = Setting.ENUMSTATE.custState; //用户状态信息

  constructor(private custService: CustService, private modalService: NzModalService) {
  }

  ngOnInit() {
    this.queryCustList();
  }

  /**
   * 查询用户列表
   */
  queryCustList(curPage?: number) {
    let me = this;
    me._loading = true;
    if (!isNullOrUndefined(curPage)) me.page.curPage = curPage;//当有页码时，查询该页数据
    me.queryParams = {
      curPage: me.page.curPage, //目标页码
      pageSize: me.page.pageSize, //每页条数
      custName: me.searchParams.custName, //用户名称
      custPhone: me.searchParams.custPhone, //用户手机
      authState: me.searchParams.authState, //认证状态
      state: me.searchParams.state, //用户状态
    };
    $.when(me.custService.queryCustList(me.queryParams)).always(res => {
      me._loading = false;
      if (res) me.page = res; //赋值
    })
  }

  resetSearch() {
    this.searchParams = {};
    this.queryCustList();
  }

  /**
   * 冻结用户
   * @param custCode
   */
  freezeCust(custCode?: string) {
    let me = this;
    let data = {
      custCode: custCode,
      state: this.custState.freeze
    };
    $.when(me.custService.updateCustState(data)).done(res => {
      this.queryCustList();
    })
  }

  /**
   * 删除用户
   * @param custCode
   */
  delCust(custCode?: string) {
    let me = this;
    let data = {
      custCode: custCode,
      state: this.custState.del
    };
    $.when(me.custService.updateCustState(data)).done(res => {
      this.queryCustList();
    })
  }

  /**
   * 激活用户
   * @param custCode
   */
  activeCust(custCode?: string) {
    let me = this;
    let data = {
      custCode: custCode,
      state: this.custState.normal
    };
    $.when(me.custService.updateCustState(data)).done(res => {
      this.queryCustList();
    })
  }
}
