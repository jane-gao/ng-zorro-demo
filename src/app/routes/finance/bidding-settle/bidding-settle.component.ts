import {Component, OnInit, ViewChild} from '@angular/core';
import {Setting} from "../../../public/setting/setting";
import {BiddingSettleListComponent} from "../bidding-settle-list/bidding-settle-list.component";

@Component({
  selector: 'app-bidding-settle',
  templateUrl: './bidding-settle.component.html',
  styleUrls: ['./bidding-settle.component.css']
})
export class BiddingSettleComponent implements OnInit {
  @ViewChild('crList') crList: BiddingSettleListComponent;
  public payRecState: any = Setting.ENUMSTATE.payRecState;

  constructor() {
  }

  ngOnInit() {
    this.crList.state = this.payRecState.cr;
    this.crList.querySettleList(1);
  }

}
