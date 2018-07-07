import {Component, OnInit} from '@angular/core';
import {Page} from "../../../public/util/page";
import {Setting} from "../../../public/setting/setting";
import {Util} from "../../../public/util/util";
import {OperationService} from "../operation.service";
import {NzModalService} from "ng-zorro-antd";
import {isNullOrUndefined} from "util";
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
  public enums: any = Setting.ENUM;
  public enumState: any = Setting.ENUMSTATE;
  public query: any = {};//搜索条件
  public isAddVal: boolean = false;            //是否添加键值
  public currentModal: any;
  public valEditTitle: string = '添加键值';
  public curBrand: any = {};
  public kindList: Array<any> = [];// 分类列表

  constructor(private operationService: OperationService,
              private modalService: NzModalService) {
  }

  ngOnInit() {
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

  changeIsEnable(id, event) {

  }

  getKindList() {}

  delBrand(id, event) {
    let me = this;
    /*$.when(me.operationService.deleteHelpQuestions(id)).then(success => {
      if (success) me.getBrandsList();
    })*/
  }

  showModalForTemplate(type, titleTpl, contentTpl, footerTpl, id?) {
    let me = this;
    me.validateForm = {};
    if (id) me.validateForm.id = id;
    me.isAddVal = type === 'add' ? true : false;
    if (type === 'up') {
      me.valEditTitle = '修改类型';
      me.getCurBrandInfo(id);
    }
    me.currentModal = me.modalService.create({
      nzTitle: titleTpl,
      nzContent: contentTpl,
      nzFooter: footerTpl,
      nzMaskClosable: false,
      nzOnCancel: () => {
        me.isConfirmLoading = false;//点击确认按钮加载小圈
      }
    });
  }

  getCurBrandInfo(id) {

  }

  /**
   * 关闭弹窗
   * @param e
   */
  handleCancel() {
    this.currentModal.destroy('onCancel');//关闭弹窗
  }

  handleOk() {
    let me = this;
    me.isConfirmLoading = true;
    let formVal = Object.assign({}, me.validateForm);
    if (me.isAddVal) {
      $.when(me.operationService.addHelpQuestions(formVal)).then(success => {
        if (success) {
          me.handleCancel();
          me.getBrandsList()
        }
        me.isConfirmLoading = false;
      })
    } else {
      $.when(me.operationService.updateHelpQuestion(formVal)).then(success => {
        if (success) {
          me.handleCancel();
          me.getBrandsList()
        }
        me.isConfirmLoading = false;
      })
    }
  }

}
