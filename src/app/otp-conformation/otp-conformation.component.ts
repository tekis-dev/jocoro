import { Component, OnInit, OnDestroy } from '@angular/core';
import { MasterService, Data } from '../services/master.service';
import { FormControl, Validators } from '@angular/forms';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-otp-conformation',
  templateUrl: './otp-conformation.component.html',
  styleUrls: ['./otp-conformation.component.css']
})
export class OtpConformationComponent implements OnInit, OnDestroy {
  txtotp = new FormControl(null, [Validators.required, Validators.minLength(4)]);
  resendBtn = true;
  otpflag = false;
  unquikey = '';
  timer: any = null;
  showPopup: any;
  timerFlag = true;
  timeLeft: number = 90;
  interval;


  constructor(
    public commonObj:CommonService,
    private masterObj: MasterService,
    private alertObj: AlertsService,
    private router: Router,
    private activatedrouteObj: ActivatedRoute
  ) {
    this.masterObj.clearData();
    this.masterObj.navtoggle = true;
    this.activatedrouteObj.params.subscribe(
      (param: Params) => {
        this.masterObj.unquikey = param['uniqId'];
        // console.log(this.instiServObj.batchTable,this.bid)
        if (this.masterObj.unquikey !== '' || this.masterObj.unquikey !== undefined) { // 
          this.unquikey = this.masterObj.unquikey;
        }
        else {
          this.alertObj.errorAlert('You Entered Url wrong');
        }
      });
  }

  ngOnInit() {
    this.timerFlag = false;
    this.startTimer();
    this.masterObj.getverifyEmail(this.masterObj.unquikey).subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        this.alertObj.consoleContent('verify otp', res);
        if (res.status == 1) {
          this.alertObj.topRoghtAlert('Otp sent to your registred mobile');
          localStorage.clear();
        } else {
          this.resendBtn = true;
          this.alertObj.errorAlert('Otp not sent! please try after sometime');
        }
      },
      (error) => {
        this.alertObj.consoleContent('error-verify otp', error);
        // this.timerFlag = true;
        // this.pauseTimer()
        localStorage.clear();
        if (error.status === 404) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 500) {
          this.alertObj.errorAlert('Please contact Administrator. ');
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        } 
      }
    );
    // this.confirmation();

  }

  confirmation() {
    if (this.masterObj.userId !== null && this.masterObj.userId !== undefined) {
      this.masterObj.getUserDetails(this.masterObj.userId, this.masterObj.token).subscribe(
        (data: Data) => {
          var res: any = <Data>data;
          var arr: Array<any> = res.data;
          if (arr.length > 0) {
            if (arr[0].email_verified === 0) {
              this.alertObj.infoAlert(
                "Account not activated, Please check your mail and complete verification process",
              ).then(
                (dt) => {
                  this.router.navigate(['/login']);
                }
                );
            } else if (arr[0].phone_no_verified === 0) {
            } else {
              this.otpflag = true;
              this.masterObj.regEmail = arr[0].email;
              this.masterObj.regMobile = arr[0].phone_no;
              if (this.masterObj.userType === 0) {
                this.router.navigate(['/login']);
              } else if (this.masterObj.userType === 1) {
                this.router.navigate(['/jobs/dashboard']);
              } else if (this.masterObj.userType === 2) {
                this.router.navigate(['/hostel/dashboard']);
              } else if (this.masterObj.userType === 3) {
                this.router.navigate(['/institute/institute-dashboard']);
              }
            }
          }
        },
        (error) => {

          alert('error please try after some time');
        }

      );
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft == 0) {
        this.pauseTimer();
        this.resendBtn = false;
      }
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 30;
      }
    }, 1000)
  }

  pauseTimer() {
    this.timerFlag = true;
    this.timeLeft = 30;
    clearInterval(this.interval);
  }
  resendOtp() {
    this.resendBtn = true;
    this.timerFlag = false;
    var options = {
      unqid: this.unquikey
    }
    this.startTimer();
    this.masterObj.putResendOtp(options).subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        if (res.status === 1) {
          // this.pauseTimer();
          this.alertObj.topRoghtAlert('Otp sent to your registred mobile');
        } else {
          this.alertObj.errorAlert('Something went wrong! please try after sometime' + res.message);
        }
      },
      (error) => {
        if (error.status === 404) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message + ' Please retry again');

        } else if (error.status === 500) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        }
      }
    );
  }

  otpConfirm() {
    this.resendBtn = true;
    this.timerFlag = true;
    this.pauseTimer();
    this.masterObj.getverifyPhone(this.masterObj.unquikey, this.txtotp.value).subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        if (res.status === 1) {
          if (this.masterObj.userId !== null) {
            this.homepage();
          } else {
            this.router.navigate(['/login']);
          }
        } else {
          this.alertObj.errorAlert('Something went wrong! please try after sometime' + res.message);
        }
      },
      (error) => {
        if (error.status === 404) {
          this.alertObj.errorAlert(error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 500) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        } 
      }
    )
  }

  homepage() {
    if (this.masterObj.userType === 1) {
      this.router.navigate(['/jobs/dashboard']);
    } else if (this.masterObj.userType === 2) {
      this.router.navigate(['/hostel/dashboard']);
    } else if (this.masterObj.userType === 3) {
      this.router.navigate(['/institute/institute-dashboard']);
    }
  }

  ngOnDestroy() {
    this.masterObj.navtoggle = false;
  }
}
