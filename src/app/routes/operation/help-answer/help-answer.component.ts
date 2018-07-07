import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Page} from "../../../public/util/page";
import {NzModalService} from "ng-zorro-antd";
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {OperationService} from "../operation.service";
import {isNullOrUndefined} from "util";
declare var $: any;

@Component({
  selector: 'app-help-answer',
  templateUrl: './help-answer.component.html',
  styleUrls: ['./help-answer.component.css']
})
export class HelpAnswerComponent implements OnInit, OnChanges {
  public helpAnswerList: Page = new Page();        //列表
  public _loading: boolean = false;                 //是否加载中
  public isConfirmLoading: boolean = false;            //是否加载中
  public valEditTitle: string = '添加键值';
  public validateForm: any = {};                   //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public isAddVal: boolean = false;            //是否添加键值
  public enumState: any = Setting.ENUMSTATE;
  @Input('curKind') curKind: any = {};
  public currentModal: any;
  public query: any = {};//搜索条件


  constructor(private operationService: OperationService,
              private modalService: NzModalService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['curKind']) {
      if (this.curKind.id) this.getHelpAnswerList(1);
    }
  }

  ngOnInit() {
  }

  getHelpAnswerList(curPage?: number) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.helpAnswerList.curPage = curPage;//当有页码时，查询该页数据
    me.helpAnswerList.params = { //查询参数
      curPage: me.helpAnswerList.curPage, //目标页码
      pageSize: me.helpAnswerList.pageSize, //每页条数
      kindId: me.curKind.id,
      question: me.query.question,
    }
    $.when(me.operationService.getHelpAnswerList(me.helpAnswerList.params)).done(res => {
      me._loading = false; //解除锁屏
      if (res) me.helpAnswerList = res; //赋值
    })
  }

  /**
   * 修改是否可用状态
   * @param id
   * @param enable
   */
  changeIsEnable(id, enable) {
    let me = this, data = {
      id: id,
      state: enable ? Setting.ENUMSTATE.showState.show : Setting.ENUMSTATE.showState.hide
    };
    me.operationService.updateHelpQuestionState(data);
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
    me.isAddVal = type === 'add' ? true : false;
    if (type === 'up') {
      me.valEditTitle = '修改类型';
      me.getCurValInfo(id)
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
   * @param id
   */
  getCurValInfo(id) {
    let me = this;
    $.when(me.operationService.getHelpAnswerById(id)).done(res => {
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
    me.validateForm.id = me.curKind.id;
    let formVal = Object.assign({}, me.validateForm);
    if (me.isAddVal) {
      $.when(me.operationService.addHelpQuestions(formVal)).then(success => {
        if (success) {
          me.handleCancel();
          me.getHelpAnswerList()
        }
        me.isConfirmLoading = false;
      })
    } else {
      $.when(me.operationService.updateHelpQuestion(formVal)).then(success => {
        if (success) {
          me.handleCancel();
          me.getHelpAnswerList()
        }
        me.isConfirmLoading = false;
      })
    }
  }

  /**
   * 删除问题
   * @param id
   */
  delQuestion(id) {
    let me = this;
    $.when(me.operationService.deleteHelpQuestions(id)).then(success => {
      if (success) me.getHelpAnswerList();
    })
  }

}
