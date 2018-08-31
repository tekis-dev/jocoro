
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { AdminsComponent } from './admins.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './material/material.module';
import { DatePipe } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';

import { AuthGaurd } from './services/authGaurd.service';
import { CommonService } from './services/common.service';
import { MasterService } from './services/master.service';
import { AlertsService } from './services/alerts.service';
import {  ErrorHandlerService } from './services/ErrorHandlerService.service';
import { InstituteService } from './services/institute.service';

import { DisableControlDirective } from './directives/disable-control.directive';


import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { OtpConformationComponent } from './otp-conformation/otp-conformation.component';



import { ErrorComponent } from './error/error.component';
import { ForgotpasswordEmailComponent } from './forgotpassword-email/forgotpassword-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { FooterComponent } from './Shared/footer/footer.component';
import { TopbarModule, FooterModule, LeftnavbarModule, InstituteRegistrationModule } from './Shared/index';




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
    AdminsComponent,
    DisableControlDirective,
    RegistrationComponent,
    LoginComponent,

    OtpConformationComponent,
    PageNotFoundComponent,
    ForgotPasswordComponent,
    ForgotpasswordEmailComponent,
    ErrorComponent,
   
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    McBreadcrumbsModule.forRoot(),
    TopbarModule,FooterModule,LeftnavbarModule,
    InstituteRegistrationModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    // NgProgressModule,
    CKEditorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    
  ],
  exports:[

  ],
  providers: [
   { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerService, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    AuthGaurd, CommonService, DatePipe, MasterService, InstituteService, AlertsService,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS },
    
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class AdminsModule { }
