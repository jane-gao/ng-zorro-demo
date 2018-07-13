import { Component, OnInit } from '@angular/core';
import {BasicSettingService} from "../basic-setting.service";

@Component({
  selector: 'app-basic-setting',
  templateUrl: './basic-setting.component.html',
  styleUrls: ['./basic-setting.component.css']
})
export class BasicSettingComponent implements OnInit {

  constructor(private basicSettingService: BasicSettingService,) { }

  ngOnInit() {
  }

}
