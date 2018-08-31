import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';


import { InstituteProfileComponent } from './institute-profile/institute-profile.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { DemoScheduleComponent } from './demo-schedule/demo-schedule.component';
import { AddPhotosComponent } from './add-photos/add-photos.component';
import { ViewPhotosComponent } from './view-photos/view-photos.component';
import { FacultyComponent } from './faculty/faculty.component';
import { FacultydetailsComponent } from './faculty/facultydetails/facultydetails.component';
import { AddFacultyComponent } from './faculty/add-faculty/add-faculty.component';
import { InstituteAddCourseComponent } from './courses/institute-add-course/institute-add-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { CoursesComponent } from './courses/courses.component';
import { ManageCourseComponent } from './courses/manage-course/manage-course.component';
import { BatchesDemosComponent } from './batches-demos/batches-demos.component';
import { BatchesListComponent } from './batches-demos/batches-list/batches-list.component';
import { BatchesCreateComponent } from './batches-demos/batches-create/batches-create.component';
import { BatchesEditComponent } from './batches-demos/batches-edit/batches-edit.component';

import { BatchesComponent } from './batches-demos/batches/batches.component';
import { CourseComponent } from './courses/course/course.component';
import { InstituteRoutingModule } from './institute-routing.module';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import {  FooterModule, TopbarModule, InstituteRegistrationModule, } from '../Shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { DatePipe } from '@angular/common';
import { InstituteComponent } from './institute.component';
import { InstituteDashboardComponent } from './dashboard/dashboard.component';

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
    InstituteRoutingModule,  
    InstituteRegistrationModule,  
    McBreadcrumbsModule.forRoot(),
    TopbarModule,
    FooterModule,
    // SharedmodulesModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    CKEditorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [
    
    BatchesEditComponent,
    BatchesListComponent,
    BatchesCreateComponent,
    CourseComponent,
    EditCourseComponent,
    FacultydetailsComponent,
    AddFacultyComponent,
    ManageCourseComponent,
    EnquiryComponent,
    DemoScheduleComponent,
    BatchesComponent,
    AddPhotosComponent,
    ViewPhotosComponent,

    InstituteProfileComponent,
    InstituteDashboardComponent,
    InstituteAddCourseComponent,
    FacultyComponent,
    CoursesComponent,
    BatchesDemosComponent,
    InstituteComponent,
  ],
  exports: [
   
  ],
  providers: [
    DatePipe,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class InstituteModule { }
