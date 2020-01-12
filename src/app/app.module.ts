import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { InfoPageComponent } from './info-page/info-page.component';
import {SharedModule} from './shared/components/shared.modules';
import {FormsModule} from '@angular/forms';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    UsersPageComponent,
    InfoPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    jqxChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
