import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { AlertsService } from '../../services/alerts.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {

  form = new FormGroup({
    'firstname': new FormControl('', [Validators.required, 
      Validators.pattern('^[a-zA-Z ]*$')]),
    'lastname': new FormControl('', [Validators.required,
      Validators.pattern('^[a-zA-Z ]*$')]),
 
  });
  constructor(
    private commonObj:CommonService,
    private alertObj:AlertsService,
    private masterObj:MasterService,
    private routerObj:Router
  ) { }

  ngOnInit() {
    this.masterObj.navtoggle = true;
    // this.commonObj.presentMenu = [];
  }
  updateProfile(){
    this.alertObj.infoAlert('Function not implemented yet');
    if(this.form.valid){
      var options ={
        uid: this.masterObj.userId,
        firstname: this.form.controls.firstname.value,
        lastname:  this.form.controls.lastname.value
      }

      this.masterObj.profileUpdate(options).subscribe(
        
      )

    }else{

    }
  }
  goHome(){
    if (this.masterObj.userType === 1) {
      this.routerObj.navigate(['jobs/dashboard']);
    } else if (this.masterObj.userType === 2) {
      this.routerObj.navigate(['hostel/dashboard']);
    } else if (this.masterObj.userType === 3) {
      this.routerObj.navigate(['institute/institute-dashboard']);
    }
  }
  ngOnDestroy(){
    this.masterObj.navtoggle = false;
  }
}
