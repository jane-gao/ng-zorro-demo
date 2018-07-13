import { Component, OnInit } from '@angular/core';
import {Page} from "../../../public/util/page";
import {isNullOrUndefined} from "util";
import {BasicSettingService} from "../basic-setting.service";
declare var $: any;


@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  public areaList: Array<any> = [];             //列表
  public _loading: boolean = false;              //是否加载中
  public childList: Array<any> = [];              //是否加载中
  public areaParentCode: string;                 //区域编码，查询子集用,初始值0，代表第一级

  constructor(private basicSettingService: BasicSettingService,) { }

  ngOnInit() {
    this.queryChildAreaList()
  }


  /**
   * 查询区域
   * @param callback
   */
  queryAreaPageByParentId(callback?) {
    let me = this;
    me._loading = true; //锁屏
    let params = { //查询参数
      curPage: 1, //目标页码
      pageSize: 500, //每页条数
      area_code: me.areaParentCode,
    }
    $.when(me.basicSettingService.getAreaList(params)).always(res => {
      me._loading = false; //解除锁屏
      if (res) me.areaList = res; //赋值
      if (callback) callback();
    })
  }


  /**
   * 查询子集菜单列表
   */
  queryChildAreaList(areaParentCode?, menuName?, isTit?: boolean) {
    let me = this, num = 0;
    if (areaParentCode) {
      me.areaParentCode = areaParentCode;
      let item = {name: menuName, id: areaParentCode};
      if (!isTit) {//非点击面包屑路径时，添加面包屑
        me.queryAreaPageByParentId(function () {
          me.childList.push(item);
        })
      } //非点击面包屑路径时，添加面包屑
      else { //点击面包屑路径时，提出点击地址后的面包屑路径
        for (var i = 0; i < me.childList.length; i++) {  //获取点击面包屑的路径地址下标
          if (item.id == me.childList[i].id) num = i;
        }
        me.childList.splice(num + 1); //剔除下标后的路径
        me.queryAreaPageByParentId();
      }
    } else {
      me.areaParentCode = null, this.childList = []; //清空子集查询
      me.queryAreaPageByParentId();
    }
  }

  /**
   * 返回上一级分类列表
   */
  goBackMenu() {
    let num = this.childList.length;
    if (num - 2 < 0) this.queryChildAreaList();
    else this.queryChildAreaList(this.childList[num - 2].id, this.childList[num - 2].name, true);
  }

}
