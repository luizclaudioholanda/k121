import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FriendAddComponent } from './friendadd/friendadd.component'
import { FriendListComponent } from './friendlist/friendlist.component'
import { CommonService } from './common/common.service'

@NgModule({
  declarations: [
    AppComponent,
    FriendAddComponent,
    FriendListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
