import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StateNamePipe} from "../public/pipes/state-name.pipe";
import {ImgPreviewPipe} from "../public/pipes/img-preview.pipe";
import {ImgSizePipe} from "../public/pipes/img-size.pipe";
import {Level2AreaNamePipe} from "../public/pipes/level-2-area-name.pipe";
import {GetWeekPipe} from "../public/pipes/get-week.pipe";
import {ImgErrDirective} from "../public/directives/img-err.directive";
import {StrJsonPipe} from "../public/pipes/str-json.pipe";
import {CKEditorModule} from "ng2-ckeditor";
import {CanStoreProvide} from "../public/provide/can-store-provide";
import {SpliceStrPipe} from "../public/pipes/splice-str.pipe";
import {NgxEchartsModule} from "ngx-echarts";
import {ENgxViewerModule} from "e-ngx-viewer";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,                 //核心模块，必须
    FormsModule,                  //表单支持
    ReactiveFormsModule,          //表单支持
    CKEditorModule,               //富文本编辑器
    NgxEchartsModule,             //echarts
    ENgxViewerModule,
    TranslateModule,
    NgZorroAntdModule.forRoot()   //zorroUI库
  ],
  declarations: [
    StateNamePipe,          //将状态值转为对应状态名得管道
    ImgPreviewPipe,          //本地图片上传预览管道
    ImgSizePipe,             //设置图片大小
    Level2AreaNamePipe,       //12位地区编码转化地区名称管道
    GetWeekPipe,               //根据日期获取周几的管道
    ImgErrDirective,            //图片加载失败时，加载默认图片
    StrJsonPipe,                //后台返回字符转转化为json格式
    SpliceStrPipe                //字符串截取加密
  ],
  providers: [CanStoreProvide],
  exports: [
    CommonModule,           //核心模块，必须
    RouterModule,           //路由依赖模块
    FormsModule,            //表单支持
    ReactiveFormsModule,    //表单支持
    NgZorroAntdModule,      //zorroUI库
    NgxEchartsModule,             //echarts
    TranslateModule,
    StateNamePipe,          //将状态值转为对应状态名得管道
    ImgPreviewPipe,         //本地图片上传预览管道
    ImgSizePipe,            //设置图片大小
    Level2AreaNamePipe,      //12位地区编码转化地区名称管道
    GetWeekPipe,               //根据日期获取周几的管道
    ImgErrDirective,          //图片加载失败时，加载默认图片
    CKEditorModule,         //富文本编辑器
    StrJsonPipe,               //后台返回字符转转化为json格式
    SpliceStrPipe,                //字符串截取加密
    ENgxViewerModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
