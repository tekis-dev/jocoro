import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {


  @ViewChild('courseForm') courseForm: ElementRef;


  constructor(public commonserObj: CommonService,private router: Router) {

  }
  ngOnInit() {
    this.commonserObj.breadcrum = 'Edit Course';

  }
  onedit(f) {
   f.form.enable();
  }
  goBack(){
    this.router.navigate(['/institute/manage-course'])
  }
}
