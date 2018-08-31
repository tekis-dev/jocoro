import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MasterService, Data } from '../services/master.service';
import { AlertsService } from '../services/alerts.service';


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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;

  regEmail = '';
  btnSubmit = false;
  uid = null;

  constructor(
    private fb: FormBuilder,
    private activeroute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private alertObj: AlertsService,
    private masterObj: MasterService
  ) {
    if (this.masterObj.token !== null && this.masterObj.token !== '' && this.masterObj.token !== undefined) {
      //this.masterObj.checkUselogin();
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      'newpassword': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9@\#\$\&\* ]*$')]),
      'confirmpassword': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9@\#\$\&\* ]*$')]),
    }, { validator: matchValidator('newpassword', 'confirmpassword') });
    // , { validator: matchValidator('newpassword', 'confirmpassword') }
    this.activeroute.params.subscribe(
      (param: Params) => {
        this.uid = param['uid'];
      });
  }

  otpConfirm() {

  }

  ResetPassword() {
    if (this.form.valid) {

      var options = {
        uniqueKey: this.uid,
        password: this.form.controls.newpassword.value
      }
      this.masterObj.putResetPassword(options).subscribe(
        (data: Data) => {
          var res: any = <Data>data;
          if (res.status === 1) {
            var arr = res.data;
            if (arr.affectedRows > 0) {
              this.btnSubmit = false;
              this.alertObj.successAlert('Password Reset Successfully')
              this.router.navigate(['../login'], { relativeTo: this.route });
            } else {
              this.alertObj.errorAlert('Please try again');
            }
          }
        },
        (error) => {

          if (error.status === 401) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status === 404) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status > 0) {
            this.alertObj.errorAlert(error.error.message);
          }
        }
      )
    } else {
      this.btnSubmit = true;
    }
  }
}