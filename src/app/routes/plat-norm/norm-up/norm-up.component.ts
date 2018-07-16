import {Component, Input, OnInit} from "@angular/core";
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {PlatNormService} from "../plat-norm.service";
import {NzModalRef} from "ng-zorro-antd";
import {SettingUrl} from "../../../public/setting/setting_url";
import {AjaxService} from "../../../public/service/ajax.service";
declare var $: any;

@Component({
  selector: 'app-norm-up',
  templateUrl: './norm-up.component.html',
  styleUrls: ['./norm-up.component.css']
})
export class NormUpComponent implements OnInit {
  public validateForm: any = {};                   //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public isConfirmLoading: boolean = false;            //是否加载中
  public enumState: any = Setting.ENUMSTATE;
  @Input('normCode') normCode: string;

  constructor(public platNormService: PlatNormService,
              private modal: NzModalRef) {
  }

  ngOnInit() {
    this.loadNormByNormCode();
  }

  /**
   * 获取某个标准信息
   * @param id
   */
  loadNormByNormCode() {
    let me = this;
    $.when(me.platNormService.loadNormByNormCode(me.normCode)).always(res => {
      if (res) {
        me.validateForm = res;
        me.validateForm.kindId3 = [res.kindId1, res.kindId2, res.kindId3];
      }
    })
  }

  public loadData(node: any, index: number): PromiseLike<any> {
    return new Promise((resolve) => {
      AjaxService.get({
        url: SettingUrl.URL.kind.queryKindByParentId,
        data: {kindParentId: node.value},
        async: false,
        success: (res) => {
          if (res.success) {
            node.children = [];
            res.data.forEach(item => {
              let obj: any = {};
              obj.value = item.id;
              obj.label = item.kindName;
              obj.isLeaf = !item.haveChildren;
              node.children.push(obj);
            });
          }
        }
      });
      resolve();
    })
  }

  /**
   * 添加平台标准
   */
  addNorm() {
    let me = this;
    me.isConfirmLoading = true;
    me.validateForm.kindId3 = me.validateForm.kindId3[2];
    $.when(me.platNormService.upPlatNorm(me.validateForm)).always(success => {
      if (success) me.modal.destroy(true);
      me.isConfirmLoading = false;
    })
  }

  cancel() {
    this.modal.destroy();
  }

}
