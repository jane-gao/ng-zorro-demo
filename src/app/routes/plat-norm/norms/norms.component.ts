import {Component, OnInit} from '@angular/core';
import {Page} from "../../../public/util/page";
import {isNullOrUndefined} from "util";
import {Setting} from "../../../public/setting/setting";
import {Util} from "../../../public/util/util";
import {NzModalService} from "ng-zorro-antd";
import {PlatNormService} from "../plat-norm.service";
import {NormAddComponent} from "../norm-add/norm-add.component";
import {NormUpComponent} from "../norm-up/norm-up.component";
declare var $: any;

@Component({
  selector: 'app-norms',
  templateUrl: './norms.component.html',
  styleUrls: ['./norms.component.css']
})
export class NormsComponent implements OnInit {
  public normList: Page = new Page();        //列表
  public _loading: boolean = false;              //是否加载中
  public isConfirmLoading: boolean = false;     //是否加载中
  public isShowThisComponent: boolean = true;     //是否显示当前组件
  public query: any = {};//搜索参数
  public curNorm: any = {};
  public enumState: any = Setting.ENUMSTATE;

  constructor(public platNormService: PlatNormService,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.queryNormList();
  }

  setCurNorm(data) {
    this.curNorm = {
      normName: data.normName,
      normCode: data.normCode
    };
  }

  /**
   * 查询标准列表
   * @param curPage
   */
  queryNormList(curPage?) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.normList.curPage = curPage;//当有页码时，查询该页数据
    me.normList.params = { //查询参数
      curPage: me.normList.curPage, //目标页码
      pageSize: 500, //每页条数
      normName: me.query.normName, //标准名
    }
    $.when(me.platNormService.getPlatNormList(me.normList.params)).always(res => {
      me._loading = false; //解除锁屏
      if (res) {
        me.normList = res;
        me.curNorm = {
          normName: me.normList.voList[0].normName,
          normCode: me.normList.voList[0].normCode
        };
      } //赋值
    })
  }

  /**
   * 添加平台标准，弹窗出现
   */
  addNorm() {
    let me = this;
    const modal = this.modalService.create({
      nzTitle: '添加平台标准',
      nzContent: NormAddComponent,
      nzWidth: '660',
      nzFooter: null
    });
    modal.afterClose.subscribe((result) => {
      if (result) me.queryNormList();
    });
  }

  /**
   * 修改平台标准，弹窗出现
   */
  upNorm(normName, normCode) {
    let me = this;
    const modal = this.modalService.create({
      nzTitle: '修改平台标准',
      nzContent: NormUpComponent,
      nzComponentParams: {
        normCode: normCode
      },
      nzWidth: '660',
      nzFooter: null
    });
    modal.afterClose.subscribe((result) => {
      if (result) me.queryNormList();
    });
  }

  /**
   * 删除平台标准
   * @param id
   */
  deletePlatNorm(normCode) {
    let me = this;
    $.when(me.platNormService.deletePlatNorm(normCode)).always(res => {
      if (res) me.queryNormList()
    })
  }

  /**
   * 修改是否可用状态
   * @param code
   * @param enable
   */
  changeIsEnable(normCode, enable) {
    let me = this, data = {
      normCode: normCode,
      isUse: enable ? Setting.ENUMSTATE.yes : Setting.ENUMSTATE.no
    };
    $.when(me.platNormService.upPlatNormStateByCode(data)).always(res => {
      if (!res) me.queryNormList()
    })
  }

  /**
   *
   * @param event
   */
  activate(event){
    this.isShowThisComponent = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.isShowThisComponent = true;
    if (event.refresh) this.curNorm.addSuccess = true;
  }
}
