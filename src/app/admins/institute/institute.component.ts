import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonService } from '../services/common.service';
import { MasterService } from '../services/master.service';
import { InstituteService } from '../services/institute.service';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.css']
})
export class InstituteComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  sideFlag = true;
  presentMenu = [];
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,

    private commonservObj: CommonService,
    public masterObj: MasterService,
    private instiobj: InstituteService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    document.body.scrollTo(0, 0);
    this.presentMenu = this.commonservObj.inst_menu;
    if (this.masterObj.token == null && this.masterObj.token == '') {
      this.router.navigate(['../login'], { relativeTo: this.route });
    }
    if (this.masterObj.userType !== 3) {
      this.masterObj.checkUselogin();
    }

    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {

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

  onpreview() {
    var inst_name = localStorage.getItem('headerName');
    var iid = localStorage.getItem('Iid');
    let instituteObj = { institute_id: iid, institute_name: inst_name };
    // console.log(instituteObj,'/dashboard/preview/' + inst_name );
    localStorage.setItem('searchInstitute', JSON.stringify(instituteObj));
    // this.router.navigate(['../preview/' + inst_name], { relativeTo: this.route })
    window.open('dashboard/preview/' + inst_name, '_blank')

  }

  onLogout() {
    this.masterObj.clearData();
    this.instiobj.ClearData();
    localStorage.clear();
    this.router.navigate(['../login'], { relativeTo: this.route });
  }
  onChangePassword() {
    this.router.navigate(['../profile/change-password/' + this.masterObj.userId], { relativeTo: this.route });
  }
  onEditProfile() {
    this.router.navigate(['../settings'], { relativeTo: this.route });
  }


  home() {
    this.masterObj.checkUselogin();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
