import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

// import { CommonService } from '../../services/common.service';
// import { MasterService } from '../../services/master.service';
// import { AlertsService } from '../../services/alerts.service';
// import { ErrorHandlerService } from '../../services/ErrorHandlerService.service';
// import { InstituteService } from '../institute.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports:[
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    
  ],
  providers: [
    // CommonService,  
    // MasterService,  
    // AlertsService,
    // ErrorHandlerService,
    // InstituteService
 ]
})
export class SharedmodulesModule { }
