import {Component, OnInit} from "@angular/core";
import {Page} from "../../../public/util/page";
import {Setting} from "../../../public/setting/setting";
import {Util} from "../../../public/util/util";
import {OperationService} from "../operation.service";
import {NzModalService} from "ng-zorro-antd";
import {isNullOrUndefined} from "util";
import {BrandUpComponent} from "../brand-up/brand-up.component";
import {KindAddComponent} from "../kind-add/kind-add.component";
import {KindUpComponent} from "../kind-up/kind-up.component";
declare var $: any;

@Component({
  selector: 'app-kinds',
  templateUrl: './kinds.component.html',
  styleUrls: ['./kinds.component.css']
})
export class KindsComponent implements OnInit {
  public kindList: Page = new Page();        //列表
  public _loading: boolean = false;                 //是否加载中
  public isConfirmLoading: boolean = false;            //是否加载中
  public validateForm: any = {};                   //表单
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public enumState: any = Setting.ENUMSTATE;
  public kindParentId = 0; //分类编码，查询子集用,初始值0，代表第一级
  public childKindList: Array<any> = []; //菜单级别面包屑

  constructor(private operationService: OperationService,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.queryGoodsKindPageByParentId()
  }

  /**
   * 查询分类
   * @param curPage
   * @param callback
   */
  queryGoodsKindPageByParentId(curPage: number = 1, callback?) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.kindList.curPage = curPage;//当有页码时，查询该页数据
    me.kindList.params = { //查询参数
      curPage: me.kindList.curPage, //目标页码
      pageSize: me.kindList.pageSize, //每页条数
      kindParentId: me.kindParentId,
    }
    $.when(me.operationService.queryGoodsKindPageByParentId(me.kindList.params)).then(res => {
      me._loading = false; //解除锁屏
      if (res) me.kindList = res; //赋值
      if (callback) callback();
    })
  }

  /**
   * 添加分类
   * @param id
   * @param kindName
   * @param level
   */
  addKind(id?, kindName?, level?) {
    let me = this;
    const modal = this.modalService.create({
      nzTitle: '添加分类',
      nzContent: KindAddComponent,
      nzComponentParams: {
        pid: id,
        pKindName: kindName,
        pLevel: level
      },
      nzWidth: '720',
      nzFooter: null
    });
    modal.afterClose.subscribe((result) => {
      if (result) me.queryGoodsKindPageByParentId();
    });
  }

  /**
   * 修改分类
   * @param id
   */
  upKind(id) {
    let me = this;
    const modal = this.modalService.create({
      nzTitle: '修改分类',
      nzContent: KindUpComponent,
      nzComponentParams: {id: id},
      nzWidth: '720',
      nzFooter: null
    });
    modal.afterClose.subscribe((result) => {
      if (result) me.queryGoodsKindPageByParentId();
    });
  }

  /**
   * 删除分类
   * @param id
   */
  delKind(id) {
    let me = this;
    $.when(me.operationService.deleteGoodsKind(id)).then(success => {
      if (success) me.queryGoodsKindPageByParentId();
    })
  }

  /**
   * 修改是否推荐
   * @param id
   * @param event
   */
  changeIsRecommend(id, state) {
    let me = this, data = {
      id: id,
      brandRecommend: state ? Setting.ENUMSTATE.yes : Setting.ENUMSTATE.no
    };
    $.when(me.operationService.updateRecommend(data)).always(res => {
      if (!res) me.queryGoodsKindPageByParentId(); //不成功刷新列表，可以重置switch
    })
  }

  /**
   * 修改状态
   * @param id
   * @param event
   */
  changeIsEnable(id, state) {
    let me = this, data = {
      id: id,
      state: state ? Setting.ENUMSTATE.yes : Setting.ENUMSTATE.no
    };
    $.when(me.operationService.updateBrandState(data)).always(res => {
      if (!res) me.queryGoodsKindPageByParentId(); //不成功刷新列表，可以重置switch
    })
  }

  /**
   * 查询子集分类列表
   */


  /**
   * 查询子集菜单列表
   */
  queryChildKindList(kindParentId?, menuName?, isTit?: boolean) {
    let me = this, num = 0;
    if (kindParentId) {
      me.kindParentId = kindParentId;
      let item = {name: menuName, id: kindParentId};
      if (!isTit) {
        me.queryGoodsKindPageByParentId(null, function () {
          me.childKindList.push(item);
        })
      } //非点击面包屑路径时，添加面包屑
      else { //点击面包屑路径时，提出点击地址后的面包屑路径
        for (var i = 0; i < me.childKindList.length; i++) {  //获取点击面包屑的路径地址下标
          if (item.id == me.childKindList[i].id) num = i;
        }
        me.childKindList.splice(num + 1); //剔除下标后的路径
        me.queryGoodsKindPageByParentId();
      }
    } else {
      me.kindParentId = null, this.childKindList = []; //清空子集查询
      me.queryGoodsKindPageByParentId();
    }
  }

  /**
   * 返回上一级分类列表
   */
  goBackMenu() {
    let num = this.childKindList.length;
    if (num - 2 < 0) this.queryChildKindList();
    else this.queryChildKindList(this.childKindList[num - 2].id, this.childKindList[num - 2].name, true);
  }
}

