import {NgModule} from "@angular/core";
import {AnnounceComponent} from "./announce/announce.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {AnnounceEditComponent} from "./announce-edit/announce-edit.component";
import {AnnounceService} from "./announce.service";
import { AnnounceDetailComponent } from './announce-detail/announce-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'list'},
  {path: 'list', component: AnnounceComponent},
  {path: 'add', component: AnnounceEditComponent},
  {path: 'update', component: AnnounceEditComponent},
  {path: 'detail', component: AnnounceDetailComponent},
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [AnnounceComponent, AnnounceEditComponent, AnnounceDetailComponent],
  providers: [AnnounceService]
})
export class AnnounceModule { }
