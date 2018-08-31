import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';


import { UsersRoutingModule, UsersComponents } from './users-routing.module';
import { WebViewHeaderComponent } from './WebViewComponents/web-view-header/web-view-header.component';
import { WebViewFooterComponent } from './WebViewComponents/web-view-footer/web-view-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstituteService } from '../institute-view/service/institute.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ScrollToModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    WebViewHeaderComponent,
    WebViewFooterComponent,
    UsersComponents
    ],
    providers:[
      InstituteService
    ]
})
export class UsersModule { }
