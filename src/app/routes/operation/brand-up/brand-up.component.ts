import {Component, Input, OnInit} from '@angular/core';
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {NzModalRef, UploadFile} from "ng-zorro-antd";
import {OperationService} from "../operation.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {MainService} from "../../../public/service/main.service";
declare var $: any;

@Component({
  selector: 'app-brand-up',
  templateUrl: './brand-up.component.html',
  styleUrls: ['./brand-up.component.css']
})
export class BrandUpComponent implements OnInit {
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
  @Input('id') id: string;

  constructor(private operationService: OperationService, private modal: NzModalRef) {
  }

  ngOnInit() {
    this.getBrandById();
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
   * 根绝品牌id查品牌信息
   */
  getBrandById() {
    let me = this;
    $.when(me.operationService.getBrandById(me.id)).then(data => {
      if (data) {
        me.validateForm = data;
        if (data.brandPic) {
          me.fileList = [{
            uid: -1,
            name: 'logo',
            status: 'done',
            url: data.brandPic,
            thumbUrl: data.brandPic
          }]
        }
      }
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
