import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";


import {AppComponent} from "./app.component";
import {MainComponent} from "./layout/main/main.component";
import {SimpleComponent} from "./layout/simple/simple.component";
import {PageComponent} from "./layout/page/page.component";
import {PublicModule} from "./public/public.module";
import {SharedModule} from "./shared/shared.module";
import {CookieOptions, CookieService} from "angular2-cookie/core";
import {RoutesModule} from "./routes/routes.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SimpleComponent,
    PageComponent
  ],
  imports: [
    RoutesModule,
    BrowserModule,
    PublicModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
  ],
  providers: [
    CookieService,//Cookie储存
    {provide: CookieOptions, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
