import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule, 
  MatStepperModule, 
  MatFormFieldModule, 
  MatInputModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatMenuModule,
  MatTabsModule,
  MatExpansionModule, 
  MatTableModule,
  MatRadioModule,
  MatChipsModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatSortModule,
  MatPaginatorModule,
  MatDividerModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
} from '@angular/material';
// import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    // FlexLayoutModule,
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule,

    MatAutocompleteModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],  
  exports: [
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    MatSelectModule,
    MatChipsModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDividerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
    // FlexLayoutModule 
  ],
  
})
export class MaterialModule { }