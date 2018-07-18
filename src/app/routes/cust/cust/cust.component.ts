import {Component, OnInit} from '@angular/core';
import {Page} from "../../../public/util/page";
import {CustService} from "../cust.service";
import {NzModalService} from "ng-zorro-antd";
import {isNullOrUndefined} from "util";
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
  constructor(private custService: CustService, private modalService: NzModalService) {
  }

  ngOnInit() {
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
    };
    $.when(me.custService.queryCustList(me.queryParams)).always(res => {
      me._loading = false;
      if (res) me.page = res.data; //赋值
    })
  }

  resetSearch() {
    this.searchParams = {};
    this.queryCustList();
  }
}
