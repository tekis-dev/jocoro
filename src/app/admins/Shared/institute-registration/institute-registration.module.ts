import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstituteRegistrationComponent } from './institute-registration.component';
import { SharedmodulesModule } from '../sharedmodules/sharedmodules.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  imports: [
    CommonModule,
    // SharedmodulesModule
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    CKEditorModule,
    MaterialModule,
  ],
  declarations: [
  InstituteRegistrationComponent
  ],
  exports:[
    InstituteRegistrationComponent
  ],
  schemas:[
    NO_ERRORS_SCHEMA
  ]
})
export class InstituteRegistrationModule { }
