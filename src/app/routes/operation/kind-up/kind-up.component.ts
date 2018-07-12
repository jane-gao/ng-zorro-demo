import {Component, Input, OnInit} from '@angular/core';
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {NzModalRef, UploadFile} from "ng-zorro-antd";
import {OperationService} from "../operation.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {MainService} from "../../../public/service/main.service";
import {PatternService} from "../../../public/service/pattern.service";
import enumerate = Reflect.enumerate;
declare var $: any;

@Component({
  selector: 'app-kind-up',
  templateUrl: './kind-up.component.html',
  styleUrls: ['./kind-up.component.css']
})
export class KindUpComponent implements OnInit {
  public uploadUrl: string = SettingUrl.URL.base.upload;
  public validateForm: any = {};                   //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public isConfirmLoading: boolean = false;            //是否加载中
  public fileList: Array<any> = [];
  public previewVisible = false;
  public previewImage = '';
  private uuid: string;
  public patterns = PatternService;
  @Input('id') id: string;

  constructor(private operationService: OperationService, private modal: NzModalRef) {
  }

  ngOnInit() {
    this.uuid = MainService.uploadUid();
  }

  /**
   * 获取分类
   */
  getKindById() {
    let me = this;
    $.when(me.operationService.loadGoodsKindById(me.id)).always(data => {
      if (data) me.validateForm = data;
    })
  }

  /**
   * 修改分类
   */
  upKind() {
    let me = this, uploadedFile: Array<any> = [];
    uploadedFile = me.fileList.filter(item => {
      return item.status == 'done';
    });
    if (uploadedFile.length > 0) me.validateForm.brandImageuuid = me.uuid;
    me.isConfirmLoading = true;
    me.validateForm.kindParentId = me.id;
    $.when(me.operationService.updateGoodsKind(me.validateForm)).always(success => {
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
