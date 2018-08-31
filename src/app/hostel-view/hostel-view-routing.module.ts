import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HostelFooterComponent } from './hostelcomponents/hostel-footer/hostel-footer.component';
import { HostelHeaderComponent } from './hostelcomponents/hostel-header/hostel-header.component';
import { HostelViewComponent } from './hostel-view.component';
import { HostelHomeComponent } from './hostel-home/hostel-home.component';
import { HostelGalleryComponent } from './hostelcomponents/hostel-gallery/hostel-gallery.component';
import { HostelFacilitiesComponent } from './hostelcomponents/hostel-facilities/hostel-facilities.component';
import { HostelPriceComponent } from './hostelcomponents/hostel-price/hostel-price.component';
import { HostelAvailabilityComponent } from './hostelcomponents/hostel-availability/hostel-availability.component';
import { HostelFoodComponent } from './hostelcomponents/hostel-food/hostel-food.component';
import { HostelFoodTimesComponent } from './hostelcomponents/hostel-food-times/hostel-food-times.component';
import { HostelContactDetailsComponent } from './hostelcomponents/hostel-contact-details/hostel-contact-details.component';


const routes: Routes = [
  {
    path: '',
    component: HostelViewComponent,
    children: [
      {
        path: '',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HostelHomeComponent
      },
      {
        path: 'gallery',
        component: HostelGalleryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostelViewRoutingModule { }

export const HostelViewComponents=[
  HostelViewComponent,
  HostelHeaderComponent,
  HostelFooterComponent,
  HostelHomeComponent,
  HostelGalleryComponent,
  HostelFacilitiesComponent,
  HostelPriceComponent,
  HostelAvailabilityComponent,
  HostelFoodComponent,
  HostelFoodTimesComponent,
  HostelContactDetailsComponent
]

