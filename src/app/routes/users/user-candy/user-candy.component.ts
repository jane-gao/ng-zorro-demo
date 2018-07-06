import {Component, OnInit} from '@angular/core';
import {Page} from "../../../public/util/page";
import {isNullOrUndefined} from "util";
import {UsersService} from "../users.service";
declare var $: any;

@Component({
  selector: 'app-user-candy',
  templateUrl: './user-candy.component.html',
  styleUrls: ['./user-candy.component.css']
})
export class UserCandyComponent implements OnInit {
  public _loading: boolean = false;            //是否加载中
  public userCandyList: Page = new Page();          //所有用户
  public _custCode: string;          //所有用户
  set custCode(value: string) {
    let me = this;
    me._custCode = value;
  }

  constructor() {
  }

  ngOnInit() {
    this.queryCandyList();
  }

  queryCandyList(curPage?) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.userCandyList.curPage = curPage;//当有页码时，查询该页数据
    me.userCandyList.params = { //查询参数
      curPage: me.userCandyList.curPage, //目标页码
      pageSize: me.userCandyList.pageSize, //每页条数
      custCode: me._custCode
    }
    $.when(UsersService.getHecList(me.userCandyList.params)).done(res => {
      me._loading = false; //解除锁屏
      if (res.success) me.userCandyList = res.data; //赋值
    })
  }

}
