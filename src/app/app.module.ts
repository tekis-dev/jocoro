import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './routing/routing.module';
import { MaterialModule } from './material/material.module';
import { DatePipe } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
/*
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
*/

import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';

import { AuthGaurd } from './services/authGaurd.service';
import { CommonService } from './services/common.service';
import { MasterService } from './services/master.service';
import { InstituteService } from './institute-module/services/institute.service';
import { AlertsService } from './services/alerts.service';
import {  ErrorHandlerService } from './services/ErrorHandlerService.service';

import { DisableControlDirective } from './directives/disable-control.directive';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopbarComponent } from './common/topbar/topbar.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { LeftnavbarComponent } from './common/leftnavbar/leftnavbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { InstituteProfileComponent } from './institute-module/institute-profile/institute-profile.component';
import { InstituteRegistrationComponent } from './institute-module/institute-registration/institute-registration.component';
import { InstituteDashboardComponent } from './institute-module/institute-dashboard/institute-dashboard.component';
import { InstituteAddCourseComponent } from './institute-module/institute-add-course/institute-add-course.component';
import { InstituteHomeComponent } from './institute-module/institute-home/institute-home.component';
import { InstituteComponent } from './institute-module/institute/institute.component';
import { ManageCourseComponent } from './institute-module/manage-course/manage-course.component';
import { EnquiryComponent } from './institute-module/enquiry/enquiry.component';
import { DemoScheduleComponent } from './institute-module/demo-schedule/demo-schedule.component';
import { BatchesComponent } from './institute-module/batches/batches.component';
import { AddPhotosComponent } from './institute-module/add-photos/add-photos.component';
import { ViewPhotosComponent } from './institute-module/view-photos/view-photos.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { SiteSettingsComponent } from './Admin/site-settings/site-settings.component';
import { LogoFaviconComponent } from './Admin/logo-favicon/logo-favicon.component';
import { BasicSettingsComponent } from './Admin/basic-settings/basic-settings.component';
import { EmailUpateComponent } from './Admin/email-upate/email-upate.component';
import { SocialSiteSettingsComponent } from './Admin/social-site-settings/social-site-settings.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { HostelHomeComponent } from './hostel-module/hostel-home/hostel-home.component';
import { JobSearchHomeComponent } from './job-search-module/job-search-home/job-search-home.component';
import { JobSearchDashboardComponent } from './job-search-module/job-search-dashboard/job-search-dashboard.component';
import { HostelDashboardComponent } from './hostel-module/hostel-dashboard/hostel-dashboard.component';
import { BatchesEditComponent } from './institute-module/batches-edit/batches-edit.component';
import { BatchesListComponent } from './institute-module/batches-list/batches-list.component';
import { BatchesCreateComponent } from './institute-module/batches-create/batches-create.component';
import { CourseComponent } from './institute-module/course/course.component';
import { EditCourseComponent } from './institute-module/edit-course/edit-course.component';
import { FacultydetailsComponent } from './institute-module/facultydetails/facultydetails.component';
import { AddFacultyComponent } from './institute-module/add-faculty/add-faculty.component';
import { NavbarComponent } from './Admin/navbar/navbar.component';
import { OtpConformationComponent } from './otp-conformation/otp-conformation.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';

import { ForgotPasswordComponent } from './common/forgot-password/forgot-password.component';
import { ForgotpasswordEmailComponent } from './common/forgotpassword-email/forgotpassword-email.component';
import { SettingsComponent } from './settings/settings.component';
import { BillingComponent } from './settings/billing/billing.component';
import { TermsConditionsComponent } from './settings/terms-conditions/terms-conditions.component';
import { HelpComponent } from './settings/help/help.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { ErrorComponent } from './common/error/error.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';

// learn more about this from

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
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
  declarations: [
    AppComponent,
    DashboardComponent,
    TopbarComponent,
    BreadcrumbComponent,
    LeftnavbarComponent,
    FooterComponent,
    RegistrationComponent,
    InstituteComponent,
    InstituteProfileComponent,
    InstituteRegistrationComponent,
    InstituteDashboardComponent,
    InstituteAddCourseComponent,
    InstituteHomeComponent,
    LoginComponent,
    ManageCourseComponent,
    EnquiryComponent,
    DemoScheduleComponent,
    BatchesComponent,
    AddPhotosComponent,
    ViewPhotosComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    SiteSettingsComponent,
    LogoFaviconComponent,
    BasicSettingsComponent,
    EmailUpateComponent,
    SocialSiteSettingsComponent,
    HostelHomeComponent,
    JobSearchHomeComponent,
    JobSearchDashboardComponent,
    HostelDashboardComponent,
    BatchesEditComponent,
    BatchesListComponent,
    BatchesCreateComponent,
    CourseComponent,
    EditCourseComponent,
    FacultydetailsComponent,
    AddFacultyComponent,
    NavbarComponent,
    DisableControlDirective,
    OtpConformationComponent,
    PageNotFoundComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    ForgotpasswordEmailComponent,
    SettingsComponent,
    BillingComponent,
    TermsConditionsComponent,
    HelpComponent,
    ErrorComponent,

  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    /*
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
     NgProgressRouterModule,
     */
    NgProgressModule,
    CKEditorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    // api key: 'AIzaSyAeZILvmuIIoLkm2OdAdVwavwUh9rUenW8'
  ],
  providers: [
   { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerService, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    AuthGaurd, CommonService, DatePipe, MasterService, InstituteService, AlertsService,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

