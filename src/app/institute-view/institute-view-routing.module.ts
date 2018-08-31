import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstituteViewHeaderComponent } from './institutecomponents/institute-header/institute-header.component';
import { InstituteViewFooterComponent } from './institutecomponents/institute-footer/institute-footer.component';
import { AboutComponent } from './about/about.component';
import { BatchComponent } from './batch/batch.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { BatchDetailsComponent } from './batch-details/batch-details.component';
import { CourseViewComponent } from './course-view/course-view.component';
import { EnquiryViewComponent } from './enquiry-view/enquiry-view.component';
import { InstituteViewComponent } from './institute-view.component';


const routes: Routes = [
  {
    path: '',
    component: InstituteViewComponent,
    children: [
      {
        path: '',
        redirectTo: 'about'
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'course',
        component: CourseViewComponent
      },
      {
        path: 'course/:courseName',
        component: CourseDetailsComponent
      },
      {
        path: 'batch',
        component: BatchComponent
      },
      {
        path: 'batch/:batchName',
        component: BatchDetailsComponent
      },
      {
        path: 'batch/:courseName',
        component: BatchComponent
      },
      {
        path: 'gallery',
        component: GalleryComponent
      },
      {
        path: 'enquiry',
        component: EnquiryViewComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituteViewRoutingModule { }
export const InstituteViewComponents = [
  InstituteViewComponent,
  AboutComponent,
  CourseViewComponent, 
  CourseDetailsComponent, 
  BatchComponent, 
  BatchDetailsComponent,
  GalleryComponent, 
  EnquiryViewComponent,
  InstituteViewHeaderComponent,
  InstituteViewFooterComponent
];
