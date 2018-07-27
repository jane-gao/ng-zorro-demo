import {Component, OnInit, ViewChild} from '@angular/core';
import {Setting} from "../../../public/setting/setting";
import {ProductListComponent} from "../product-list/product-list.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('all') all: ProductListComponent;
  public productState: any = Setting.ENUMSTATE.productState;

  constructor() {
  }

  ngOnInit() {
    this.all.queryProductList();
  }
}
