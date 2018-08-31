import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstituteService, InstituteModel } from '../service/institute.service';
import { PagerService } from '../../service/pager.service';
// import { PagerService } from '../../../service/pager.service';

@Component({
  selector: 'app-institute-list',
  templateUrl: './institute-list.component.html',
  styleUrls: ['./institute-list.component.css']
})
export class InstituteListComponent implements OnInit {

  course_name: string;
  InstituteListRes: any;
  courseItem:any;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    public instiServObj: InstituteService,
    private pagerService: PagerService
  ) {
    this.route.params
      .subscribe(params => {
        this.course_name = params.course_name;
      });
      this.courseItem=JSON.parse(localStorage.getItem('searchCourse'));
    //this.route.params.subscribe( params => console.log(params) );
  }
  // array of all items to be paged
  private allItems: any[];      // pager object
      pager: any = {};      // paged items
      pagedItems: any[]; 
  ngOnInit() {
    this.instiServObj.getInstituteListByCourseId(this.courseItem.course_id).subscribe(
      (data: InstituteModel) => {
        var res: any = < InstituteModel > data;
        if (res.status === 1) {
          // set items to json response
          this.allItems = res.data[0];
          // initialize to page 1
          this.setPage(1);
          this.InstituteListRes = res.data[0];
        } else {

        }
      },
      (error) => {

      }
    )            
  }     
  setPage(page: number) {         
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);          
    // get current page of items        
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);    
  }

  onGetCourseDetails(inst_id:number, inst_name:string){
    this.instiServObj.setInstituteDetails(inst_id,inst_name);
    this.instiServObj.setCourseDetails(this.courseItem.course_id,this.courseItem.course_name);
    this.instiServObj.getInstituteAllDetailsById(inst_id)
    .subscribe(
      (results) => {
        var res:any = results
       if(res.status==1){
         this.instiServObj.InstituteDetails=res.data.instituteDetails;
         this.instiServObj.CourseDetails=res.data.offeredCourses;
         this.instiServObj.BatchDetails=res.data.offeredBatches;
         this.instiServObj.GalleryDetails=res.data.gallery;
         this.router.navigate(['/institute',inst_name,'course',this.courseItem.course_name]);
       }
      }
    );
  }

}
