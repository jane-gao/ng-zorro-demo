import {Component, OnInit} from "@angular/core";
import {PlatNormService} from "../plat-norm.service";
import {Setting} from "../../../public/setting/setting";
import {SettingUrl} from "../../../public/setting/setting_url";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
declare var $: any;

@Component({
  selector: 'app-norm-value',
  templateUrl: './norm-value.component.html',
  styleUrls: ['./norm-value.component.css']
})
export class NormValueComponent implements OnInit {
  public normParamList: Array<any> = [];
  public _loading: boolean = false;                 //是否加载中
  public isShowAddBtn: boolean = true;     //是否显示当前组件
  public enumState: any = Setting.ENUMSTATE;
  public routerLinks: any = SettingUrl.ROUTERLINK;
  public editCache = {};
  public curNorm: any = {};


  constructor(public platNormService: PlatNormService, public route: ActivatedRoute, public location: Location,) {
  }

  ngOnInit() {
    this.curNorm.normName = this.route.snapshot.queryParams['normName'];
    this.curNorm.normCode = this.route.snapshot.queryParams['normCode'];
    this.getNormParams()
  }


  /**
   * 获取标准参数
   */
  getNormParams() {
    let me = this;
    me._loading = true; //锁屏
    me.normParamList = [];
    $.when(me.platNormService.loadParamByNormCode(me.curNorm.normCode)).always(res => {
      me._loading = false; //解除锁屏
      if (res) {
        me.normParamList = res;
        me.updateEditCache();
      } //赋值
    })
  }

  /**
   * 更新editCache
   */
  updateEditCache() {
    this.normParamList.forEach(item => {
      item.isNecessary = item.isNecessary == this.enumState.yes ? true : false;
      item.isRequired = item.isRequired == this.enumState.yes ? true : false;
      item.isUse = item.isUse == this.enumState.yes ? true : false;
      if (!this.editCache[item.id]) {
        this.editCache[item.id] = {
          edit: false,
          data: item
        };
      }
    });
  }

  /**
   * 保存修改
   * @param id
   */
  saveEdit(id: string): void {
    let me = this;
    const index = this.normParamList.findIndex(item => item.id === id);
    let data = Object.assign({}, this.editCache[id].data);//提交之前需要转换，为了提交之后直接替换新数据，修改的数据对象应重新创建
    data.isNecessary = data.isNecessary ? me.enumState.yes : me.enumState.no;
    data.isRequired = data.isRequired ? me.enumState.yes : me.enumState.no;
    data.isUse = data.isUse ? me.enumState.yes : me.enumState.no;
    $.when(me.platNormService.upPlatNormParam(data)).always(res => {
      if (res) {
        this.normParamList[index] = this.editCache[id].data;//成功后替换数据
        this.editCache[id].edit = false;
      }
    })
  }

  startEdit(id) {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    this.editCache[id].edit = false;
  }

  /**
   * 修改是否强制
   * @param paramCode
   * @param enable
   */
  upState(paramCode, enable, type) {
    let me = this, data = {
      paramCode: paramCode,
      isNecessary: type === 'isNecessary' ? enable ? Setting.ENUMSTATE.yes : Setting.ENUMSTATE.no : null,
      isRequired: type === 'isRequired' ? enable ? Setting.ENUMSTATE.yes : Setting.ENUMSTATE.no : null,
      isUse: type === 'isUse' ? enable ? Setting.ENUMSTATE.yes : Setting.ENUMSTATE.no : null,
    };
    $.when(me.platNormService.upPlatNormParamStateByCode(data)).always(res => {
      if (!res) me.getNormParams(); //不成功刷新列表，可以重置switch
    })
  }

  /**
   * 删除一个参数
   */
  delParam(code) {
    let me = this, data = {
      normCode: me.curNorm.normCode,
      paramCode: code
    };
    $.when(me.platNormService.deletePlatNormParam(data)).always(res => {
      if (res) {
        const index = this.normParamList.findIndex(item => item.paramCode === code);
        me.normParamList.splice(index, 1);
      }
    })
  }


  /**
   *
   * @param event
   */
  activate(event) {
    this.isShowAddBtn = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.isShowAddBtn = true;
    if (event.refresh) this.getNormParams();
  }

  /**
   * 返回
   */
  back() {
    this.location.back()
  }

}
