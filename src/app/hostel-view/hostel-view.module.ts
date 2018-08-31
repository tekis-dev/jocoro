import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { HostelViewRoutingModule, HostelViewComponents } from './hostel-view-routing.module';
import { HostelHomeComponent } from './hostel-home/hostel-home.component';

@NgModule({
  imports: [
    CommonModule,
    ScrollToModule.forRoot(),
    HostelViewRoutingModule
    
  ],
  declarations: [
    HostelViewComponents,
    HostelHomeComponent    
  ]
})
export class HostelViewModule { }

