import {Component, OnInit} from '@angular/core';
import {Page} from "../../../public/util/page";
import {isNullOrUndefined} from "util";
import {AnnounceService} from "../announce.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {Setting} from "../../../public/setting/setting";
declare var $: any;

@Component({
  selector: 'app-announce',
  templateUrl: './announce.component.html',
  styleUrls: ['./announce.component.css']
})
export class AnnounceComponent implements OnInit {
  public showList: boolean = true;
  public _loading: boolean = false;            //是否加载中
  public announceList: Page = new Page();        //糖果变动记录
  public routerLinks = SettingUrl.ROUTERLINK;
  public pageMsg = Setting.PAGEMSG;
  public enumState = Setting.ENUMSTATE;


  constructor(public announceService: AnnounceService) {
  }

  ngOnInit() {
    this.queryAnnounceList();
  }

  queryAnnounceList(curPage?) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.announceList.curPage = curPage;//当有页码时，查询该页数据
    me.announceList.params = { //查询参数
      curPage: me.announceList.curPage, //目标页码
      pageSize: me.announceList.pageSize, //每页条数
    }
    $.when(AnnounceService.getAnnounceList(me.announceList.params)).done(res => {
      me._loading = false; //解除锁屏
      if (res.success) me.announceList = res.data; //赋值
    })
  }

  /**
   * 删除公告
   * @param id
   */
  deleteAnnounce(id) {
    let me = this;
    $.when(me.announceService.deleteAnnounce(id)).always(data => {
      if (data) me.queryAnnounceList()
    })
  }

  changeAnnounceTop(event, id) {
    console.log("█ event ►►►", event);
  }

}
