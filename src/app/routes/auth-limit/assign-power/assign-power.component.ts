import {Component, OnInit, ViewChild} from '@angular/core';
import {NzFormatEmitEvent, NzTreeComponent, NzTreeNode} from "ng-zorro-antd";
import {Location} from "@angular/common";
import {Setting} from "../../../public/setting/setting";
import {AuthLimitService} from "../auth-limit.service";
import {ActivatedRoute} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-assign-power',
  templateUrl: './assign-power.component.html',
  styleUrls: ['./assign-power.component.css']
})
export class AssignPowerComponent implements OnInit {
  @ViewChild('nzTree') nzTree: NzTreeComponent;
  public showWindow: boolean = true;
  public menu = Setting.MENUS;
  public refresh: boolean = false;
  public disabledBtn: boolean = true;
  public checkedKeys = [];
  public nodes = [];
  public roleName: string = '';
  public roleCode: string = '';


  constructor(public location: Location,
              public route: ActivatedRoute,
              private authLimitService: AuthLimitService) {
  }

  ngOnInit() {
    this.roleName = this.route.snapshot.queryParams['name'];
    this.roleCode = this.route.snapshot.queryParams['code'];
    if (this.roleCode) {
      this.getLimitList();
    }
  }

  /**
   * 获取角色已分配的菜单列表
   */
  getLimitList() {
    let data = {roleCode: this.roleCode};
    $.when(AuthLimitService.getLimitList(data)).done(res => {
      if (res) {
        this.getHadMenusKey(res.MENU);//获取已经有的菜单key
        this.transTreeDatas(res.MENU);//将菜单转换成NzTreeNode
      }
    })
  }

  /**
   * 获取已经有的菜单key
   * @param menus
   */
  getHadMenusKey(menus) {
    menus.forEach(one => {
      if (one.subLimitList) {
        one.subLimitList.forEach(two => {
          if (two.isHas === Setting.ENUMSTATE.yes) this.checkedKeys.push(two.limitCode);
        })
      }
      if (one.isHas === Setting.ENUMSTATE.yes) this.checkedKeys.push(one.limitCode);
    })
    if (this.checkedKeys.length > 0) this.disabledBtn = false;
  }

  /**
   * 当CheckBox状态改变时判断是否有被选中节点
   */
  mouseAction(): void {
    if (this.getCheckedNodeCode().length < 1) this.disabledBtn = true;
    else this.disabledBtn = false;
  }


  /**
   * 将菜单转换成树节点数据格式
   */
  transTreeDatas(menus) {
    this.nodes = menus.map(one => {
      if (one.subLimitList) {
        one.children = one.subLimitList;
        one.children.map(two => {
          if (!two.subLimitList) two.isLeaf = true;
          two.title = two.alias, two.key = two.limitCode;
          return two;
        })
      } else {
        one.isLeaf = true;
      }
      one.title = one.alias, one.key = one.limitCode;
      return new NzTreeNode(one);
    })
  }

  //提交
  add() {
    let limitCodes = this.getCheckedNodeCode().join(',');
    let me = this;
    let data = { //查询参数
      roleCode: this.roleCode,
      limitCodes: limitCodes
    };
    $.when(me.authLimitService.addLimitRelationForRole(data)).always(data => {
      if (data) me.back();
    })
  }

  getCheckedNodeCode() {
    let nodeList = this.nzTree.getCheckedNodeList(), nodeCodeList: Array<string> = [];
    nodeList.forEach(one => {
      nodeCodeList.push(one.key);
      if (one.children) {
        one.children.forEach(two => {
          nodeCodeList.push(two.key);
        })
      }
    })
    return nodeCodeList;
  }


  /**
   * 返回
   */
  back() {
    this.location.back()
  }


}
