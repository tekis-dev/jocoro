import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { AlertsService } from '../../services/alerts.service';
import { Data } from '@angular/router/src/config';
import { InstituteService } from '../../services/institute.service';





function onConfirmPasswordGiven(c: AbstractControl): any {
  if (!c.parent || !c) return;
  const pwd = c.parent.get('newpassword');
  const cpwd = c.parent.get('confirmpassword')

  if (!pwd || !cpwd) return;
  if (pwd.value !== cpwd.value) {
    return { invalid: true };

  }
}

function matchValidator(pwd, cpwd) {

  return (group: FormGroup): { [key: string]: any } => {
    let password = group.controls[pwd];
    let confirmPassword = group.controls[cpwd];

    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  }

}


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  btnSubmit = false;
  passmatch = false;

  regEmail = '';
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private routerObj: Router,
    private route:ActivatedRoute,
    private masterObj: MasterService,
    private instiObj: InstituteService,
    private alertObj: AlertsService
  ) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      'oldpassword': new FormControl('', [Validators.required, Validators.minLength(6),
      Validators.pattern('^[a-zA-Z0-9@\#\$\&\* ]*$')]),
      'newpassword': new FormControl('', [Validators.required, Validators.minLength(6),
      Validators.pattern('^[a-zA-Z0-9@\#\$\&\* ]*$')]),
      'confirmpassword': new FormControl('', [Validators.required, Validators.minLength(6),
      Validators.pattern('^[a-zA-Z0-9@\#\$\&\* ]*$')]),
    }, { validator: matchValidator('newpassword', 'confirmpassword') })
    this.masterObj.navtoggle = true;
  }

  oldpasswordGiven() {

  }
  goHome() {
    if (this.masterObj.userType === 1) {
      this.routerObj.navigate(['../jobs/dashboard'],{relativeTo:this.route});
    } else if (this.masterObj.userType === 2) {
      this.routerObj.navigate(['../hostel/dashboard'],{relativeTo:this.route});
    } else if (this.masterObj.userType === 3) {
      this.routerObj.navigate(['../institute/institute-dashboard'],{relativeTo:this.route});
    }
  }
  changepassword() {
    // console.log(this.form);
    if (this.form.valid) {
      this.btnSubmit = false;
      var options = {
        uid: this.masterObj.userId,
        email: this.masterObj.regEmail,
        oldPassword: this.form.controls.oldpassword.value,
        newPassword: this.form.controls.confirmpassword.value
      }
      if (this.form.controls.newpassword.value !== options.newPassword) {
        this.btnSubmit = true;
        this.alertObj.infoAlert('New password & Confirm password not matching')
      } else {
        this.masterObj.putChangePassword(options).subscribe(
          (data: Data) => {
            var res: any = <Data>data;
            if (res.status === 1) {
              var arr = res.data;
              if (arr.affectedRows > 0) {
                this.alertObj.infoAlert('Password changed successfully ').then(
                  (dt) => {
                    this.masterObj.clearData();
                    this.instiObj.ClearData();
                    localStorage.clear();
                    this.routerObj.navigate(['../login'],{relativeTo:this.route});
                  }
                )
              } else {
                this.alertObj.errorAlert('Please try again');
              }
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
      }
    } else {
      this.btnSubmit = true;
    }
  }
  ngOnDestroy() {
    this.masterObj.navtoggle = false;
  }
}
