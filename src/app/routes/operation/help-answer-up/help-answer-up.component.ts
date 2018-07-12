import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {ActivatedRoute} from "@angular/router";
import {OperationService} from "../operation.service";
declare var $: any;

@Component({
  selector: 'app-help-answer-up',
  templateUrl: './help-answer-up.component.html',
  styleUrls: ['./help-answer-up.component.css']
})
export class HelpAnswerUpComponent implements OnInit {
  public validateForm: any = {};                   //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public kindName: string;//当前分类
  public isConfirmLoading: boolean = false;//按钮是否加载状态
  public ifRefreshParent: boolean = false;//是否需要刷新父页面

  constructor(public location: Location,
              private operationService: OperationService,
              public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.validateForm.id = this.route.snapshot.queryParams['id'];
    this.kindName = this.route.snapshot.queryParams['kindName'];
    this.getQuestionById();
  }

  /**
   * 通过id获取问题
   */
  getQuestionById() {
    let me = this;
    $.when(me.operationService.getHelpAnswerById(me.validateForm.id)).always(data => {
      if (data) me.validateForm = data;
    })
  }

  /**
   * 修改问题
   */
  upQuestion() {
    let me = this;
    me.isConfirmLoading = true;
    $.when(me.operationService.updateHelpQuestion(me.validateForm)).always(success => {
      me.isConfirmLoading = false;
      if (success) me.ifRefreshParent = true,me.back();
    })
  }

  /**
   * 返回
   */
  back() {
    this.location.back()
  }
}

