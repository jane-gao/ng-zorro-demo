import {Component, Input, OnInit} from "@angular/core";
import {MainService} from "../../../public/service/main.service";
import {NzModalRef, UploadFile} from "ng-zorro-antd";
import {FinanceService} from "../finance.service";
import {Setting} from "../../../public/setting/setting";
import {Util} from "../../../public/util/util";
import {SettingUrl} from "../../../public/setting/setting_url";
declare var $: any;


@Component({
  selector: 'app-bidding-settle-audit-win',
  templateUrl: './bidding-settle-audit-win.component.html',
  styleUrls: ['./bidding-settle-audit-win.component.css']
})
export class BiddingSettleAuditWinComponent implements OnInit {
  @Input('data') data: any = {};
  public validateForm: any = {};                   //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public isConfirmLoading: boolean = false;            //是否加载中
  public enumState: any = Setting.ENUMSTATE;

  public uploadUrl: string = SettingUrl.URL.base.uploadRetHttpUrl;
  public bucketNameEnum: string = "space_name_finace"; //图片空间
  public fileList: Array<any> = [];
  public previewVisible = false;
  public previewImage = '';

  constructor(private financeService: FinanceService, private modal: NzModalRef) {
  }

  ngOnInit() {
  }

  /**
   * 添加平台标准
   */
  addVou() {
    let me = this, uploadedFileAry: Array<any> = [], uploadFileUrl: string = '';
    me.isConfirmLoading = true;
    uploadedFileAry = me.fileList.filter(item => {
      return item.status == 'done';
    });
    uploadedFileAry.forEach(function (value, i) {
      uploadFileUrl += "," + value.response.data;
    });
    uploadFileUrl = uploadFileUrl.substring(1);
    me.validateForm.url = uploadFileUrl;
    me.validateForm.id = me.data.id;
    $.when(me.financeService.updateSettleRecToDone(me.validateForm)).done(res => {
      if (res.success) {
        me.modal.destroy(true);
        me.isConfirmLoading = false;
        me.modal.triggerOk();
      }
    });
  }


  closeWin() {
    this.modal.destroy();
  }

  /**
   * 图片预览
   * @param file
   */
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
}
