import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MasterService, Data } from '../services/master.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertsService } from '../services/alerts.service';
import { CommonService } from '../services/common.service';

import { ActivatedRoute } from '@angular/router';


function onConfirmPasswordGiven(c: AbstractControl): any {
  if (!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd = c.parent.get('confirmPassword')

  if (!pwd || !cpwd) return;
  if (pwd.value !== cpwd.value) {
    // console.log(pwd.value,cpwd.value)
    return { invalid: true };

  } else {
    return
  }
}

// function onConfirmEmailGiven(c: AbstractControl): any {
//   if (!c.parent || !c) return;
//   const pwd = c.parent.get('email');
//   const cpwd = c.parent.get('confirmEmail')

//   if (!pwd || !cpwd) return;
//   if (pwd.value !== cpwd.value) {
//     return { invalid: true };

//   }
// }




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  btnSubmit = false;
  emailexist = false;
  passmatch = false;
  reg_form: FormGroup;
  passmismatch = false;
  checked = false;
  constructor(
    private fb: FormBuilder,
    private masterServObj: MasterService,
    public commonObj: CommonService,
    private alertObj: AlertsService,
    private router: Router,
    private route: ActivatedRoute

  ) { }


  private matchValidator(pwd, cpwd) {

    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[pwd];
      let confirmPassword = group.controls[cpwd];

      if (password.value !== confirmPassword.value) {
        this.btnSubmit = false;
        return {
          mismatchedPasswords: true
        };
      }
    }

  }
  ngOnInit() {

    this.reg_form = this.fb.group({
      'firstname': new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
      'lastname': new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
      'mobile': new FormControl('', [Validators.minLength(10), Validators.pattern('^[1-9]+[0-9]*$')]),
      'email': new FormControl(null, [Validators.required, Validators.pattern('^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6),
      Validators.pattern('^[a-zA-Z0-9@\#\$\&\* ]*$')], ),
      'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9@\#\$\&\* ]*$')]),

      'type': new FormControl('3', [Validators.required]),
    }, { validator: this.matchValidator('password', 'confirmPassword') });

    if (this.masterServObj.token !== null && this.masterServObj.token !== '' && this.masterServObj.token !== undefined) {
      this.masterServObj.checkUselogin();
    }
  }

  onPhnoGiven(evt) {
    this.btnSubmit = false;
    if (this.reg_form.controls.mobile.valid) {
      if (evt.value !== '') {
        // this.masterServObj.checkEmail(evt.value.trim()).subscribe(
        //   (data: Data) => {
        //     var res: any = <Data>data;
        //     console.log(res.data);
        //     if(res.data[0].isExists){
        //       this.emailexist = true;
        //       this.reg_form.controls.email.setValue('');
        //     } else{
        //       this.emailexist = false;
        //     }
        //   },
        //   (error) => {
        //     alert('error');
        //   }
        // )
      }
    }

  }

  onEmailGiven(evt) {
    this.btnSubmit = false;
    if (this.reg_form.controls.email.valid) {
      if (evt.target.value !== '') {
        this.masterServObj.getcheckEmail(evt.target.value.trim()).subscribe(
          (data: Data) => {
            var res: any = <Data>data;
            var arr = res.data[0];
            if (arr[0].isExists > 0) {
              this.emailexist = true;
              this.alertObj.infoAlert('email already exists');
            } else {
              this.emailexist = false;
            }
          },
          (error) => {
            this.alertObj.consoleContent('email given -registration', error);
            if (error.status === 404) {
              this.alertObj.errorAlert(error.error.message);
            } else if (error.status === 401) {
              this.alertObj.errorAlert(error.error.message);
            } else if (error.status === 500) {
              this.alertObj.errorAlert(error.error.message);
            } else if (error.status > 0) {
              this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
            }
          }
        )
      }
    }
  }

  /* onPasswordGiven(evt) {
     this.btnSubmit = false;
     console.log(this.reg_form.controls.password);
     if (this.reg_form.controls.password.valid) {
       if (evt.target.value !== '') {
 
       }
     }   
}
 */

  /* registration submit button */
  onRegister() {

    if (!this.reg_form.valid) {
      this.btnSubmit = true;
    } else {
      this.btnSubmit = false;
      if (this.reg_form.controls.password.value !== this.reg_form.controls.confirmPassword.value) {
        this.alertObj.infoAlert('Password & Confirm password not matching');
      } else if (!this.checked) {
        this.alertObj.infoAlert("Please accept terms & conditions");
      } else {
        if (!this.passmatch && !this.emailexist) {
          var options = {
            firstName: this.reg_form.controls.firstname.value,
            lastName: this.reg_form.controls.lastname.value,
            email: this.reg_form.controls.email.value.trim(),
            contactNo: this.reg_form.controls.mobile.value.trim(),
            password: this.reg_form.controls.password.value.trim(),
            userType: this.reg_form.controls.type.value.trim()
          }

          this.masterServObj.postRegistration(options).subscribe(
            (data: Data) => {
              var res: any = <Data>data;
              if (res.status === 1) {
                this.alertObj.successAlert('Registration Successfull.Please check your mail');
                this.router.navigate(['../login'], { relativeTo: this.route });
              } else {
                this.alertObj.infoAlert('Registration failed please try after some time');
              }
            },
            (error) => {
              this.alertObj.consoleContent('On registration', error);
              if (error.status === 404) {
                this.alertObj.errorAlert('Please contact Administrator. ' + error.message);
              } else if (error.status === 401) {
                this.alertObj.errorAlert(error.error.message);
              } else if (error.status === 500) {
                this.alertObj.errorAlert(error.error.message + ' Please contact Administrator. ');
              } else if (error.status > 0) {
                this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
              }
            }
          )
        } else if (this.emailexist) {
          this.alertObj.infoAlert('Email already exist');
        } else if (this.passmatch) {
          this.alertObj.infoAlert('password not matching');
        }
        else {
          this.btnSubmit = true;
        }
      }
    }
  }
}
