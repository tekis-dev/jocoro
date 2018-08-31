import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';
import { BillingComponent } from './billing/billing.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { HelpComponent } from './help/help.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LogoutComponent } from './logout/logout.component';
import { InstituteRegComponent } from './institute-reg/institute-reg.component';
import { AuthGaurd } from '../services/authGaurd.service';



const routes: Routes = [ {
  
    path: '', component: SettingsComponent, 
    children: [
        { path: '', redirectTo: 'profile', pathMatch: 'full' },
        { path: 'profile', component: ProfileComponent, data: { breadcrumbs: 'Profile' } ,canActivate: [AuthGaurd]},
        { path: 'institute-registration', component: InstituteRegComponent, data: { breadcrumbs: 'Institute Registration' } ,canActivate: [AuthGaurd]},
        { path: 'change-password', component: ChangePasswordComponent, data: { breadcrumbs: 'Change Password' } ,canActivate: [AuthGaurd]},
        { path: 'billing', component: BillingComponent, data: { breadcrumbs: 'Billing' } ,canActivate: [AuthGaurd]},
        { path: 'help', component: HelpComponent, data: { breadcrumbs: 'Help' } ,canActivate: [AuthGaurd]},
        { path: 'terms-conditions', component: TermsConditionsComponent, data: { breadcrumbs: 'Terms & Conditions' } ,canActivate: [AuthGaurd]},
        { path: 'privacy-policy', component: PrivacyComponent, data: { breadcrumbs: 'Privacy & Policy' } ,canActivate: [AuthGaurd]},
        { path: 'logout', component: LogoutComponent}
    ],
    canActivate: [AuthGaurd]
},
  
];
@NgModule({
 
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
