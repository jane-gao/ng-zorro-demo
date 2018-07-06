import {Component, OnInit} from '@angular/core';
import {Page} from "../../../public/util/page";
import {isNullOrUndefined} from "util";
import {UsersService} from "../users.service";
declare var $: any;

@Component({
  selector: 'app-user-factor',
  templateUrl: './user-factor.component.html',
  styleUrls: ['./user-factor.component.css']
})
export class UserFactorComponent implements OnInit {
  public _loading: boolean = false;            //是否加载中
  public userFactorList: Page = new Page();          //所有用户
  public _custCode: string;          //所有用户
  set custCode(value: string) {
    let me = this;
    me._custCode = value;
  }

  constructor() {
  }

  ngOnInit() {
    this.queryFactorList();
  }

  queryFactorList(curPage?) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.userFactorList.curPage = curPage;//当有页码时，查询该页数据
    me.userFactorList.params = { //查询参数
      curPage: me.userFactorList.curPage, //目标页码
      pageSize: me.userFactorList.pageSize, //每页条数
      custCode: me._custCode, //每页条数
    }
    $.when(UsersService.getFactorList(me.userFactorList.params)).done(res => {
      me._loading = false; //解除锁屏
      if (res.success) me.userFactorList = res.data; //赋值
    })
  }


}
