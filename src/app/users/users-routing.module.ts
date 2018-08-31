import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebViewLayoutComponent } from './web-view-layout.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path:'',
    component: WebViewLayoutComponent,
    children: [
      {
        path:'',
        component: LandingComponent
      },
      {
        path:'institute/:insituteName',
        loadChildren: '../institute-view/institute-view.module#InstituteViewModule'

      },
      {
        path:'hostel',
        loadChildren: '../hostel-view/hostel-view.module#HostelViewModule'

      },
      /*{
        path:'jobs',
        loadChildren: '../jobs-view/jobs-view.module#JobsViewModule'

      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
export const UsersComponents = [
  WebViewLayoutComponent,
  LandingComponent
];

