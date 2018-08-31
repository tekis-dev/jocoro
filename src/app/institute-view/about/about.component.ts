import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InstituteService } from '../service/institute.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  aboutInstitute: any;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    public instiServObj: InstituteService
  ) { 
  }

  ngOnInit() {
    this.aboutInstitute=this.instiServObj.InstituteDetails;
  }
  onCourseView(cour_id:number, cour_name:string){
    this.instiServObj.setCourseDetails(cour_id,cour_name);
    this.router.navigate(['../course',cour_name], {relativeTo: this.route});
  }

}
