import { Component, OnInit } from '@angular/core';
import { NgForm, AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';

import { AuthGaurd } from '../services/authGaurd.service';
import { MasterService, Data } from '../services/master.service';
import { AlertsService } from '../services/alerts.service';
import { InstituteService } from '../services/institute.service';



function onEmailGiven(c: AbstractControl): any {
  if (!c.parent || !c) return;
  const pwd = c.parent.get('username');
  if (!pwd) return;
  if (pwd.value !== '' && pwd.value !== null) {
    var b = validateEmail(pwd.value) || validatePhone(pwd.value);
    if (b)
      return
    else
      return { invalid: true }
  }

}

function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}
function validatePhone(phone) {
  var re = /^[1-9]+[0-9]*$/;
  return re.test(phone);
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitFlag = false;
  emailexist: boolean = false;
  userDetails = { userId: 'jobportal@gmail.com', passeord: 'jobportal' };
  l_form: FormGroup;
  message = '';

  constructor(public masterservObj: MasterService,
    private routerobj: Router,
    private route:ActivatedRoute,
    private instiObj: InstituteService,
    private alertObj: AlertsService,
    private authgaurdObj: AuthGaurd) {
  }

  ngOnInit() {
    if (this.masterservObj.token !== '' && this.masterservObj.token !== undefined) {
      if (this.masterservObj.userType === 1) {
        this.routerobj.navigate(['../jobs/job'],{relativeTo:this.route});
      } else if (this.masterservObj.userType === 2) {
        this.routerobj.navigate(['../hostel/dashboard'],{relativeTo:this.route});
      } else if (this.masterservObj.userType === 3) {
        this.routerobj.navigate(['../institute/institute-dashboard'],{relativeTo:this.route});
      }
    }

    this.l_form = new FormGroup({
      'password': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9@\#\$\&\* ]*$')]),
      'username': new FormControl('', [Validators.required, onEmailGiven,
        // Validators.pattern('^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$')
      ]),
      'type': new FormControl('3', [Validators.required])
    });
  }
  
  onEmailGiven(evt) {
    this.submitFlag = false;
    if (this.l_form.controls.username.valid) {
      if (evt.target.value !== '') {
        this.masterservObj.getcheckEmail(evt.target.value.trim()).subscribe(
          (data: Data) => {
            var res: any = <Data>data;
            if (res.data[0][0].isExists) {
              this.emailexist = false;
              // this.l_form.controls.email.setValue('');
            } else {
              this.emailexist = true;
              // alert('Email not Registred. Please Register');
            }
          },
          (error) => {
            this.emailexist = true;

          }
        )
      }
    }
  }


  onsignin(f: NgForm) {

    this.message = '';
    const user = this.l_form.value.username;
    const password = this.l_form.value.password;
    if (f.valid) {

      if (!this.emailexist) {
        var options = {
          email: user,
          password: password,
          userType: this.l_form.value.type
        }
        this.masterservObj.postuserLogin(options).subscribe(
          (data: Data) => {
            var res: any = <Data>data;
            var arr = res.data;
            this.masterservObj.token = arr.token;
            localStorage.setItem('token', this.masterservObj.token);
            if (res.status === 1) {
            
              if (arr.emailVerified === 0) {
                this.EmailNotVerified();
         
              } else if (arr.phoneVerified === 0) {
                this.mobileNotVerified(arr.uniqKey)
              } else {
              // this.masterservObj.token = arr.token;
              // localStorage.setItem('token', this.masterservObj.token);
              this.authgaurdObj.loggedin = true;
              this.masterservObj.userType = arr.userType;
              this.masterservObj.moduleCreated = arr.moduleCreated;
              localStorage.setItem('moduleCreated',arr.moduleCreated);
              localStorage.setItem('userType', arr.userType);
              this.masterservObj.userId = arr.userId;
              this.userData();
              }
            }
          },
          (error) => {
            this.masterservObj.clearData();
            this.instiObj.ClearData();
            localStorage.clear();
            this.authgaurdObj.loggedin = false;
            // console.log(error);
            if (error.status === 401) {
              this.message = 'Invalid Mail ID/Password';
            } else if (error.status === 404) {
              this.alertObj.errorAlert(error.error.message);
            } else if (error.status > 0) {
              this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
            }
          }
        )
      } else {
        this.alertObj.warningAlert('Entered Email not Registred');
      }
    } else {
      this.submitFlag = true;
    }
  }

  decodeJwt(jwt) {
    var jwtarr = jwt.split('.');
    let jwtData = jwtarr[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    this.userData();
  }

  

  /* verify mobile and emial than login */

  EmailNotVerified(){
    this.alertObj.infoAlertwithbutton("Awaiting for Email confirmation, Please check your Mail", "Resend Email Verification")
    .then(
    (dt) => {
      if (dt.value) {
        this.masterservObj.putResendEmail(this.masterservObj.token).subscribe(
          (data: Data) => {
            var res1: any = <Data>data;
            if (res1.status == 1) {
              this.masterservObj.clearData();
              this.instiObj.ClearData();
              localStorage.clear();
              this.authgaurdObj.loggedin = false;
              this.alertObj.successAlert('Activation mail resend Successfully.Please check your mail');
            }
          },
          (error) => {
            this.masterservObj.clearData();
            this.instiObj.ClearData();
            localStorage.clear();
            this.authgaurdObj.loggedin = false;
            if (error.status === 401) {
              this.alertObj.errorAlert(error.error.message);
            } else if (error.status === 404) {
              this.alertObj.errorAlert(error.error.message);
            } else if (error.status > 0) {
              this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
            } else {
              this.alertObj.errorAlert('Server down Please try after some time');
            }
          }
        )
      } else {
        this.masterservObj.clearData();
        this.instiObj.ClearData();
        localStorage.clear();
        this.authgaurdObj.loggedin = false;
      }
    }
    );
  }

  mobileNotVerified(key){
    this.masterservObj.clearData();
    this.instiObj.ClearData();
    localStorage.clear();
    this.alertObj.infoAlertwithbutton("Awaiting for OTP verification", "Go to OTP verification").then(
      (dt) => {
        if (dt.value) {
          this.routerobj.navigate(['../verification/' + key],{relativeTo:this.route});
        }
      }
    );
  }
  userData() {
    this.masterservObj.getUserDetails(this.masterservObj.userId, this.masterservObj.token).subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        var arr = res.data;
        this.message = '';
        // console.log(arr);
        
          this.masterservObj.regEmail = arr.email;
          this.masterservObj.regMobile = arr.phone_no;
          localStorage.setItem('userId', this.masterservObj.userId.toString());
          // localStorage.setItem('userType', this.masterservObj.userType.toString());
          localStorage.setItem('regEmail', arr.email);
          localStorage.setItem('regMobile', arr.phone_no);
          
         
          this.masterservObj.firstName = arr.first_name;
          this.masterservObj.lastName = arr.last_name;
          this.alertObj.topRoghtAlert('Welcome ' + arr.first_name);
          
          if (this.masterservObj.userType === 1) {
            this.routerobj.navigate(['../jobs/job'],{relativeTo:this.route});
          } else if (this.masterservObj.userType === 2) {
            this.routerobj.navigate(['../hostel/dashboard'],{relativeTo:this.route});
          } else if (this.masterservObj.userType === 3) {
            if(this.masterservObj.moduleCreated){
              this.routerobj.navigate(['../institute/'],{relativeTo:this.route});
            } else {
              this.routerobj.navigate(['../settings/institute-registration'],{relativeTo:this.route});
            }
          }
        
      },
      (error) => {        
        this.masterservObj.clearData();
        this.instiObj.ClearData();
        localStorage.clear();
        this.authgaurdObj.loggedin = false;
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
  
}
