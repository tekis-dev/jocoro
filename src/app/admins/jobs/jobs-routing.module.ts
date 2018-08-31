import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobsDashboardComponent } from './jobs-dashboard/jobs-dashboard.component';
import { JobsComponent } from './jobs.component';
import { JobsListComponent } from './job/jobs-list/jobs-list.component';
import { JobComponent } from './job/job.component';
import { FormComponent } from './job/form/form.component';
import { AddComponent } from './job/add/add.component';
import { EditComponent } from './job/edit/edit.component';



const appRoutes: Routes = [
  {
    path: '', component: JobsComponent, data: { breadcrumbs: 'Jobs' },
    children: [
      { path: '', redirectTo: 'job', pathMatch: 'full'},
      { path: 'dashboard', component: JobsDashboardComponent, data: { breadcrumbs: 'Dashboard' }, },
      {
        path: 'job', component: JobComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: JobsListComponent, data: { breadcrumbs: 'List' }, },
          { path: 'add', component: AddComponent, data: { breadcrumbs: 'Add' }, },
          { path: 'edit', component: EditComponent, data: { breadcrumbs: 'Edit' } },
        ]
      },
    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(appRoutes),
  ],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
