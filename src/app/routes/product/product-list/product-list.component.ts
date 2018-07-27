import {Component, Input, OnInit} from "@angular/core";
import {isNullOrUndefined} from "util";
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {Page} from "../../../public/util/page";
import {NzNotificationService} from "ng-zorro-antd";
import {ProductService} from "../product.service";
import {AjaxService} from "../../../public/service/ajax.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {Util} from "../../../public/util/util";
declare var $: any;
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public _loading: boolean = false;                 //是否加载中
  @Input('state') state: string = '';
  public searchParams: any = {};  //搜索参数
  public queryParams: any = {};   //查询参数
  public page: Page = new Page();  //支付记录分页对象
  public enums = Setting.ENUM;
  public subject = MainService.getEnumDataList(this.enums.platSubject); //平台会计科目
  public userType = MainService.getEnumDataList(this.enums.userType);  //交易对象类型

  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  constructor(private productService: ProductService, private _notification: NzNotificationService) {
  }


  ngOnInit() {
  }

  /**
   * 查询平台财务流水
   */
  queryProductList(curPage?: number) {
    let me = this;
    me._loading = true;
    if (!isNullOrUndefined(curPage)) me.page.curPage = curPage;//当有页码时，查询该页数据
    me.queryParams = {
      curPage: me.page.curPage, //目标页码
      pageSize: me.page.pageSize, //每页条数
      productCode: me.searchParams.productCode, //产品编码
      productName: me.searchParams.productName, //产品名称
      epCode: me.searchParams.epCode, //企业编码
      custCode: me.searchParams.custCode, //用户编码
      kindId: me.searchParams.kindId, //分类编码
      state: me.state, //状态
    };
    $.when(me.productService.queryProductList(me.queryParams)).always(res => {
      me._loading = false;
      if (res) me.page = res; //赋值
    })
  }

  resetSearch() {
    this.searchParams = {};
    this.queryProductList();
  }

  /**
   * 加载分类对象
   * @param node
   * @param index
   * @returns {Promise<T>}
   */
  public loadKindData(node: any, index: number): PromiseLike<any> {
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
}
