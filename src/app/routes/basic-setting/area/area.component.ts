import { Component, OnInit } from '@angular/core';
import {Page} from "../../../public/util/page";

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  public dictionaryValue: Page = new Page();        //列表
  public _loading: boolean = false;                 //是否加载中

  constructor() { }

  ngOnInit() {
  }

}
