import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

import { BillingComponent } from './billing/billing.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { HelpComponent } from './help/help.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { InstituteRegComponent } from './institute-reg/institute-reg.component';

import { LeftnavbarModule, FooterModule, InstituteRegistrationModule } from '../Shared/index';


@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    // SharedmodulesModule,
    FooterModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    InstituteRegistrationModule,
    McBreadcrumbsModule.forRoot(),
    
  ],
  declarations: [
    SettingsComponent,
    BillingComponent,
    TermsConditionsComponent,
    HelpComponent,
    PrivacyComponent,
    ChangePasswordComponent,
    ProfileComponent,
    LogoutComponent,
    InstituteRegComponent,

  ],
 
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class SettingsModule {

 }
