import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstituteService } from '../service/institute.service';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {

  logo = null;
  constructor(  
    private router: Router,
    private route: ActivatedRoute, 
    public instiServObj: InstituteService,
  ) { }

  ngOnInit() {

  }
  onCourseView(cour_id:number, cour_name:string){
    this.instiServObj.setCourseDetails(cour_id,cour_name);
    this.router.navigate([cour_name], {relativeTo: this.route});

  }

}
