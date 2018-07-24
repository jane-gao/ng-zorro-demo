import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {isNullOrUndefined} from "util";
import {EnterpriseService} from "../enterprise.service";
import {ActivatedRoute} from "@angular/router";
import {Setting} from "../../../public/setting/setting";
import {NzNotificationService} from "ng-zorro-antd";
declare var $: any;

@Component({
  selector: 'app-enterprise-detail',
  templateUrl: './enterprise-detail.component.html',
  styleUrls: ['./enterprise-detail.component.css']
})
export class EnterpriseDetailComponent implements OnInit {
  public refresh: boolean = false;//是否审核，以此判断父页面是否需要刷新
  public epCode: string = '';//企业编码
  public operation: string = ''; //操作
  public epJoinInfo: any = {};     //企业入驻信息
  public epRecords: Array<any> = [];//企业入驻审核记录
  public enums = Setting.ENUM;

  public audit: any = {};//审核结果
  public epAudits = [{value: 'PASS', label: '通过'}, {value: 'UNPASS', label: '不通过'}];
  public isPass: any;
  style = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };

  constructor(private enterpriseService: EnterpriseService, public location: Location, public route: ActivatedRoute, public _notification: NzNotificationService) {
  }

  ngOnInit() {
    let me = this;
    me.epCode = this.route.snapshot.queryParams['epCode'];
    me.operation = this.route.snapshot.queryParams['operation'];
    if (me.epCode) {
      $.when(me.enterpriseService.loadEnterpriseJoin(me.epCode)).always(res => {
        if (res) me.epJoinInfo = res; //赋值
        console.log("epJoinInfo", me.epJoinInfo);
      });

      $.when(me.enterpriseService.queryEnterpriseAuditResList(me.epCode)).always(res => {
        if (res) me.epRecords = res; //赋值
      });

      if (me.operation == "AUDIT") {
        me.audit.auditResult = "PASS";
      }
    }
  }

  //返回
  back() {
    this.location.back();
  }

  /**
   * 审核企业入驻
   */
  auditEnterprise() {
    let me = this;
    let data = {
      epCode: me.epCode,
      auditResult: me.audit.auditResult,
      opinion: me.audit.opinion
    };
    $.when(me.enterpriseService.auditEnterprise(data)).always(res => {
      if (res.success) {
        me._notification.success("成功提示", "审核操作成功");
        me.back();
      }
    })
  }
}
