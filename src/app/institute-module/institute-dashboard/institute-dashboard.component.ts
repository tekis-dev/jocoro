import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { InstituteService } from '../services/institute.service';
import { Data, MasterService } from '../../services/master.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-institute-dashboard',
  templateUrl: './institute-dashboard.component.html',
  styleUrls: ['./institute-dashboard.component.css']
})
export class InstituteDashboardComponent implements OnInit {

  constructor(private routerObj: Router, public masterObj: MasterService,
    public commonserObj: CommonService,
    private alertObj: AlertsService,
    public instituteserObj: InstituteService) {
    this.instituteserObj.user_id = this.masterObj.userId;

  }


  ngOnInit() {
    // console.log('hi');
    // this.routerObj.navigate(['/institute/institute-registration']);
    this.commonserObj.breadcrum = 'Dashboard';
    this.isregistred();
  }
  isregistred() {
    this.instituteserObj.getInstituteDetails(this.instituteserObj.user_id).subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        if (res.status == 1) {
          var arr = res.data;
          if (arr.length <= 0) {
            this.routerObj.navigate(['/institute/institute-registration']);
          } else {
            this.instituteserObj.instituteId = arr[0].iid;
            localStorage.setItem('Iid', arr[0].iid);
            this.masterObj.headerName = arr[0].institute_name.toUpperCase();
            localStorage.setItem('headerName', this.masterObj.headerName);
            if (arr[0].logo !== '' && arr[0].logo !== null) {
              this.masterObj.logo = this.masterObj.getimages('logos', arr[0].logo);
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
