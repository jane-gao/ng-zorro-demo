import {Component, Input, OnInit} from "@angular/core";
import {OperationService} from "../operation.service";
import {NzModalRef} from "ng-zorro-antd";
declare var $: any;

@Component({
  selector: 'app-kind-brand-bind',
  templateUrl: './kind-brand-bind.component.html',
  styleUrls: ['./kind-brand-bind.component.css']
})
export class KindBrandBindComponent implements OnInit {
  public brandList: Array<any> = [];//所有品牌列表
  public leftbrandList: Array<any> = [];//选中后剩余的品牌列表
  public checkedbrandList: Array<any> = [];//选中的品牌id列表
  public tagHadValue: Array<any> = [];//已经选中的值列表
  public disabledBtn: boolean = false;
  @Input('id') id: string;

  constructor(private operationService: OperationService, private modal: NzModalRef) {
  }

  ngOnInit() {
    this.getBrandsAll();
  }

  /**
   * 通过分类id查询所有品牌
   */
  getBrandsAll() {
    let me = this;
    $.when(me.operationService.getBrandsAll({productKindId: me.id})).then(data => {
      if (data) {
        me.brandList = data;
        me.brandList.forEach(item => {
          if (item.binded) {
            me.tagHadValue.push(item.id);
            me.checkedbrandList.push(item);
          }
          else me.leftbrandList.push(item);
        })
      }
    })
  }

  /**
   * 选择某个品牌时
   * @param item
   */
  onChecked(item, idx) {
    this.tagHadValue.push(item.id);
    this.checkedbrandList.push(item);
    this.leftbrandList.splice(idx, 1);//从未选中的数组中剔除
  }

  afterClose(item) {
    this.leftbrandList.push(item);
    this.checkedbrandList = this.checkedbrandList.filter(one => {
      return one.id != item.id;
    });
    this.tagHadValue = this.tagHadValue.filter(id => {
      return id != item.id;
    });
  }

  /**
   * 关联品牌
   */
  bindBrand() {
    let me = this;
    if (me.tagHadValue.length == 0) {
      me.disabledBtn = true;
    } else {
      let brands = {
        productKindId: me.id,
        productBrandIdStrings: me.tagHadValue.join(',')
      };
      $.when(me.operationService.addRelateBrandAndKind(brands)).then(data => {
        me.modal.destroy(true);
      })
    }
  }

  handleCancel() {
    this.modal.destroy()
  }
}
