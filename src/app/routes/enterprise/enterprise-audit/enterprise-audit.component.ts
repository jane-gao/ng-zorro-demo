import {Component, OnInit, ViewChild} from '@angular/core';
import {EnterpriseJoinListComponent} from "../enterprise-join-list/enterprise-join-list.component";

@Component({
  selector: 'app-enterprise-audit',
  templateUrl: './enterprise-audit.component.html',
  styleUrls: ['./enterprise-audit.component.css']
})
export class EnterpriseAuditComponent implements OnInit {
  @ViewChild('allList') allList: EnterpriseJoinListComponent;

  constructor() {
  }

  ngOnInit() {
    this.allList.queryEnterpriseJoinList(1);
  }

}
