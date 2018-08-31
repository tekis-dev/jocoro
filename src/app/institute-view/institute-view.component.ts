import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InstituteService } from './service/institute.service';


@Component({
  selector: 'app-institute-preview',
  templateUrl: './institute-view.component.html',
  styleUrls: ['./institute-view.component.css']
})
export class InstituteViewComponent implements OnInit {

  inst_name: string;
  instituteItem: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    public instiServObj: InstituteService
  ) {
    this.route.params
      .subscribe(params => {
        this.inst_name = params.inst_name;
      });
    //this.instiServObj.setInstituteDetails();
    this.instituteItem = JSON.parse(localStorage.getItem('searchInstitute'));
    console.log(this.instituteItem, this.inst_name);
    if (this.instituteItem.institute_id) {
      this.instiServObj.getInstituteAllDetailsById(this.instituteItem.institute_id).subscribe(
        (results) => {
          var res: any = results;
          if (res.status == 1) {
            this.instiServObj.InstituteDetails = res.data.instituteDetails;
            this.instiServObj.CourseDetails = res.data.offeredCourses;
            this.instiServObj.BatchDetails = res.data.offeredBatches;
            this.instiServObj.GalleryDetails = res.data.gallery;
          }
        }
      );
    } else {
    }

  }

  ngOnInit() {

  }

  ngDestroy(): void {
    localStorage.setItem('searchCourse', '');
    localStorage.setItem('searchInstitute', '');
    this.instiServObj.InstituteDetails = [];
    this.instiServObj.CourseDetails = [];
    this.instiServObj.BatchDetails = [];
    this.instiServObj.GalleryDetails = [];

  }


}
