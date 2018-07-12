import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {ActivatedRoute} from "@angular/router";
import {OperationService} from "../operation.service";
declare var $: any;

@Component({
  selector: 'app-help-answer-add',
  templateUrl: './help-answer-add.component.html',
  styleUrls: ['./help-answer-add.component.css']
})
export class HelpAnswerAddComponent implements OnInit {
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
    this.validateForm.kindId = this.route.snapshot.queryParams['kindId'];
    this.kindName = this.route.snapshot.queryParams['kindName'];
  }

  addQuestion() {
    let me = this;
    me.isConfirmLoading = true;
    $.when(me.operationService.addHelpQuestions(me.validateForm)).always(success => {
      me.isConfirmLoading = false;
      if (success) me.ifRefreshParent = true, me.back();
    })
  }

  /**
   * 返回
   */
  back() {
    this.location.back()
  }
}
