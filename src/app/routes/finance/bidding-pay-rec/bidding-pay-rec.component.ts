import {Component, OnInit, ViewChild} from "@angular/core";
import {BiddingPayRecListComponent} from "../bidding-pay-rec-list/bidding-pay-rec-list.component";
import {Setting} from "../../../public/setting/setting";
declare var $: any;
@Component({
  selector: 'app-bidding-pay-rec',
  templateUrl: './bidding-pay-rec.component.html',
  styleUrls: ['./bidding-pay-rec.component.css']
})
export class BiddingPayRecComponent implements OnInit {
  @ViewChild('crList') crList: BiddingPayRecListComponent;
  public payRecState: any = Setting.ENUMSTATE.payRecState;

  constructor() {
  }

  ngOnInit() {
    this.crList.queryPayRecList(1);
  }
}
