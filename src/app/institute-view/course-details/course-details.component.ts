import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstituteService } from '../service/institute.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseItem:any;
  courseDetailsList=[];
  courseDetails:any={};
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public instiServObj: InstituteService
  ) { 
    
  }

  ngOnInit() {
    this.courseItem = JSON.parse(localStorage.getItem('searchCourse'));
    console.log(this.instiServObj.CourseDetails);
    this.courseDetailsList=this.instiServObj.CourseDetails.filter(x => x.cid == this.courseItem.course_id);
    if(!this.courseDetailsList.length){
      this.router.navigate(['../'],{relativeTo:this.route})
    }else{
      this.courseDetails=this.courseDetailsList[0];
    }
  }

  getOnBatchList(course_id:number){
    /* this.instiServObj.getBatchDetailsByCourseId(course_id).subscribe(
      (data: InstituteModel) => {
        var res: any = <InstituteModel>data;
        if (res.status === 1) {
          this.instiServObj.BatchDescription = res.data[0];
          this.router.navigate(['../batch/details'],{relativeTo:this.route});
        } 
        else {

        }
      },
      (error) => {
         
      }
    );*/
    this.router.navigate(['../../batch/details'],{ relativeTo:this.route});
  }

}
