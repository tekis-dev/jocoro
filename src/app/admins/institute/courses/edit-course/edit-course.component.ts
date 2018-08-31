import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {


  @ViewChild('courseForm') courseForm: ElementRef;


  constructor(public commonserObj: CommonService,
    private router: Router,
    private route:ActivatedRoute
  ) {

  }
  ngOnInit() {
    this.commonserObj.breadcrum = 'Edit Course';

  }
  onedit(f) {
   f.form.enable();
  }
  goBack(){
    this.router.navigate(['../../list'],{relativeTo:this.route})
  }
}
