import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstituteViewRoutingModule,InstituteViewComponents } from './institute-view-routing.module';
import { InstituteService } from './service/institute.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InstituteListComponent } from './institute-list/institute-list.component';

@NgModule({
  imports: [
    CommonModule,
    InstituteViewRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    InstituteViewComponents,
    InstituteListComponent
  ],
  providers:[InstituteService]
})
export class InstituteViewModule { }
