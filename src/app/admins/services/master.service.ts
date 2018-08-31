import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class MasterService {
  url: string;
  navtoggle = false;
  userId = null;
  headerName = '';
  logo: any = null;
  firstName = "";
  lastName = "";
  userName = 'Profile';
  regMobile: number = null;
  regEmail = '';
  token = '';
  userType: number = null;
  moduleCreated: number = null;
  unquikey = '';
  countries: any = [];
  states: Array<any> = [];
  cities: Array<any> = [];
  feeTypes = [];
  sessionType = [];

  httpOptions: any;
  constructor(private http: HttpClient,
    private routerobj: Router
  ) {
    this.url = environment.apiUrl;
    // console.log(localStorage);
    if (localStorage.length > 0 && localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.userId = localStorage.getItem('userId');
      this.userType = parseInt(localStorage.getItem('userType'), 10);
      this.regEmail = localStorage.getItem('regEmail');
      this.regMobile = parseInt(localStorage.getItem('regMobile'), 10);
      this.headerName = localStorage.getItem('headerName');
      if (localStorage.getItem('moduleCreated') != undefined && localStorage.getItem('moduleCreated') != null)
        this.moduleCreated = parseInt(localStorage.getItem('moduleCreated'), 10);
      else
        this.moduleCreated = 0;
      this.logo = localStorage.getItem('logo');
    }

  }
  checkUselogin() {
    if (this.token !== null && this.token !== '' && this.token !== undefined) {
      if (this.userType === 1) {
        this.routerobj.navigate(['dashboard/jobs/job/']);
      } else if (this.userType === 2) {
        this.routerobj.navigate(['dashboard/hostel/dashboard']);
      } else if (this.userType === 3) {
        this.routerobj.navigate(['dashboard/institute/institute-dashboard']);
      } else {
        this.routerobj.navigate(['dashboard/login']);
      }
    } else {
      this.routerobj.navigate(['dashboard/login']);
    }
  }
  clearData() {
    this.navtoggle = false;
    this.userId = null;
    this.headerName = '';
    this.logo = null;
    this.userName = 'Profile';
    this.regMobile = null;
    this.regEmail = '';
    this.token = '';
    this.userType = null;
    this.moduleCreated = null;
    this.unquikey = '';
    this.countries = [];
    this.feeTypes = [];
    this.sessionType = [];
  }


  getheader() {
    return 'Bearer~' + this.token;
  }

  getConutries() {
    return this.http.get<Data>(this.url + '/common/countries').pipe(
      retry(0), // retry a failed request up to 3 times

    );

  }
  getStates(id) {
    return this.http.get<Data>(this.url + '/common/states?country_id=' + id).pipe(
      retry(0),

    );
  }
  // cities
  getCities(id) {
    // id , city_name
    return this.http.get<Data>(this.url + '/common/cities?state_id=' + id).pipe(
      retry(0),

    );
  }
  getFeetypes() {
    return this.http.get<Data>(this.url + '/common/feeTypes').pipe(
      retry(0),
    );
  }
  getSessionTypes() {
    return this.http.get<Data>(this.url + '/common/sessionTypes').pipe(
      retry(0),
    );
  }

  getMasterCourses() {
    return this.http.get<Data>(this.url + '/common/mastercourses').pipe(
      retry(0),
    );
  }
  getcheckEmail(email) {
    return this.http.get<Data>(this.url + '/users/isEmailExists/' + email).pipe(
      retry(0),

    );
  }

  getcheckPhone(no) {
    return this.http.get<Data>(this.url + '/users/isPhoneExists' + no).pipe(
      retry(0),

    );
  }

  getimages(type, name) {
    return this.url + '/common/getImages/' + type + '/' + name
  }


  /* post */

  postRegistration(options) {
    return this.http.post<Data>(this.url + '/users/register/', options).pipe(
      retry(1),
    );
  }

  postuserLogin(options) {
    return this.http.post<Data>(this.url + '/users/signin/', options).pipe(
      retry(0),
    );
  }

  getUserDetails(uid, token) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer~' + this.token
      })
    };

    return this.http.get<Data>(this.url + '/users/details').pipe(
      retry(0),
    );
  }

  getverifyEmail(uid) {
    return this.http.get<Data>(this.url + '/users/verifyEmail/' + uid).pipe(
      retry(0),

    );
  }

  getverifyPhone(uid, otp) {
    return this.http.get<Data>(this.url + '/users/verifyPhone/' + uid + '/' + otp).pipe(
      retry(0),

    );
  }

  putUserUpdate(uid, options) {
    return this.http.put<Data>(this.url + '/users/' + uid, options).pipe(
      retry(0),

    );
  }
  /* forgot and change , reset password  APi*/
  puttForgotEmail(options) {
    return this.http.put<Data>(this.url + '/users/forgotPassword', options).pipe(
      retry(0),

    );
  }

  putResetPassword(options) {
    return this.http.put<Data>(this.url + '/users/passwordReset', options).pipe(
      retry(0),

    );
  }

  putChangePassword(options) {
    return this.http.put<Data>(this.url + '/users/changePassword', options).pipe(
      retry(0),

    );
  }

  putResendOtp(options) {
    return this.http.put<Data>(this.url + '/users/resendOtp', options).pipe(
      retry(0),

    );
  }


  putResendEmail(token) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer~' + this.token
      })
    };

    return this.http.put<Data>(this.url + '/users/resendEmail', {}).pipe(
      retry(0),

    );
  }

  profileUpdate(options) {
    return this.http.put<Data>(this.url + '/users/profileUpdate', options).pipe(
      retry(0),

    );
  }
}


export class Data {
  constructor(
  ) { }
}