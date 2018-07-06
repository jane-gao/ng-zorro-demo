import {Component} from '@angular/core';
import {Setting} from "./public/setting/setting";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public router: Router, public location: Location) {
  }

  ngOnInit() {
  }
}
