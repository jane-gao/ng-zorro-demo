import {Component, OnInit} from "@angular/core";
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {ActivatedRoute, Router} from "@angular/router";
import {AnnounceService} from "../announce.service";
import {Location} from "@angular/common";
declare var $: any;

@Component({
  selector: 'app-announce-edit',
  templateUrl: './announce-edit.component.html',
  styleUrls: ['./announce-edit.component.css']
})
export class AnnounceEditComponent implements OnInit {
  validateForm: any = {};                   //表单
  ngValidateStatus = Util.ngValidateStatus;//表单项状态
  ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  valitateState: any = Setting.valitateState;//表单验证状态
  public path: string;//路由

  constructor(public router: Router,
              public route: ActivatedRoute,
              public announceService: AnnounceService,
              public location: Location) {
  }

  ngOnInit() {
    const me = this;
    me.route.url.subscribe(paths => {
        me.path = paths[0].path;
        if (me.path === 'update') me.getAnnounceById();
      }
    )
  }

  /**
   * 获取公告信息
   */
  getAnnounceById() {
    let me = this, id = me.route.snapshot.queryParams['id'];
    $.when(AnnounceService.getAnnounceById(id)).done(data => {
      if (data) {
        if (data.state == Setting.ENUMSTATE.announceState.online) data.state = true;
        else data.state = false;
        if (data.isTop == Setting.ENUMSTATE.yes) data.isTop = true;
        else data.isTop = false;
        me.validateForm = data;
      }
    })
  }

  back() {
    this.location.back();
  }

  /**
   * 创建公告
   */
  submitAnnounceForm() {
    let me = this;
    let formValue = Object.assign({}, this.validateForm);
    formValue.endTime = Util.dataFormat(formValue.endTime, 'yyyy-MM-dd HH:mm:ss');
    switch (me.path) {
      case "add":  //创建公告
        me.announceService.createAnnounce(formValue);
        break;
      case "update":  //修改公告
        me.announceService.updateAnnounce(formValue);
        break;
    }
  }

}
