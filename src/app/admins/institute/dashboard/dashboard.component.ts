import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from '../../services/common.service';
import { Data, MasterService } from '../../services/master.service';
import { AlertsService } from '../../services/alerts.service';
import { InstituteService } from '../../services/institute.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'institute-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class InstituteDashboardComponent implements OnInit {

  batch_counts: any = {};
  course_counts: any = {};
  faculty_counts: any = {};
  enquiry_counts: any = {};

  constructor(private routerObj: Router, 
    private route:ActivatedRoute,
    public masterObj: MasterService,
    public commonserObj: CommonService,
    private alertObj: AlertsService,
    public instituteserObj: InstituteService
  ) {

    if (this.masterObj.token == undefined && this.masterObj.token == null && this.masterObj.token == '') {
      localStorage.clear();
      this.routerObj.navigate(['../login'],{relativeTo:this.route});
    } else {
      this.instituteserObj.user_id = this.masterObj.userId;
      if (!this.masterObj.moduleCreated) {
        this.routerObj.navigate(['../../settings/institute-registration'],{relativeTo:this.route});
      }
    }
    if (this.masterObj.userType !== 3) {
      this.masterObj.checkUselogin();
    }


  }


  ngOnInit() {
    // console.log('hi');
    // this.routerObj.navigate(['/institute/institute-registration']);
    this.commonserObj.breadcrum = 'Dashboard';
    // this.isregistred();
    this.getCounts();
  }

  getCounts() {
    this.instituteserObj.getDashboardCounts(this.instituteserObj.user_id).subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        if (res.status == 1) {
          var arr = res.data;
          //  console.log(res.data); moduleId,moduleName,moduleLogo
          this.instituteserObj.instituteId = arr[0].moduleId;
          localStorage.setItem('Iid', arr[0].moduleId);
          if (arr[0].moduleId == null) {
            this.routerObj.navigate(['../settings/institute-registration'],{relativeTo:this.route});
          }
          this.masterObj.headerName = arr[0].moduleName.toUpperCase();
          localStorage.setItem('headerName', this.masterObj.headerName);

          if (arr[0].moduleLogo !== '' && arr[0].moduleLogo !== null) {
            this.masterObj.logo = this.masterObj.url + '/images/' + arr[0].moduleLogo;
            //this.masterObj.getimages('logos', arr[0].moduleLogo);
            localStorage.setItem('logo', this.masterObj.logo);
          }


          this.batch_counts = arr[1];
          this.faculty_counts = arr[2];
          this.course_counts = arr[3]; this.enquiry_counts = arr[4];
        }
      },
      (error) => {
        this.alertObj.consoleContent('On get states', error);
        if (error.status === 404) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 500) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
        }
      }
    )
  }
  isregistred() {
    this.instituteserObj.getInstituteDetails(this.instituteserObj.user_id).subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        if (res.status == 1) {
          var arr = res.data;
          if (arr.length <= 0) {
            this.routerObj.navigate(['../settings/institute-registration'],{relativeTo:this.route});
          } else {
            this.instituteserObj.instituteId = arr[0].iid;
            localStorage.setItem('Iid', arr[0].iid);
            this.masterObj.headerName = arr[0].institute_name.toUpperCase();
            localStorage.setItem('headerName', this.masterObj.headerName);
            if (arr[0].logo !== '' && arr[0].logo !== null) {
              this.masterObj.logo = this.masterObj.url + '/images/' + arr[0].logo; //this.masterObj.getimages('logos', arr[0].logo);
              localStorage.setItem('logo', this.masterObj.logo);
            }
          }
        }
      },
      (error) => {
        this.alertObj.consoleContent('On get states', error);
        if (error.status === 404) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 500) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
        }
      }
    );
  }
}
