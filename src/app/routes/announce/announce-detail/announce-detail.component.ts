import { Component, OnInit } from '@angular/core';
import {AnnounceService} from "../announce.service";
import {ActivatedRoute} from "@angular/router";
import {Setting} from "../../../public/setting/setting";
import {Location} from "@angular/common";
declare var $: any;

@Component({
  selector: 'app-announce-detail',
  templateUrl: './announce-detail.component.html',
  styleUrls: ['./announce-detail.component.css']
})
export class AnnounceDetailComponent implements OnInit {
  validateForm: any = {};                   //表单

  constructor(public route: ActivatedRoute,public location:Location) { }

  ngOnInit() {
    this.getAnnounceById();
  }

  back() {
    this.location.back();
  }

  /**
   * 获取公告信息
   */
  getAnnounceById() {
    let me = this, id = me.route.snapshot.queryParams['id'];
    $.when(AnnounceService.getAnnounceById(id)).done(data => {
      if (data) {
        me.validateForm = data;
      }
    })
  }

}
