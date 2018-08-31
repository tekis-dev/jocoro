import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGaurd } from './services/authGaurd.service';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorComponent } from './error/error.component';
import { OtpConformationComponent } from './otp-conformation/otp-conformation.component';
import { ForgotpasswordEmailComponent } from './forgotpassword-email/forgotpassword-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';




const appRoutes: Routes = [

    { path: '', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: 'error', component: ErrorComponent },
    // { path: 'terms-conditions', component: TermsConditionsComponent },
    { path: 'verification/:uniqId', component: OtpConformationComponent },
    { path: 'forgot password', component: ForgotpasswordEmailComponent },
    { path: 'forgot-password/:uid', component: ForgotPasswordComponent },
    
 
    {
        path: 'settings', loadChildren: './settings/settings.module#SettingsModule',data: { breadcrumbs: 'Settings' },
        canActivate: [AuthGaurd]
    },
    {
        path: 'institute', loadChildren: './institute/institute.module#InstituteModule',
        data: { breadcrumbs: 'Home' }, 
        canActivate: [AuthGaurd]
    },
   
    {
        path: 'preview/:inst_name', loadChildren: '../institute-view/institute-view.module#InstituteViewModule'
        // ,canActivate: [AuthGaurd]
    },
    {
        path: 'jobs', loadChildren: './jobs/jobs.module#JobsModule', data: { breadcrumbs: 'Home' },
        canActivate: [AuthGaurd]
    },
    
    // {
    //     path:'preview/jobs',
    //     loadChildren: '../jobs-view/jobs-view.module#JobsViewModule'
    //   }


   
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes
          ),
    ],
    exports: [RouterModule]
})
export class AdminsRoutingModule { }
