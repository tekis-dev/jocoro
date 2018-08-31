import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { MasterService, Data } from '../services/master.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgotpassword-email',
  templateUrl: './forgotpassword-email.component.html',
  styleUrls: ['./forgotpassword-email.component.css']
})
export class ForgotpasswordEmailComponent implements OnInit {

  form = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.pattern('^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$')]),
    'type': new FormControl('3', [Validators.required])
  });
  // email = new FormControl(null,[Validators.required,Validators.pattern('^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$')]);
  constructor(
    private alertObj:AlertsService,
    private masterObj:MasterService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.masterObj.token !== null && this.masterObj.token !== '' && this.masterObj.token !== undefined) {
      this.masterObj.checkUselogin();
    }
  }
  goBack() {
    this.router.navigate(['../login'],{relativeTo:this.route});
  }
  onEmailGiven(){
    if(this.form.valid){
      var options = {
        email: this.form.controls.email.value,
        user_type: this.form.controls.type.value,
      }
      this.masterObj.puttForgotEmail(options).subscribe(
        (data: Data) => {
          var res: any = <Data>data;
          console.log(res);
          if (res.status === 1) {
            this.alertObj.infoAlert('Link sent to your email,please check').then(
              (dt)=>{
                this.router.navigate(['../login'],{relativeTo:this.route});
              }
            )
          }
        },
        (error) => {
          console.log(error);
          if (error.status === 401) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status === 404) {
            this.alertObj.errorAlert(error.message);
          } else if (error.status > 0) {
            this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
          } 
        }
      )
    }else{

    }
  
  }
}
