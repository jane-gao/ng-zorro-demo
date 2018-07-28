import {Component, Input, OnInit} from '@angular/core';
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {NzModalRef, UploadFile} from "ng-zorro-antd";
import {OperationService} from "../operation.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {MainService} from "../../../public/service/main.service";
import {PatternService} from "../../../public/service/pattern.service";
declare var $: any;

@Component({
  selector: 'app-kind-add',
  templateUrl: './kind-add.component.html',
  styleUrls: ['./kind-add.component.css']
})
export class KindAddComponent implements OnInit {
  public uploadUrl: string = SettingUrl.URL.base.upload;
  public validateForm: any = {};                   //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public isConfirmLoading: boolean = false;            //是否加载中
  public enumState: any = Setting.ENUMSTATE;
  public fileList: Array<any> = [];
  public previewVisible = false;
  public previewImage = '';
  public uuid: string;
  public patterns = PatternService;
  @Input('pid') pid: string;
  @Input('pLevel') pLevel: string;
  @Input('pKindName') pKindName: string;//上级分类

  constructor(private operationService: OperationService, private modal: NzModalRef) {
  }

  ngOnInit() {
    this.uuid = MainService.uploadUid();
    this.validateForm.level = this.pLevel ? this.pLevel + 1 : 1;
    this.validateForm.state = true;
  }

  /**
   * 添加分类
   */
  addKind() {
    let me = this, uploadedFile: Array<any> = [];
    uploadedFile = me.fileList.filter(item => {
      return item.status == 'done';
    });
    if (uploadedFile.length > 0) me.validateForm.brandImageuuid = me.uuid;
    me.isConfirmLoading = true;
    me.validateForm.kindParentId = me.pid;
    me.validateForm.state = me.validateForm.state ? me.enumState.showState.show : me.enumState.showState.hide;
    $.when(me.operationService.addProductKind(me.validateForm)).always(success => {
      if (success) me.modal.destroy(true);
      me.isConfirmLoading = false;
    })
  }

  /**
   * 图片预览
   * @param file
   */
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  cancel() {
    this.modal.destroy();
  }

}
