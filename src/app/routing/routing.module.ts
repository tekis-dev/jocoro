import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGaurd } from '../services/authGaurd.service';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { InstituteHomeComponent } from '../institute-module/institute-home/institute-home.component';
import { InstituteDashboardComponent } from '../institute-module/institute-dashboard/institute-dashboard.component';
import { InstituteComponent } from '../institute-module/institute/institute.component';
import { InstituteProfileComponent } from '../institute-module/institute-profile/institute-profile.component';
import { InstituteAddCourseComponent } from '../institute-module/institute-add-course/institute-add-course.component';
import { ManageCourseComponent } from '../institute-module/manage-course/manage-course.component';
import { EnquiryComponent } from '../institute-module/enquiry/enquiry.component';
import { DemoScheduleComponent } from '../institute-module/demo-schedule/demo-schedule.component';
import { BatchesComponent } from '../institute-module/batches/batches.component';
import { AddPhotosComponent } from '../institute-module/add-photos/add-photos.component';
import { ViewPhotosComponent } from '../institute-module/view-photos/view-photos.component';
import { AdminHomeComponent } from '../Admin/admin-home/admin-home.component';
import { AdminDashboardComponent } from '../Admin/admin-dashboard/admin-dashboard.component';
import { SiteSettingsComponent } from '../Admin/site-settings/site-settings.component';
import { LogoFaviconComponent } from '../Admin/logo-favicon/logo-favicon.component';
import { EmailUpateComponent } from '../Admin/email-upate/email-upate.component';
import { BasicSettingsComponent } from '../Admin/basic-settings/basic-settings.component';
import { SocialSiteSettingsComponent } from '../Admin/social-site-settings/social-site-settings.component';
import { HostelHomeComponent } from '../hostel-module/hostel-home/hostel-home.component';
import { HostelDashboardComponent } from '../hostel-module/hostel-dashboard/hostel-dashboard.component';
import { JobSearchHomeComponent } from '../job-search-module/job-search-home/job-search-home.component';
import { JobSearchDashboardComponent } from '../job-search-module/job-search-dashboard/job-search-dashboard.component';
import { BatchesEditComponent } from '../institute-module/batches-edit/batches-edit.component';
import { BatchesListComponent } from '../institute-module/batches-list/batches-list.component';
import { BatchesCreateComponent } from '../institute-module/batches-create/batches-create.component';
import { EditCourseComponent } from '../institute-module/edit-course/edit-course.component';
import { FacultydetailsComponent } from '../institute-module/facultydetails/facultydetails.component';
import { AddFacultyComponent } from '../institute-module/add-faculty/add-faculty.component';
import { NavbarComponent } from '../Admin/navbar/navbar.component';
import { PageNotFoundComponent } from '../common/page-not-found/page-not-found.component';
import { OtpConformationComponent } from '../otp-conformation/otp-conformation.component';
import { ForgotPasswordComponent } from '../common/forgot-password/forgot-password.component';
import { ForgotpasswordEmailComponent } from '../common/forgotpassword-email/forgotpassword-email.component';
import { BillingComponent } from '../settings/billing/billing.component';
import { SettingsComponent } from '../settings/settings.component';
import { ProfileComponent } from '../settings/profile/profile.component';
import { TermsConditionsComponent } from '../settings/terms-conditions/terms-conditions.component';
import { HelpComponent } from '../settings/help/help.component';
import { ErrorComponent } from '../common/error/error.component';
import { ChangePasswordComponent } from '../settings/change-password/change-password.component';




const appRoutes: Routes = [
    // { path: 'all-in-one', component:  },  
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'verification/:uniqId', component: OtpConformationComponent },
    { path: 'terms-conditions', component: TermsConditionsComponent },
    { path: 'forgot password', component: ForgotpasswordEmailComponent },
    { path: 'forgot-password/:uid', component: ForgotPasswordComponent },
    { path: 'change-password/:uid', component: ChangePasswordComponent,canActivate: [AuthGaurd]},
    {
        path: 'settings', component: SettingsComponent,
        children: [
            { path: 'profile/:uid', component: ProfileComponent, },
            { path: 'billing/:uid', component: BillingComponent, },
            { path: 'help', component:HelpComponent },
            { path: 'terms-conditions', component: TermsConditionsComponent },
            { path: 'change-password/:uid', component: ChangePasswordComponent},
        ],
        canActivate: [AuthGaurd]
    },
 //:uid
    {
        path: 'institute', component: InstituteHomeComponent,
        children: [
            { path: '', redirectTo: 'institute-dashboard', pathMatch: 'full' },
            { path: 'profile/:uid', component: ProfileComponent},
            { path: 'institute-dashboard', component: InstituteDashboardComponent },
            { path: 'institute-registration', component: InstituteComponent },
            { path: 'institute-edit', component: InstituteProfileComponent },
            { path: 'add-course', component: InstituteAddCourseComponent },
            { path: 'edit-course/:cid', component: EditCourseComponent },
            { path: 'manage-course', component: ManageCourseComponent },
            { path: 'enquiries', component: EnquiryComponent },
            { path: 'faculty Details', component: FacultydetailsComponent },
            { path: 'add faculty', component: AddFacultyComponent },
            { path: 'edit faculty/:fid', component: AddFacultyComponent },
            { path: 'demo-schedule', component: DemoScheduleComponent },
            { path: 'batches-list', component: BatchesListComponent },
            { path: 'batch-create', component: BatchesCreateComponent },
            { path: 'batch-edit/:bid', component: BatchesEditComponent },
            { path: 'add-photos', component: AddPhotosComponent },
            { path: 'view-photos', component: ViewPhotosComponent },
            { path: '**', redirectTo: 'institute-dashboard' }
        ],
        canActivate: [AuthGaurd]
    },
    {
        path: 'admin', component: AdminHomeComponent,
        children: [
            { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
            { path: 'admin-dashboard', component: AdminDashboardComponent },
            {
                path: 'site-settings', component: SiteSettingsComponent,
                children: [
                    // {path:'',redirectTo:'logog-favicon', pathMatch:'full'},
                    { path: 'logog-favicon', component: LogoFaviconComponent },
                    { path: 'update-email', component: EmailUpateComponent },
                    { path: 'basic-settings', component: BasicSettingsComponent },
                    { path: 'social-site-settings', component: SocialSiteSettingsComponent }
                ]
            },

        ],
        // canActivate: [AuthGaurd]
    },
    {
        path: 'hostel', component: HostelHomeComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: HostelDashboardComponent },
        ]
    },
    {
        path: 'jobs', component: JobSearchHomeComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: JobSearchDashboardComponent },
        ]
    },
    { path: '**', redirectTo: '/404' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),

    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}