import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Setting} from "../../../public/setting/setting";
import {HomeService} from "../home.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {Util} from "../../../public/util/util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public contactUs: Array<any> = [];
  public commonFunctions: Array<any> = [];//常用功能
  public statisticsDatas: Array<any> = [];//统计数据
  public chartOptionOfUserRatio: any;//用户比例
  public chartOptionOfUserRise: any;//用户增长

  constructor() {
  }

  ngOnInit() {
    let _this = this;
    //设置联系我们的信息内容
    _this.setContactUsInfo();
    _this.setCommonFns();
    _this.setStatisticsDatas();
    setTimeout(_ => {
      _this.setChartOptionOfUserRatio();
      _this.setChartOptionOfUserRise();
    })
  }

  /*统计数据*/
  private setStatisticsDatas() {
    this.statisticsDatas = [
      {
        icon: 'iconfont icon-yonghu',
        themeColor: {
          bdColor: 'bd-cyan',
          ftColor: 'color-cyan',
          bgColor: 'bg-cyan'
        },
        data: '2396',
        description: '用户总量'
      },
      {
        icon: 'iconfont icon-tangguo',
        themeColor: {
          bdColor: 'bd-orange',
          ftColor: 'color-orange',
          bgColor: 'bg-orange'
        },
        data: '2302396',
        description: '糖果总量'
      },
      {
        icon: 'iconfont icon-push',
        themeColor: {
          bdColor: 'bd-green',
          ftColor: 'color-green',
          bgColor: 'bg-green'
        },
        data: '6842096',
        description: '算力总量'
      }
    ]
  }

  /*常用功能*/
  private setCommonFns() {
    const routerLinks = SettingUrl.ROUTERLINK;
    this.commonFunctions = [
      {
        icon: "anticon anticon-usergroup-add color-orange",
        info: "管理权限",
        url: routerLinks.staff.list,
        isShow: Util.haveJurisdiction(Setting.MENUS, routerLinks.staff.list)
      },
      {
        icon: "anticon anticon-usergroup-add color-orange",
        info: "管理权限",
        url: routerLinks.staff.list,
        isShow: Util.haveJurisdiction(Setting.MENUS, routerLinks.staff.list)
      },
      {
        icon: "anticon anticon-usergroup-add color-orange",
        info: "管理权限",
        url: routerLinks.staff.list,
        isShow: Util.haveJurisdiction(Setting.MENUS, routerLinks.staff.list)
      }
    ];
  }

  /*用户状态统计表*/
  private setChartOptionOfUserRatio() {
    this.chartOptionOfUserRatio = {
      title: {
        text: '用户账户状态',
        subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['正常', '冻结']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {value: 335, name: '正常'},
            {value: 62, name: '冻结'}
          ],
          color: ['#8378ea', '#e7bcf3'],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  /*用户增长统计*/
  private setChartOptionOfUserRise() {
    this.chartOptionOfUserRise = {
      title: {
        text: '用户总量变化情况',
        subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['新用户']
      },
      color: ['#ff9f7f'],
      toolbox: {
        show: true,
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          name: '时间',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '用户量',
          min: 0,
          max: 1600,
          interval: 400
        }
      ],
      series: [
        {
          name: '用户总数',
          type: 'bar',
          data: [20, 150, 590, 420, 860, 760, 820, 1230, 1287, 896, 801, 265]
        }
      ]
    };
  }

  /**
   * 设置联系我们的信息内容
   */
  private setContactUsInfo() {
    let me = this;
    //联系我们的信息内容
    // Setting.APP.contactInformation.email = HomeService.loadInfoByCode('');
    // Setting.APP.contactInformation.phone = HomeService.loadInfoByCode('');
    Setting.AJAX.errorTip += Setting.APP.contactInformation.phone;
    me.contactUs = [
      {
        icon: "anticon anticon-phone color-pink",
        info: "电话：" + Setting.APP.contactInformation.phone
      },
      {
        icon: "iconfont icon-youxiang color-blue",
        info: "Email：" + Setting.APP.contactInformation.email
      }
    ];
  }

}
