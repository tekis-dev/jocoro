import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {map, startWith} from 'rxjs/operators';

import { InstituteService, InstituteModel } from '../../institute-view/service/institute.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {CouresesRes: any[];
  InstituteRes: any[];
  LocationRes: any[];
  searchCategory:number;
  locationOptions: any[];
  instituteOptions: any[];
  courseOptions: any[];
  filteredLocationOptions: SearchString[];
  filteredInstituteOptions: SearchString[];
  filteredCourseOptions: SearchString[];
  ctrl : Observable<any>
  searchKeyword:FormControl = new FormControl();
  filteredOptions: any;
  constructor(
    private router: Router, 
    private instiServObj: InstituteService
  ) { 
    this.searchCategory=0;
    this.getDataList();
  }
  

  
  options:any = [];

  ngOnInit() {
    
     this.ctrl =  this.searchKeyword.valueChanges.pipe(
        startWith(''),
        // map(value => typeof value === 'string' ? value : value.name),
        map(val => this._filter(val))
      );
    

  }

   _filter(name: string) {
    
    if(name != ''){
      const filterValue = name.toLowerCase();
    if(this.searchCategory==0 || this.searchCategory==1){
      this.courseOptions=this.CouresesRes;
      this.filteredCourseOptions=this.courseOptions.filter(option => option.course_name.toLowerCase().indexOf(filterValue) === 0);

    }
     if(this.searchCategory==0 || this.searchCategory==2){
      this.instituteOptions=this.InstituteRes;
      this.filteredInstituteOptions=this.instituteOptions.filter(option => option.institute_name.toLowerCase().indexOf(filterValue) === 0);

    }
     if(this.searchCategory==0 || this.searchCategory==2){
      this.locationOptions=this.LocationRes;
      this.filteredLocationOptions=this.locationOptions.filter(option => option.city_name.toLowerCase().indexOf(filterValue) === 0);
    }
    return this.options;
  }else {
    this.filteredCourseOptions=this.CouresesRes;
    this.filteredInstituteOptions=this.InstituteRes;
    this.filteredLocationOptions=this.LocationRes;
  }
  }
   
  getDataList(){
     this.instiServObj.getInitialData().subscribe(
      (data: InstituteModel) => {
        var res: any = <InstituteModel>data;
        if (res.status === 1) {
          this.CouresesRes = res.data[0];
          this.filteredCourseOptions=this.CouresesRes;
          this.InstituteRes=res.data[1];
          this.filteredInstituteOptions=this.InstituteRes;   
          this.LocationRes=res.data[2];   
          this.filteredLocationOptions=this.LocationRes;
          console.log(this.LocationRes)

        } else {
        }
      },
      (error) => {
         
      }
    );
}

onGetInstitutesList(course_id: number,course_name: string,){
  this.instiServObj.setCourseDetails(course_id,course_name);
  this.router.navigate(['/course',course_name]);
}
onGetInstitutesDetails(inst_id: number,inst_name: string){
  this.instiServObj.setInstituteDetails(inst_id,inst_name);
  this.router.navigate(['/institute',inst_name]);
}

onSearchDrpChange(val:number){
  this.searchCategory = val;

}

}
export interface SearchString {
  name: string;
}

