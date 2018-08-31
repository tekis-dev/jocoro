import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare let $: any;

@Injectable()
export class InstituteService {
  url: string;
  course_name:string;
  course_id:number;
  institute_id:number;
  institute_name:string;
  
  InstituteDetails:any = [];
  CourseDetails:any = [];
  BatchDetails:any = [];
  BatchDescription:any =[];
  GalleryDetails :any = [];

  teachModeArr  = [];

  
  constructor(private http: HttpClient, private routerobj: Router) { 
      this.url = 'http://122.175.58.27:3000';
    }
    getInitialData() {
      return this.http.get<InstituteModel>(this.url + '/institutes/landingPage1').pipe();
    }
    getInstituteListByCourse(course_name) {
      return this.http.get<InstituteModel>(this.url + '/institutes/instituteListByCourse/' + course_name).pipe();
    }
    getInstituteListByCourseId(course_id) {
      return this.http.get<InstituteModel>(this.url + '/institutes/instituteListById/' + course_id).pipe();
    }
    getInstituteDetailsByName(inst_name) {
      return this.http.get<InstituteModel>(this.url + '/institutes/getInstituteDetailsByName/' + inst_name).pipe();
    }
    getInstituteAllDetailsById(inst_id) {
      return this.http.get<InstituteModel>(this.url + '/institutes/aboutInstitute/' + inst_id).pipe();
    }
    getBatchDetailsById(batch_id) {
      return this.http.get<InstituteModel>(this.url + '/institutes/batchDetails/' + batch_id).pipe();
    }
    getBatchDetailsByCourseId(course_id){

    }
    //set course varibles
    setCourseDetails(cid:number,cname:string){
      let courseObj = { course_id: cid, course_name: cname };
      localStorage.setItem('searchCourse', JSON.stringify(courseObj));
    }
    //set Institute varibles
    setInstituteDetails(iid:number,iname:string){
      let instituteObj = { institute_id: iid, institute_name: iname };
      localStorage.setItem('searchInstitute', JSON.stringify(instituteObj));
    }
    //set Batch varibles
    setBatchDescription(bid:number,bname:string){
      let instituteObj = { batch_id: bid, batch_name: bname };
      localStorage.setItem('searchBatch', JSON.stringify(instituteObj));
    }
    getTeachMode() {
      return this.http.get<InstituteModel>(this.url + '/institutes/teachMode').pipe(
      );
    }
    scrollToTop(el) {
      console.log('scroll to top')
      el.scrollIntoView();
  }
  
}
export class InstituteModel {
  constructor(
  ) { }
}
