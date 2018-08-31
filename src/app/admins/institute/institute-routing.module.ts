import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

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
import { InstituteComponent } from './institute.component';
import { InstituteDashboardComponent } from './dashboard/dashboard.component';
import { AuthGaurd } from '../services/authGaurd.service';



const appRoutes: Routes = [
    {
        path: '', component: InstituteComponent,
        children: [
            { path: '', redirectTo: 'institute-dashboard', pathMatch: 'full' },
            { path: 'institute-dashboard', component: InstituteDashboardComponent, data: { breadcrumbs: 'Dashboard' } ,canActivate: [AuthGaurd]},
            { path: 'institute-edit', component: InstituteProfileComponent, data: { breadcrumbs: 'Profile' },canActivate: [AuthGaurd] },
            {
                path: 'course', component: CoursesComponent, data: { breadcrumbs: 'Course' },
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: ManageCourseComponent, data: { breadcrumbs: 'List' },canActivate: [AuthGaurd] },
                    { path: 'add', component: InstituteAddCourseComponent, data: { breadcrumbs: 'Add' } ,canActivate: [AuthGaurd]},
                    { path: 'edit/:cid', component: EditCourseComponent, data: { breadcrumbs: 'Edit' } ,canActivate: [AuthGaurd]},
                ],canActivate: [AuthGaurd]
            },
            {
                path: 'faculty', component: FacultyComponent, data: { breadcrumbs: 'Faculty' },
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: FacultydetailsComponent, data: { breadcrumbs: 'Deatils' } ,canActivate: [AuthGaurd]},
                    { path: 'add', component: AddFacultyComponent, data: { breadcrumbs: 'Add' } ,canActivate: [AuthGaurd]},
                    { path: 'edit/:fid', component: AddFacultyComponent, data: { breadcrumbs: 'Edit' } ,canActivate: [AuthGaurd]},
                ],canActivate: [AuthGaurd]
            },
            {
                path: 'batches', component: BatchesDemosComponent, data: { breadcrumbs: 'Batches' },
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: BatchesListComponent, data: { breadcrumbs: 'List' } ,canActivate: [AuthGaurd]},
                    { path: 'add', component: BatchesCreateComponent, data: { breadcrumbs: 'Add' } ,canActivate: [AuthGaurd]},
                    { path: 'edit/:bid', component: BatchesEditComponent, data: { breadcrumbs: 'Edit' } ,canActivate: [AuthGaurd]},
                ],canActivate: [AuthGaurd]
            },
            { path: 'demo-schedule', component: DemoScheduleComponent, data: { breadcrumbs: 'Demo' } ,canActivate: [AuthGaurd]},
            { path: 'enquiries', component: EnquiryComponent ,canActivate: [AuthGaurd]},
            { path: 'add-photos', component: AddPhotosComponent, data: { breadcrumbs: 'Gallery' } ,canActivate: [AuthGaurd]},
            { path: 'view-photos', component: ViewPhotosComponent, data: { breadcrumbs: '' },canActivate: [AuthGaurd] },
        ],canActivate: [AuthGaurd]
    },
]
@NgModule({

    declarations: [],
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class InstituteRoutingModule { }
