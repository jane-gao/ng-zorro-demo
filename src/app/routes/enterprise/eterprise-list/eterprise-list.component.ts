import {Component, Input, OnInit} from '@angular/core';
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {Page} from "../../../public/util/page";
import {EnterpriseService} from "../enterprise.service";

@Component({
  selector: 'app-eterprise-list',
  templateUrl: './eterprise-list.component.html',
  styleUrls: ['./eterprise-list.component.css']
})
export class EterpriseListComponent implements OnInit {
  @Input('state') state: string = "";
  public searchParams: any = {};  //搜索参数
  public queryParams: any = {};   //查询参数
  public _loading: boolean = false;                 //是否加载中
  public page: Page = new Page();  //用户分页对象
  public enums = Setting.ENUM;
  public authEnums = MainService.getEnumDataList(this.enums.authState); //用户认证状态枚举集合
  public stateEnums = MainService.getEnumDataList(this.enums.enterpriseState);  //用户状态枚举集合

  public custState = Setting.ENUMSTATE.custState; //用户状态信息
  constructor(private enterpriseService: EnterpriseService) {
  }

  ngOnInit() {
  }

}
