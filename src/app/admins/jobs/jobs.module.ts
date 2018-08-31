import { CommonModule } from '@angular/common';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JobsComponent } from './jobs.component';
import { JobComponent } from './job/job.component';
import { JobsRoutingModule } from './jobs-routing.module';
import { MaterialModule } from '../material/material.module';
import { JobsDashboardComponent } from './jobs-dashboard/jobs-dashboard.component';
import { JobsService } from './jobs.service';

import { JobsListComponent } from './job/jobs-list/jobs-list.component';
import { FormComponent } from './job/form/form.component';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { CKEditorModule } from 'ng2-ckeditor';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AddComponent } from './job/add/add.component';
import { EditComponent } from './job/edit/edit.component';

export const MY_NATIVE_FORMATS = {
  fullPickerInput: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },
  datePickerInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
  timePickerInput: { hour: 'numeric', minute: 'numeric' },
  monthYearLabel: { year: 'numeric', month: 'short' },
  dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
  monthYearA11yLabel: { year: 'numeric', month: 'long' },
};

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    JobsRoutingModule,
    FormsModule,
    MaterialModule,
    FormsModule,

    ReactiveFormsModule,
    
    CKEditorModule,
    McBreadcrumbsModule.forRoot(),
  ],
  declarations: [JobsComponent,JobComponent,JobsDashboardComponent, JobsListComponent,FormComponent, AddComponent, EditComponent
    // TopbarComponent,
    
    // LeftnavbarComponent,
    // FooterComponent,
  ],
  providers:[
    JobsService,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class JobsModule { 
  
}
