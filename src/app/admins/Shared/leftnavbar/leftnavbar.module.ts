import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftnavbarComponent } from './leftnavbar.component';
import { CommonService } from '../../services/common.service';
import { MasterService } from '../../services/master.service';
import { AlertsService } from '../../services/alerts.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LeftnavbarComponent
  ],
  exports:[
    LeftnavbarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // providers: [
  //     CommonService,  MasterService,  AlertsService
  //  ],
})
export class LeftnavbarModule { }
