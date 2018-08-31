import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { AuthGaurd } from '../../services/authGaurd.service';
import { CommonService } from '../../services/common.service';
import { MasterService } from '../../services/master.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-institute-home',
  templateUrl: './institute-home.component.html',
  styleUrls: ['./institute-home.component.css']
})
export class InstituteHomeComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  sideFlag = true;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private authgaurdObj: AuthGaurd,
    private commonservObj: CommonService,
    public masterObj: MasterService,
    private router: Router,
    private activeroute: ActivatedRoute,


  ) {
    if (this.masterObj.token == null && this.masterObj.token == '') {
      this.router.navigate(['/login']);
    }
    if (this.masterObj.userType !== 3) {
      this.masterObj.checkUselogin();
    }
    if (this.activeroute.snapshot.routeConfig.path === 'institute-registration') {
      this.sideFlag = false;
    } else {
      this.sideFlag = true;
    }
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.commonservObj.mainbreadcrum = 'Institute';
    this.masterObj.navtoggle = false;
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
