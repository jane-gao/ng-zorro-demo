import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Page} from "../../../public/util/page";
import {BasicSettingService} from "../basic-setting.service";
import {NzModalService} from "ng-zorro-antd";
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
declare var $: any;

@Component({
  selector: 'app-data-value',
  templateUrl: './data-value.component.html',
  styleUrls: ['./data-value.component.css']
})
export class DataValueComponent implements OnInit,OnChanges {
  public dictionaryValue: Page = new Page();        //列表
  public _loading: boolean = false;                 //是否加载中
  public isConfirmLoading: boolean = false;            //是否加载中
  public valEditTitle: string = '添加键值';
  validateForm: any = {};                   //表单
  ngValidateStatus = Util.ngValidateStatus;//表单项状态
  ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  valitateState: any = Setting.valitateState;//表单验证状态
  public isAddVal: boolean = false;            //是否添加键值
  public dataType: string = 'val';
  public enumState: any = Setting.ENUMSTATE;
  @Input('curType') curType: any = {};
  public currentModal: any;

  constructor(private basicSettingService: BasicSettingService,
              private modalService: NzModalService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['curType']) {
      if(this.curType.code) this.queryDictionaryValue();
    }
  }

  ngOnInit() {
  }

  queryDictionaryValue() {
    let me = this;
    me._loading = true; //锁屏
    me.dictionaryValue.params = { //查询参数
      curPage: me.dictionaryValue.curPage, //目标页码
      pageSize: me.dictionaryValue.pageSize, //每页条数
      code: me.curType.code
    }
    $.when(BasicSettingService.getList(me.dataType, me.dictionaryValue.params)).done(res => {
      me._loading = false; //解除锁屏
      if (res.success) me.dictionaryValue = res.data; //赋值
    })
  }

  /**
   * 修改是否可用状态
   * @param code
   * @param enable
   */
  changeIsEnable(code, enable) {
    let me = this, data = {
      code: code,
      enable: enable ? Setting.ENUMSTATE.yes : Setting.ENUMSTATE.no
    };
    me.basicSettingService.upEnable(data, me.isAddVal);
  }

  /**
   * 点击添加类型，弹窗出现
   * @param type  ('add' | 'up')
   * @param titleTpl  弹窗标题
   * @param contentTpl  弹窗内容
   * @param footerTpl   弹窗底部
   */
  showModalForTemplate(type, titleTpl, contentTpl, footerTpl,code?) {
    let me = this;
    me.validateForm = {};
    me.isAddVal = type === 'add' ? true : false;
    if (type === 'up') {
      me.valEditTitle = '修改类型';
      me.getCurValInfo(code)
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
   * getCurValInfo
   * @param code
   */
  getCurValInfo(code){
    let me = this;
    $.when(BasicSettingService.getDataByCode(me.dataType, {code:code})).done(res => {
      if (res.success) me.validateForm = res.data; //赋值
    })
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
    me.validateForm.typeCode = me.curType.code;
    let formVal = Object.assign({},me.validateForm);
    if(formVal.isUniqueVal) formVal.isUniqueVal = Setting.ENUMSTATE.yes;
    else formVal.isUniqueVal = Setting.ENUMSTATE.no;
    if (me.isAddVal) {
      $.when(me.basicSettingService.addData(formVal, me.dataType)).done(success => {
        if (success) {
          me.handleCancel();
          me.queryDictionaryValue()
        }
        me.isConfirmLoading = false;
      })
    }else{
      $.when(me.basicSettingService.upData(formVal, me.dataType)).done(success => {
        if (success) {
          me.handleCancel();
          me.queryDictionaryValue()
        }
        me.isConfirmLoading = false;
      })
    }
  }

}

