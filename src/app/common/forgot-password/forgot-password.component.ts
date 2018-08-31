import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';
import { MasterService, Data } from '../../services/master.service';


function onConfirmPasswordGiven(c: AbstractControl): any {
  if (!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd = c.parent.get('confirmPassword')

  if (!pwd || !cpwd) return;
  if (pwd.value !== cpwd.value) {
    console.log(pwd, cpwd)
    return { invalid: true };

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

  constructor(private activeroute: ActivatedRoute,
    private router: Router,
    private alertObj: AlertsService,
    private masterObj: MasterService
  ) {
    this.masterObj.checkUselogin();
  }

  ngOnInit() {
    this.form = new FormGroup({
      'newpassword': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9@\#\$\&\* ]*$')]),
      'confirmpassword': new FormControl(null, [Validators.required, onConfirmPasswordGiven, Validators.pattern('^[a-zA-Z0-9@\#\$\&\* ]*$')]),
    });
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
              this.alertObj.successAlert('Password Reset Successfully')
              this.router.navigate(['/login']);
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
            this.alertObj.errorAlert( error.error.message);
          } 
        }
      )
    } else {

    }
  }
}
