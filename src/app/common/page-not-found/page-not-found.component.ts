import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit,OnDestroy {
  userId:any;
  userType:any;

  constructor(private routerobj:Router,private masterObj: MasterService) { 
    this.masterObj.navtoggle = true;
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.userType = localStorage.getItem('userType');
  }

  goHome(){
    console.log(this.userId,this.userType);
    if(this.userType === 1){
      this.routerobj.navigate(['jobs/dashboard']);
    } else if(this.userType === 2){
      this.routerobj.navigate(['hostel/dashboard']);
    } else if(this.userType === 3){
      this.routerobj.navigate(['institute/institute-dashboard']);
    }else {
      this.routerobj.navigate(['/login']);
    }
  }

  ngOnDestroy(){
    this.masterObj.navtoggle = false;
  }
}
