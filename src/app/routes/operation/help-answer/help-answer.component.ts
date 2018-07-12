import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Page} from "../../../public/util/page";
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {OperationService} from "../operation.service";
import {isNullOrUndefined} from "util";
import {SettingUrl} from "../../../public/setting/setting_url";
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
  public validateForm: any = {};                   //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public showList: boolean = true;            //是否显示列表，添加问题时隐藏列表
  public enumState: any = Setting.ENUMSTATE;
  public routerLinks: any = SettingUrl.ROUTERLINK;
  @Input('curKind') curKind: any = {};
  public query: any = {};//搜索条件


  constructor(private operationService: OperationService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['curKind']) {
      if (this.curKind.id) this.getHelpAnswerList(1);
    }
  }

  ngOnInit() {
  }

  resetSearch() {
    this.query = {};
    this.getHelpAnswerList(1);
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
    $.when(me.operationService.updateHelpQuestionState(data)).always(res => {
      if (!res) me.getHelpAnswerList(); //不成功刷新列表，可以重置switch
    })
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

  activate(event) {
    this.showList = false;
  }

  onDeactivate(event) {
    this.showList = true;
    if (event.ifRefreshParent) this.getHelpAnswerList();//如果子页面有修改则返回时刷新列表
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
