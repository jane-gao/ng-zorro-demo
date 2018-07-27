import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Setting} from "../../../public/setting/setting";
import {ActivatedRoute} from "@angular/router";
import {FinanceService} from "../finance.service";
import {ProductService} from "../product.service";
import {Page} from "../../../public/util/page";
import {NzNotificationService} from "ng-zorro-antd";
declare var $: any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public productCode: string; //产品编码
  public operation: string = ''; //操作
  public product: any = {};  //结算流水记录
  public enums = Setting.ENUM;

  public audit: any = {};//审核结果
  public isPass: any;
  style = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };

  constructor(private productService: ProductService, public route: ActivatedRoute, public location: Location, public _notification: NzNotificationService) {
  }

  ngOnInit() {
    let me = this;
    me.productCode = this.route.snapshot.queryParams['productCode'];
    me.operation = this.route.snapshot.queryParams['operation'];
    if (me.productCode) {
      $.when(me.productService.loadProduct(me.productCode)).done(res => {
        me.product = res; //赋值
      });
    }
    if (me.operation == "AUDIT") {
      me.audit.auditResult = "PASS";
    }
  }

  //返回
  back() {
    this.location.back();
  }

  /**
   * 审核企业入驻
   */
  auditProduct() {
    let me = this;
    let data = {
      productCode: me.productCode
    };
    if (me.audit.auditResult = "PASS") {
      data.state = "NORMAL";
    } else {
      data.state = "UNPASS";
    }

    $.when(me.productService.updateState(data)).done(res => {
      if (res.success) {
        me._notification.success("成功提示", "审核操作成功");
        me.back();
      }
    })
  }
}
