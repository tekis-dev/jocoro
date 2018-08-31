import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService,Data } from '../../services/master.service';
import { AlertsService } from '../../services/alerts.service';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  form = new FormGroup({
    'firstname': new FormControl('', [Validators.required,
    Validators.pattern('^[a-zA-Z ]*$')]),
    'lastname': new FormControl('', [Validators.required,
    Validators.pattern('^[a-zA-Z ]*$')]),

  });
  constructor(
    private commonObj: CommonService,
    private alertObj: AlertsService,
    private masterObj: MasterService,
    private routerObj: Router
  ) {

  }

  ngOnInit() {
    // this.masterObj.navtoggle = true;
    // this.commonObj.presentMenu = [];
    this.userData();
   
  }

  userData() {
    this.masterObj.getUserDetails(this.masterObj.userId, this.masterObj.token).subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        var arr = res.data;
        if (res.status == 1) {

          // this.masterObj.regEmail = arr.email;
          // this.masterObj.regMobile = arr.phone_no;
          // localStorage.setItem('userId', this.masterObj.userId.toString());

          // localStorage.setItem('regEmail', arr.email);
          // localStorage.setItem('regMobile', arr.phone_no);
          this.masterObj.firstName = arr.first_name;
          this.masterObj.lastName = arr.last_name;
          this.bindData();
        }

      },
      (error) => {
        if (error.status === 404) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 500) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        } else {
          this.alertObj.errorAlert('Server down Please try after some time');
        }
      }

    )
  }

  bindData() {

    this.form.controls.firstname.setValue(this.masterObj.firstName);
    this.form.controls.lastname.setValue(this.masterObj.lastName);
    this.form.disable();
  }

  onedit() {
    this.form.enable();
  }

  onCancel() {
    this.bindData();
  }

  updateProfile() {
    // this.alertObj.infoAlert('Function not implemented yet');
    if (this.form.valid) {
      var options = {
        // data.uid,data.firstName,data.firstName
        uid: this.masterObj.userId,
        firstName: this.form.controls.firstname.value,
        lastName: this.form.controls.lastname.value
      }
      this.masterObj.profileUpdate(options).subscribe(
        (data: Data) => {
          var res: any = <Data>data;
          if (res.status === 1) {
            var arr = res.data;
            this.alertObj.topRoghtAlert('Updated Successfully');
            this.form.disable();
          }
        },
        (error) => {
          if (error.status === 401) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status === 404) {
            this.alertObj.errorAlert(error.message);
          } else if (error.status === 500) {
            this.alertObj.errorAlert('Please Contact Adminstrator' + error.error.message);
          } else if (error.status > 0) {
            this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
          }
        }
      )

    } else {

    }
  }

  goHome() {
    if (this.masterObj.userType === 1) {
      this.routerObj.navigate(['jobs/dashboard']);
    } else if (this.masterObj.userType === 2) {
      this.routerObj.navigate(['hostel/dashboard']);
    } else if (this.masterObj.userType === 3) {
      this.routerObj.navigate(['institute/institute-dashboard']);
    }
  }

  ngOnDestroy() {
    this.masterObj.navtoggle = false;
  }
}
