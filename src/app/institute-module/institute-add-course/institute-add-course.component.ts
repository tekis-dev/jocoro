import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';

import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-institute-add-course',
  templateUrl: './institute-add-course.component.html',
  styleUrls: ['./institute-add-course.component.css']
})
export class InstituteAddCourseComponent implements OnInit {


  @ViewChild('courseForm') courseForm: ElementRef;

  // form = new FormGroup(
  //   {
  //     'courseName': new FormControl(null, [Validators.required]),
  //     'subcourseName': new FormControl(null),
  //     'mode': new FormControl('1', [Validators.required]),
  //     'qualification': new FormControl(null),
  //     'about': new FormControl('', [Validators.required, Validators.maxLength(250)]),
  //     'months': new FormControl(null),
  //     'days': new FormControl(null),
  //     'fee': new FormControl('1'),
  //     'fixed': new FormControl(null),
  //     'fromRange': new FormControl(null),
  //     'toRange': new FormControl(null),
  //     'logo': new FormControl(null)
  //   }
  // );

  constructor(public commonserObj: CommonService) {
   
  }
  ngOnInit() {
    this.commonserObj.breadcrum = 'Add Course';
    
  }
  onAddCourse(f){
    if(!f.form.valid){

    }else {
      console.log(f);
    }
  }

}
