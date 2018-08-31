import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout/';
import { CommonService } from '../services/common.service';
import { MasterService } from '../services/master.service';
import { Router,ActivatedRoute } from '@angular/router';
import { JobsService } from './jobs.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  presentMenu:any;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  sideFlag = true;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
   private jobsObj:JobsService,
    private commonservObj: CommonService,
    public masterObj: MasterService,
    private routerObj: Router,
    private route: ActivatedRoute,
  ) {
    // console.log(this.masterObj);
    this.jobsObj.uid = this.masterObj.userId;
    if (this.masterObj.token == null && this.masterObj.token == '') {
      this.routerObj.navigate(['../login'],{relativeTo:this.route});
    }
    if (this.masterObj.userType !== 1) {
      this.masterObj.checkUselogin();
    }
    this.presentMenu = this.commonservObj.job_menu;
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
   
  }

  onEditProfile() {
    this.routerObj.navigate(['../settings'],{relativeTo:this.route}); 
  }
  onLogout() {
    this.masterObj.clearData();
    localStorage.clear();
    this.jobsObj.clearData();
    this.routerObj.navigate(['../login'],{relativeTo:this.route});
  }
  onActivate(event) {
        let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
  home() {
    this.masterObj.checkUselogin();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
