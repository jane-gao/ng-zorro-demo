import {Component, OnInit} from '@angular/core';
import {Page} from "../../../public/util/page";
import {OperationService} from "../operation.service";
import {isNullOrUndefined} from "util";
import {Setting} from "../../../public/setting/setting";
import {Util} from "../../../public/util/util";
import {NzModalService} from "ng-zorro-antd";
declare var $: any;

@Component({
  selector: 'app-help-kind',
  templateUrl: './help-kind.component.html',
  styleUrls: ['./help-kind.component.css']
})
export class HelpKindComponent implements OnInit {
  public helpKindList: Page = new Page();        //列表
  public _loading: boolean = false;              //是否加载中
  public isConfirmLoading: boolean = false;     //是否加载中
  public helpKindEditTitle: string = '添加分类';     //弹窗标题
  public validateForm: any = {};                   //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public isAddKind: boolean = false;     //是否添加分类
  public currentModal: any;     //弹窗
  public curKind: any = {};
  public enumState: any = Setting.ENUMSTATE;

  constructor(public operationService: OperationService,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.queryHelpKindList();
  }

  setCurType(data) {
    this.curKind = {
      name: data.kindName,
      id: data.id
    };
  }

  queryHelpKindList(curPage?) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.helpKindList.curPage = curPage;//当有页码时，查询该页数据
    me.helpKindList.params = { //查询参数
      curPage: me.helpKindList.curPage, //目标页码
      pageSize: me.helpKindList.pageSize, //每页条数
    }
    $.when(me.operationService.getHelpKindList(me.helpKindList.params)).then(res => {
      if (res) {
        me._loading = false; //解除锁屏
        me.helpKindList = res;
        me.curKind = {
          name: me.helpKindList.voList[0].kindName,
          id: me.helpKindList.voList[0].id
        };
      } //赋值
    })
  }

  /**
   * 修改是否可用状态
   * @param code
   * @param enable
   */
  changeIsEnable(id, enable) {
    let me = this, data = {
      id: id,
      state: enable ? Setting.ENUMSTATE.showState.show : Setting.ENUMSTATE.showState.hide
    };
    $.when(me.operationService.updateHelpKindState(data)).done(res => {
      if (!res) me.queryHelpKindList()
    })
  }

  /**
   * 获取某个分类信息
   * @param id
   */
  getCurKindInfo(id){
    let me = this;
    $.when(me.operationService.getHelpKindById(id)).done(res => {
      if (res) me.validateForm = res;
    })
  }

  /**
   * 点击添加类型，弹窗出现
   * @param type  ('add' | 'up')
   * @param titleTpl  弹窗标题
   * @param contentTpl  弹窗内容
   * @param footerTpl   弹窗底部
   */
  showModalForTemplate(type, titleTpl, contentTpl, footerTpl, id?) {
    let me = this;
    me.validateForm = {};
    if(id) me.validateForm.id = id;
    me.isAddKind = type === 'add' ? true : false;
    if (type === 'up') {
      me.helpKindEditTitle = '修改分类';
      me.getCurKindInfo(id);
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
    if (me.isAddKind) {
      $.when(me.operationService.addHelpKind(me.validateForm)).then(success => {
        if (success) {
          me.handleCancel();
          me.queryHelpKindList()
        }
        me.isConfirmLoading = false;
      })
    } else {
      $.when(me.operationService.updateHelpKind(me.validateForm)).then(success => {
        if (success) {
          me.handleCancel();
          me.queryHelpKindList()
        }
        me.isConfirmLoading = false;
      })
    }
  }

}
