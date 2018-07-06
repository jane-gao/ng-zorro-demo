import {Component, OnInit} from "@angular/core";
import {Page} from "../../../public/util/page";
import {UsersService} from "../users.service";
import {isNullOrUndefined} from "util";
import {NzModalService} from "ng-zorro-antd";
import {UserFactorComponent} from "../user-factor/user-factor.component";
import {UserCandyComponent} from "../user-candy/user-candy.component";
import {Setting} from "../../../public/setting/setting";
declare var $: any;

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html',
  styleUrls: ['./users-all.component.css']
})
export class UsersAllComponent implements OnInit {
  public query: any = {};//搜索条件
  public showList: boolean = true;            //是否显示主列表页
  public _loading: boolean = true;            //是否加载中
  public allUsers: Page = new Page();          //所有用户
  public enumState = Setting.ENUMSTATE;
  public pageMsg = Setting.PAGEMSG;


  constructor(public modalService: NzModalService,public usersService: UsersService) {
  }

  ngOnInit() {
    this.queryAllUsers()
  }

  /**
   *
   * @param curPage
   */
  queryAllUsers(curPage?:number) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.allUsers.curPage = curPage;//当有页码时，查询该页数据
    me.allUsers.params = { //查询参数
      curPage: me.allUsers.curPage, //目标页码
      pageSize: me.allUsers.pageSize, //每页条数
    }
    $.when(UsersService.getAllUsers(me.allUsers.params)).done(res => {
      me._loading = false; //解除锁屏
      if (res.success) me.allUsers = res.data; //赋值
      console.log("█ me.allUsers ►►►",  me.allUsers);
    })
  }

  audit(custCode){
    this.modalService.create({
      nzTitle: `审核“${name}”`,            //弹窗标题
      nzContent: UserFactorComponent,                 //弹窗内容组件
      nzWidth: 800,                                //弹窗宽度
      nzFooter: null,                                //弹窗脚
      nzComponentParams: {                           //传参数
        custCode: custCode
      }
    });
  }

  resetSearch() {

  }

  /**
   * 显示算力明细窗口组件
   */
  showFactorDetail(custCode, name) {
    this.modalService.create({
      nzTitle: `“${name}”的算力明细`,            //弹窗标题
      nzContent: UserFactorComponent,                 //弹窗内容组件
      nzWidth: 800,                                //弹窗宽度
      nzFooter: null,                                //弹窗脚
      nzComponentParams: {                                  //传参数
        custCode: custCode
      }
    });
  }

  /**
   * 显示糖果明细窗口组件
   */
  showCandyDetail(custCode, name) {
    this.modalService.create({
      nzTitle: `“${name}”的糖果明细`,            //弹窗标题
      nzContent: UserCandyComponent,                 //弹窗内容组件
      nzWidth: 800,                                //弹窗宽度
      nzFooter: null,                                //弹窗脚
      nzComponentParams: {                                  //传参数
        custCode: custCode
      }
    });
  }

  /**
   * 显示推广的人窗口组件
   */
  showSpreadCustDetail(custCode, name) {
    this.modalService.create({
      nzTitle: `“${name}”推广的人`,            //弹窗标题
      nzContent: UserFactorComponent,                 //弹窗内容组件
      nzWidth: 800,                                //弹窗宽度
      nzFooter: null,                                //弹窗脚
      nzComponentParams: {                                  //传参数
        custCode: custCode
      }
    });
  }

  /**
   * 修改状态
   * @param state 修改后状态码
   * @param custCode 用户编码
   */
  changeState(state,custCode){
    let me = this;
    $.when(me.usersService.changeUserState(state, custCode)).done(data => {
      if (data) me.queryAllUsers();
    })
  }


}
