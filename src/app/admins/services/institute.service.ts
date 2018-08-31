import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { retry } from 'rxjs/operators/retry';
import { environment } from '../../../environments/environment.prod';
import { Data } from '@angular/router/src/config';

@Injectable()
export class InstituteService {
  url = '';
  res: any;
  user_id: number = null;
  tech_mode = [];

  /* variables for institute reg'n */
  editorFlag = true;
  i_name = '';
  i_type = [];
  instituteId: number = null;
  selCountry: number = null;
  selState: number = null;
  txtCity = '';
  txtSublocation = '';
  txtAdd1 = '';
  txtAdd2 = '';
  txtLandmark = '';
  txtPincode = '';
  logo: string = null
  /* course */
  courseOptions: any;
  courseTable: any = [];
  facTable: any = [];
  facList: any = [];
  courseList: any= [];
  batchTable = [];
  sessionType: any = [
    // { sid: 1, s_value: 'Morning' },
    // { sid: 2, s_value: 'Afternoon' },
    // { sid: 3, s_value: 'Evening' },
  ];
  facultyDetails: any = []
  duration = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;

    
  }


  ClearData() {
    this.user_id = null;
    this.txtCity = '';
    this.txtSublocation = '';
    this.txtAdd1 = '';
    this.txtAdd2 = '';
    this.txtLandmark = '';
    this.txtPincode = '';
    this.tech_mode = [];
    this.editorFlag = true;
    this.logo = null;
    this.i_name = '';
    this.i_type = [];
    this.instituteId = null;
    this.selCountry = null;
    this.selState = null;
    this.courseOptions = [];
    this.courseTable = [];
    this.facTable = [];
    this.courseList;
    this.batchTable = [];
    this.sessionType = [];
    this.facultyDetails = [];
    this.logo = null;
  }


  getDashboardCounts(uid) {
    
    return this.http.get<Data>(this.url + '/institutes/dashboard/' + uid).pipe(
      retry(0), // retry a failed request up to 3 times

    );
  }

  getTeachMode() {
    return this.http.get<Data>(this.url + '/institutes/teachMode').pipe(
      retry(0), // retry a failed request up to 3 times

    );
  }


  getInstituteDetails(uid) {
    return this.http.get<Data>(this.url + '/institutes/details/' + uid).pipe(
      retry(0), // retry a failed request up to 3 times
    )
  }

  getofferedCourstable(uid) {
    return this.http.get<Data>(this.url + '/institutes/offeredCoursesDetails/' + uid).pipe(
      retry(0), // retry a failed request up to 3 times
    )
  }

  getCourseList(uid) {
    return this.http.get<Data>(this.url + '/institutes/offeredCoursesDrp/' + uid).pipe(
      retry(0), // retry a failed request up to 3 times
    )
  }
  getCourseBYid(cid) {
    return this.http.get<Data>(this.url + '/institutes/courseDetails/' + cid).pipe(
      retry(0), // retry a failed request up to 3 times
    );
  }
  getEnquiryList(uid) {
    return this.http.get<Data>(this.url + '/institutes/enquiry/' + uid).pipe(
      retry(0), // retry a failed request up to 3 times
    )
  }

  getOfferedBatches(uid) {
    return this.http.get<Data>(this.url + '/institutes/offeredBatches/' + uid).pipe(
      retry(0), // retry a failed request up to 3 times
    );
  }
  getBatchBYid(bid) {
    return this.http.get<Data>(this.url + '/institutes/batchDetails/' + bid).pipe(
      retry(0), // retry a failed request up to 3 times
    );
  }

  getFacultyList(uid) {
    return this.http.get<Data>(this.url + '/institutes/facultyList/' + uid).pipe(
      retry(0), // retry a failed request up to 3 times
    );
  }
  getFacultydrp(uid) {
    return this.http.get<Data>(this.url + '/institutes/facultyDrp/' + uid).pipe(
      retry(0), // retry a failed request up to 3 times
    );
  }
  getFacultyBYid(fid) {
    return this.http.get<Data>(this.url + '/institutes/facultyDetails/' + fid).pipe(
      retry(0), // retry a failed request up to 3 times
    );
  }
  getGalleryList(uid) {
    return this.http.get<Data>(this.url + '/institutes/gallery/' + uid).pipe(
      retry(0), // retry a failed request up to 3 times
    );
  }

  // post api
  /* institute register */
  PostRegisterInstitute(options) {
    return this.http.post(this.url + '/institutes/register', options)
      .pipe(
      retry(1)
      );
  }
  postCourseDetails(options) {
    return this.http.post(this.url + '/institutes/course', options)
      .pipe(
      retry(1)
      );
  }
  postBatch(options) {
    return this.http.post(this.url + '/institutes/addBatch', options)
      .pipe(
      retry(1)
      );
  }
  postNewFaculty(options) {
    return this.http.post(this.url + '/institutes/addFaculty/', options)
      .pipe(
      retry(0)
      );
  }

  postInstituteGallery(options) {
    return this.http.post(this.url + '/institutes/gallery', options)
      .pipe(
      retry(1)
      );
  }

  /*put api */
  putAbout(options) {
    return this.http.put(this.url + '/institutes/about', options)
      .pipe(
      retry(1)
      );
  }
  putUrls(options) {
    return this.http.put(this.url + '/institutes/urls', options)
      .pipe(
      retry(1)
      );
  }
  putInstituteLogo(options) {
    return this.http.put(this.url + '/institutes/logo', options)
      .pipe(
      retry(1)
      );
  }

  putCourseById(options) {
    return this.http.put(this.url + '/institutes/updateCourse', options)
      .pipe(
      retry(1)
      );
  }

  putBatchbyId(options) {
    return this.http.put(this.url + '/institutes/updateBatch/', options)
      .pipe(
      retry(1)
      );
  }
  putFacultybyId(options) {
    return this.http.put(this.url + '/institutes//facultyUpdate/', options)
      .pipe(
      retry(0)
      );
  }
  PutInstitutebyId(options) {
    return this.http.put(this.url + '/institutes/updateDetails', options)
      .pipe(
      retry(1)
      );
  }

  updateFacultyStatus(options) {
    // data.fid, data.status
    return this.http.put(this.url + '/institutes/facultyStatus', options)
      .pipe(
      retry(1)
      );
  }

  updateCourseStatus(options) {
    // data.cid, data.status
    return this.http.put(this.url + '/institutes/courseStatus', options)
      .pipe(
      retry(1)
      );
  }

  updateBatchStatus(options) {
    // data.bid, data.status
    return this.http.put(this.url + '/institutes/batchStatus', options)
      .pipe(
      retry(1)
      );
  }

  updateGalleryTitles(options) {
    return this.http.put(this.url + '/institutes/addGalleryTitle', options)
      .pipe(
      // retry(1)
      );
  }
  /* delete Api */
  deleteCourseById(cid) {
    return this.http.delete(this.url + '/institutes/course/' + cid)
      .pipe(
      retry(1)
      );
  }

  deleteGalleryImage(id) {
    return this.http.delete(this.url + '/institutes/gallery/' + id)
      .pipe(

      );
  }

  /* alerts and console log */
  instituealert(content: string) {
    alert(content);
  }
  consolecontent(content: any) {
    console.log(content);
  }
}
