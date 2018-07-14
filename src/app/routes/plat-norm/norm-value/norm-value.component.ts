import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PlatNormService} from "../plat-norm.service";
import {Setting} from "../../../public/setting/setting";
declare var $: any;

@Component({
  selector: 'app-norm-value',
  templateUrl: './norm-value.component.html',
  styleUrls: ['./norm-value.component.css']
})
export class NormValueComponent implements OnInit, OnChanges {
  public normParamList: Array<any> = [];
  public _loading: boolean = false;                 //是否加载中
  public enumState: any = Setting.ENUMSTATE;
  @Input('curNorm') curNorm: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['curKind']) {
      if (this.curNorm.normCode) this.getNormParams();
    }
  }

  constructor(public platNormService: PlatNormService) {
  }

  ngOnInit() {
  }

  /**
   * 获取标准参数
   */
  getNormParams() {
    let me = this;
    me._loading = true; //锁屏
    $.when(me.platNormService.loadParamByNormCode(me.curNorm.normCode)).always(res => {
      me._loading = false; //解除锁屏
      if (res) me.normParamList = res; //赋值
    })
  }

  /**
   * 修改是否强制
   * @param id
   * @param enable
   */
  changeIsEnable(id, enable) {
    let me = this, data = {
      id: id,
      isUse: enable ? Setting.ENUMSTATE.yes : Setting.ENUMSTATE.no
    };
    $.when(me.platNormService.upPlatNormParamStateByCode(data)).always(res => {
      if (!res) me.getNormParams(); //不成功刷新列表，可以重置switch
    })
  }

  /**
   * 删除一个参数
   */
  delParam(code) {
    let me = this;
    $.when(me.platNormService.deletePlatNormParam(code)).always(res => {
      if (!res) me.getNormParams(); //不成功刷新列表，可以重置switch
    })
  }


}
