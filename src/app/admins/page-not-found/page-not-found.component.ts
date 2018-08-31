import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit,OnDestroy {
  userId:any;
  userType:any;

  constructor(private routerobj:Router,
    private route:ActivatedRoute,
    private masterObj: MasterService) { 
    this.masterObj.navtoggle = true;
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.userType = localStorage.getItem('userType');
  }

  goHome(){
    // console.log(this.userId,this.userType);
    if(this.userType === 1){
      this.routerobj.navigate(['../jobs/dashboard'],{ relativeTo: this.route});
    } else if(this.userType === 2){
      this.routerobj.navigate(['../hostel/dashboard'],{ relativeTo: this.route});
    } else if(this.userType === 3){
      this.routerobj.navigate(['../institute/institute-dashboard'],{ relativeTo: this.route});
    }else {
      this.routerobj.navigate(['../login'],{ relativeTo: this.route});
    }
  }

  ngOnDestroy(){
    this.masterObj.navtoggle = false;
  }
}
