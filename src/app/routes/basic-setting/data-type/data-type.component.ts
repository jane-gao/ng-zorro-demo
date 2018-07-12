import {Component, OnInit} from '@angular/core';
import {Page} from "../../../public/util/page";
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {NzModalService} from "ng-zorro-antd";
import {BasicSettingService} from "../basic-setting.service";
import {isNullOrUndefined} from "util";
declare var $: any;

@Component({
  selector: 'app-data-type',
  templateUrl: './data-type.component.html',
  styleUrls: ['./data-type.component.css']
})
export class DataTypeComponent implements OnInit {
  public isConfirmLoading: boolean = false;         //是否加载中
  public dictionaryType: Page = new Page();        //糖果变动记录
  public validateForm: any = {};                   //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public _loading: boolean = false;            //是否加载中
  public typeEditTitle: string = '添加类型';
  public isAddType: boolean = true;
  public dataType: string = 'type';
  public currentModal: any;
  public curType: any = {};
  public enumState: any = Setting.ENUMSTATE;


  constructor(private basicSettingService: BasicSettingService,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.queryDictionaryType()
  }

  delKey(code) {
    let me = this;
    $.when(me.basicSettingService.deleteDatadict({code: code}, 'type')).done(res => {
      if (res) me.queryDictionaryType(1)
    })
  }

  setCurType(data) {
    this.curType = {
      name: data.name,
      code: data.code
    };
  }

  queryDictionaryType(curPage?) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.dictionaryType.curPage = curPage;//当有页码时，查询该页数据
    me.dictionaryType.params = { //查询参数
      curPage: me.dictionaryType.curPage, //目标页码
      pageSize: me.dictionaryType.pageSize, //每页条数
    }
    $.when(BasicSettingService.getList(me.dataType, me.dictionaryType.params)).done(res => {
      me._loading = false; //解除锁屏
      if (res.success) {
        me.dictionaryType = res.data;
        me.curType = {
          name: me.dictionaryType.voList[0].name,
          code: me.dictionaryType.voList[0].code
        };
      } //赋值
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
    $.when(me.basicSettingService.upEnable(data, me.isAddType)).done(res => {
      if (!res) me.queryDictionaryType()
    })
  }

  /**
   * 点击添加类型，弹窗出现
   * @param type  ('add' | 'up')
   * @param titleTpl  弹窗标题
   * @param contentTpl  弹窗内容
   * @param footerTpl   弹窗底部
   */
  showModalForTemplate(type, titleTpl, contentTpl, footerTpl, code?) {
    let me = this;
    me.validateForm = {};
    me.isAddType = type === 'add' ? true : false;
    if (type === 'up') {
      me.typeEditTitle = '修改类型';
      me.getCurKeyInfo(code)
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
   * getCurKeyInfo
   * @param code
   */
  getCurKeyInfo(code) {
    let me = this;
    $.when(BasicSettingService.getDataByCode(me.dataType, {code: code})).done(res => {
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
    let formVal = Object.assign({}, me.validateForm);
    if (formVal.isUniqueVal) formVal.isUniqueVal = Setting.ENUMSTATE.yes;
    else formVal.isUniqueVal = Setting.ENUMSTATE.no;
    if (me.isAddType) {
      $.when(me.basicSettingService.addData(formVal, me.dataType)).done(success => {
        if (success) {
          me.handleCancel();
          me.queryDictionaryType()
        }
        me.isConfirmLoading = false;
      })
    } else {
      $.when(me.basicSettingService.upData(formVal, me.dataType)).done(success => {
        if (success) {
          me.handleCancel();
          me.queryDictionaryType()
        }
        me.isConfirmLoading = false;
      })
    }
  }

}
