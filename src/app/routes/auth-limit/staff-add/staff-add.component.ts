import {Component, OnInit} from "@angular/core";
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {PatternService} from "../../../public/service/pattern.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {AuthLimitService} from "../auth-limit.service";
import {MainService} from "../../../public/service/main.service";
import {UploadFile} from "ng-zorro-antd";
declare var $: any;


@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.css']
})
export class StaffAddComponent implements OnInit {
  public ifRefreshParent: boolean = false;//是否需要刷新父页面数据
  public validateForm: any = {};            //表单
  public path: string;            //当前路由
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public patterns = PatternService;
  public fileList: Array<any> = [];
  public uploadUrl: string = SettingUrl.URL.base.upload;
  public previewImage = '';
  public previewVisible = false;
  public uuid: string;

  constructor(private authLimitService: AuthLimitService,
              public location: Location,
              public route: ActivatedRoute) {
  }

  ngOnInit() {
    let me = this;
    this.uuid = MainService.uploadUid();
    me.route.url.subscribe(paths => {
        me.path = paths[0].path;
        if (me.path === 'up') me.getStaffByCode();
      }
    )
  }

  /**
   * 图片预览
   * @param file
   */
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  /**
   * 根绝用户编码查询详情
   */
  getStaffByCode() {
    let me = this;
    let staffCode = me.route.snapshot.queryParams['staffCode'];
    $.when(me.authLimitService.getStaffByCode({staffCode: staffCode})).then(data => {
      if (data) {
        me.validateForm = data;
        if (data.avatar) {
          me.fileList = [{
            uid: -1,
            name: '头像',
            status: 'done',
            url: data.avatar,
            thumbUrl: data.avatar
          }]
        }
      }
    })
  }

  /**
   * 添加提交表单
   */
  addStaff() {
    let me = this, uploadedFile: Array<any> = [];
    uploadedFile = me.fileList.filter(item => {
      return item.status == 'done';
    })
    if (uploadedFile.length > 0) me.validateForm.uuid = me.uuid;
    $.when(me.authLimitService.addStaff(me.validateForm)).done(res => {
      if (res) {
        me.location.back();
        me.ifRefreshParent = true;
      }//返回上个页面
      Util.hideMask();
    });
  }

  /**
   * 修改提交表单
   */
  upStaff() {
    let me = this, uploadedFile: Array<any> = [];
    uploadedFile = me.fileList.filter(item => {
      return item.status == 'done' && item.uid != -1;//新上传的图片
    })
    if (uploadedFile.length > 0) me.validateForm.uuid = me.uuid;
    $.when(me.authLimitService.upStaff(me.validateForm)).always(res => {
      if (res) {
        me.location.back();
        me.ifRefreshParent = true;
      }//返回上个页面
      Util.hideMask();
    });
  }

  back() {
    this.location.back();
  }

}
