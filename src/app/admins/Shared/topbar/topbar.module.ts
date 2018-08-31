import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    // SharedmodulesModule
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    TopbarComponent
  ],
  exports:[
    TopbarComponent
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TopbarModule { 

}
