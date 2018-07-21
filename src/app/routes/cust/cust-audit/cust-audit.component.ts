import {Component, OnInit} from '@angular/core';
import {Page} from "../../../public/util/page";
import {isNullOrUndefined} from "util";
import {CustService} from "../cust.service";
import {Setting} from "../../../public/setting/setting";
import {CustAuditWinComponent} from "../cust-audit-win/cust-audit-win.component";
import {NzModalService} from "ng-zorro-antd";
declare var $: any;
@Component({
  selector: 'app-cust-audit',
  templateUrl: './cust-audit.component.html',
  styleUrls: ['./cust-audit.component.css']
})
export class CustAuditComponent implements OnInit {
  public enums = Setting.ENUM;
  public _loading: boolean = false;                 //是否加载中
  //未审核页面相关参数
  public auditSearchParams: any = {};  //搜索参数
  public auditQuesryParams: any = {};   //查询参数
  public auditPage: Page = new Page();  //未审核页面分页对象

  //审核通过页面相关参数
  public passSearchParams: any = {};  //搜索参数
  public passQueryParams: any = {};   //查询参数
  public passPage: Page = new Page();  //未审核页面分页对象

  //审核通过页面相关参数
  public unPassSearchParams: any = {};  //搜索参数
  public unPassQueryParams: any = {};   //查询参数
  public unPassPage: Page = new Page();  //未审核页面分页对象

  public custAuthState = Setting.ENUMSTATE.authState; //用户状态信息

  constructor(private custService: CustService, private modalService: NzModalService) {
    this.queryAuditCustList(1);
  }

  ngOnInit() {
  }

  /**
   * 查询待审核用户列表
   */
  queryAuditCustList(curPage?: number) {
    let me = this;
    me._loading = true;
    if (!isNullOrUndefined(curPage)) me.auditPage.curPage = curPage;//当有页码时，查询该页数据
    me.auditQuesryParams = {
      curPage: me.auditPage.curPage, //目标页码
      pageSize: me.auditPage.pageSize, //每页条数
      state: me.custAuthState.audit, //状态
      custName: me.auditSearchParams.custName, //用户名称
      custPhone: me.auditSearchParams.custPhone, //用户手机
    };
    $.when(me.custService.queryCustAuthList(me.auditQuesryParams)).always(res => {
      me._loading = false;
      if (res) me.auditPage = res; //赋值
    })
  }

  /**
   * 查询审核通过的用户列表
   * @param curPage
   */
  queryPassCustList(curPage?: number) {
    let me = this;
    me._loading = true;
    if (!isNullOrUndefined(curPage)) me.passPage.curPage = curPage;//当有页码时，查询该页数据
    me.passQueryParams = {
      curPage: me.passPage.curPage, //目标页码
      pageSize: me.passPage.pageSize, //每页条数
      state: me.custAuthState.pass, //状态
      custName: me.passSearchParams.custName, //用户名称
      custPhone: me.passSearchParams.custPhone, //用户手机
    };
    $.when(me.custService.queryCustAuthList(me.passQueryParams)).always(res => {
      me._loading = false;
      if (res) me.passPage = res; //赋值
    })
  }

  /**
   * 查询审核驳回的用户信息
   * @param curPage
   */
  queryUnPassCustList(curPage?: number) {
    let me = this;
    me._loading = true;
    if (!isNullOrUndefined(curPage)) me.unPassPage.curPage = curPage;//当有页码时，查询该页数据
    me.unPassQueryParams = {
      curPage: me.unPassPage.curPage, //目标页码
      pageSize: me.unPassPage.pageSize, //每页条数
      state: me.custAuthState.unPass, //状态
      custName: me.unPassSearchParams.custName, //用户名称
      custPhone: me.unPassSearchParams.custPhone, //用户手机
    };
    $.when(me.custService.queryCustAuthList(me.unPassQueryParams)).always(res => {
      me._loading = false;
      if (res) me.unPassPage = res; //赋值
    })
  }

  /**
   * 重置待审核搜索条件
   */
  resetAuthSearch() {
    this.auditSearchParams = {};
    this.queryAuditCustList();
  }

  /**
   * 重置待审核搜索条件
   */
  resetPassSearch() {
    this.passSearchParams = {};
    this.queryPassCustList();
  }

  /**
   * 重置待审核搜索条件
   */
  resetUnPassSearch() {
    this.unPassSearchParams = {};
    this.queryUnPassCustList();
  }

  /**
   * 审核用户信息
   * @param data 用户实名认证信息
   */
  auditCust(data ?: object) {
    let me = this;
    const modal = this.modalService.create({
      nzTitle: '审核实名认证',
      nzContent: CustAuditWinComponent,
      nzComponentParams: {data: data},
      nzWidth: '1200',
      nzFooter: null,
      nzOnOk: function () {
        alert("成功");
        me.queryAuditCustList();
      }
    });
    console.log("data", data);
    // modal.afterClose.subscribe((result) => {
    // });
    // let data = {
    //   id: id,
    //   state: this.custAuthState.pass
    // };
    // $.when(me.custService.updateCustAuthState(data)).always(res => {
    //   me.queryAuditCustList();
    // })
  }
}
