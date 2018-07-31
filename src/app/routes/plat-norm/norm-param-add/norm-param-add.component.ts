import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {PlatNormService} from "../plat-norm.service";
import {Setting} from "../../../public/setting/setting";
import {ActivatedRoute} from "@angular/router";
import {PatternService} from "../../../public/service/pattern.service";
declare var $: any;

@Component({
  selector: 'app-norm-param-add',
  templateUrl: './norm-param-add.component.html',
  styleUrls: ['./norm-param-add.component.css']
})
export class NormParamAddComponent implements OnInit {
  public isConfirmLoading: boolean = false;//按钮是否加载状态
  public refresh: boolean = false;//是否需要刷新父页面数据
  public enumState: any = Setting.ENUMSTATE;
  public normParamList: Array<any> = [];
  public normName: string;
  public normCode: string;
  public patterns = PatternService;

  constructor(public location: Location, public route: ActivatedRoute, public platNormService: PlatNormService,) {
  }

  ngOnInit() {
    this.normName = this.route.snapshot.queryParams['normName'];
    this.normCode = this.route.snapshot.queryParams['normCode'];
    this.addNewParam();
  }

  /**
   * 添加新参数
   */
  addNewParam() {
    this.normParamList.push({paramFactor: 1, key: (new Date()).getTime().toString()});
  }

  /**
   * 只能输入正整数
   */
  onlyPositive(target,e){
    if(!PatternService.POSITIVE_REGEXP.test(e)){
      target.value = null;
    }
  }

  /**
   * 提交参数
   */
  addParams() {
    let me = this;
    me.isConfirmLoading = true;
    me.normParamList.forEach(param => {
      param.isNecessary = param.isNecessary ? me.enumState.yes : me.enumState.no;
      param.isRequired = param.isRequired ? me.enumState.yes : me.enumState.no;
      param.isUse = param.isUse ? me.enumState.yes : me.enumState.no;
    });
    let data = {
      normCode: me.normCode,
      paramList: me.normParamList
    }
    $.when(me.platNormService.addPlatNormParam(data)).always(success => {
      me.isConfirmLoading = false;
      if (success) {
        me.back();
        me.refresh = true;
      }
    })
  }

  /**
   * 取消添加某参数
   * @param i
   */
  delParam(i) {
    this.normParamList.splice(i, 1)
  }

  /**
   * 返回
   */
  back() {
    this.location.back()
  }

}
