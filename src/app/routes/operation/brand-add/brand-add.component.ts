import {Component, OnInit} from '@angular/core';
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {NzModalRef, UploadFile} from "ng-zorro-antd";
import {OperationService} from "../operation.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {MainService} from "../../../public/service/main.service";
declare var $: any;

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
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

  constructor(private operationService: OperationService, private modal: NzModalRef) {
  }

  ngOnInit() {
    this.uuid = MainService.uploadUid();
  }

  /**
   * 添加品牌
   */
  addBrand() {
    let me = this, uploadedFile: Array<any> = [];
    uploadedFile = me.fileList.filter(item => {
      return item.status == 'done';
    });
    if (uploadedFile.length > 0) me.validateForm.brandImageuuid = me.uuid;
    me.isConfirmLoading = true;
    $.when(me.operationService.addBrand(me.validateForm)).always(success => {
      me.isConfirmLoading = false;
      if (success) me.modal.destroy(true);
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
