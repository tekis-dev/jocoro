import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { retry } from 'rxjs/operators/retry';


@Injectable()
export class JobsService {

  uid: any = null;
  url = '';
  jobsList = [];
  selectedSkillSet = [];
  jobId: number = null;
  btnText = "";

  from = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,];
  to = [{ id: 1, disabled: false },
  { id: 2, disabled: false },
  { id: 3, disabled: false },
  { id: 4, disabled: false },
  { id: 5, disabled: false },
  { id: 6, disabled: false },
  { id: 7, disabled: false },
  { id: 8, disabled: false },
  { id: 9, disabled: false },
  { id: 10, disabled: false },
  { id: 11, disabled: false },
  { id: 12, disabled: false },
  { id: 13, disabled: false },
  { id: 14, disabled: false },
  { id: 15, disabled: false },
  { id: 20, disabled: false },
  { id: 25, disabled: false },
  { id: 30, disabled: false }
  ];

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
    // this.url = 'http://localhost:3000';
    if (localStorage.length > 0 && localStorage.getItem('token')) {
      this.uid = localStorage.getItem('userId');
    } else {

    }
    console.log(this.uid, localStorage.getItem('userId'));
  }
  clearData() {
    this.uid = null;
    this.jobsList = [];
    this.selectedSkillSet = [];
    this.jobId = null;
    this.btnText = "";
  }
  getjobsList(uid) {
    return this.http.get(this.url + '/jobs/list/' + uid).pipe(
      retry(0),
    );
  }

  getjobsDetails(jid) {
    return this.http.get(this.url + '/jobs/jobdetails/' + jid).pipe(
      retry(0),
    );
  }

  getmasterData() {
    return this.http.get(this.url + '/jobs/jobsmasterdrp').pipe(
      retry(0),
    );
  }

  postJob(options) {
    return this.http.post(this.url + '/jobs/job', options).pipe(
      retry(0),
    );
  }
  putJobbyId(options) {
    return this.http.put(this.url + '/jobs/jobupdate', options).pipe(
      retry(0),
    );
  }
  updatejobStatus(options) {
    return this.http.put(this.url + '/jobs/jobstatus', options).pipe(
      retry(0),
    );
  }
}
