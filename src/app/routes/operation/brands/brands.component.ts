import {Component, OnInit} from '@angular/core';
import {Page} from "../../../public/util/page";
import {Setting} from "../../../public/setting/setting";
import {Util} from "../../../public/util/util";
import {OperationService} from "../operation.service";
import {NzModalService} from "ng-zorro-antd";
import {isNullOrUndefined} from "util";
import {BrandAddComponent} from "../brand-add/brand-add.component";
import {BrandUpComponent} from "../brand-up/brand-up.component";
declare var $: any;

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  public brandList: Page = new Page();        //列表
  public _loading: boolean = false;                 //是否加载中
  public isConfirmLoading: boolean = false;            //是否加载中
  public validateForm: any = {};                   //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public enumState: any = Setting.ENUMSTATE;
  public query: any = {};//搜索条件
  public isAddVal: boolean = false;            //是否添加键值
  public currentModal: any;

  constructor(private operationService: OperationService,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.getBrandsList()
  }

  getBrandsList(curPage?: number) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.brandList.curPage = curPage;//当有页码时，查询该页数据
    me.brandList.params = { //查询参数
      curPage: me.brandList.curPage, //目标页码
      pageSize: me.brandList.pageSize, //每页条数
      brandInitial: me.query.brandInitial, //首字母
      brandName: me.query.brandName, //品牌
    }
    $.when(me.operationService.getBrandsList(me.brandList.params)).done(res => {
      me._loading = false; //解除锁屏
      if (res) me.brandList = res; //赋值
    })
  }

  addBrand() {
    let me = this;
    const modal = this.modalService.create({
      nzTitle: '添加品牌',
      nzContent: BrandAddComponent,
      nzWidth: '720',
      nzFooter: null
    });
    modal.afterClose.subscribe((result) => {
      if (result) me.getBrandsList();
    });
  }

  upBrand(id) {
    let me = this;
    const modal = this.modalService.create({
      nzTitle: '修改品牌',
      nzContent: BrandUpComponent,
      nzComponentParams: {id: id},
      nzWidth: '720',
      nzFooter: null
    });
    modal.afterClose.subscribe((result) => {
      if (result) me.getBrandsList();
    });
  }

  /**
   * 修改是否推荐
   * @param id
   * @param event
   */
  changeIsRecommend(id, state) {
    let me = this, data = {
      id: id,
      brandRecommend: state ? Setting.ENUMSTATE.yes : Setting.ENUMSTATE.no
    };
    $.when(me.operationService.updateRecommend(data)).always(res => {
      if (!res) me.getBrandsList(); //不成功刷新列表，可以重置switch
    })
  }

  /**
   * 修改状态
   * @param id
   * @param event
   */
  changeIsEnable(id, state) {
    let me = this, data = {
      id: id,
      state: state ? Setting.ENUMSTATE.yes : Setting.ENUMSTATE.no
    };
    $.when(me.operationService.updateBrandState(data)).always(res => {
      if (!res) me.getBrandsList(); //不成功刷新列表，可以重置switch
    })
  }

  delBrand(id) {
    let me = this;
    $.when(me.operationService.deleteBrand(id)).then(success => {
     if (success) me.getBrandsList();
     })
  }
}
