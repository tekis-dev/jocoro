import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { AuthGaurd } from '../../services/authGaurd.service';
import { InstituteService } from '../../services/institute.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @Output() sidebarToggle = new EventEmitter();
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private routerObj: Router,
    private route: ActivatedRoute,
    private authObj: AuthGaurd,
    public masterObj: MasterService,
    private instiObj: InstituteService) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    // console.log(this.mobileQuery.matches);
  }
  onLogout() {
    this.masterObj.clearData();
    this.instiObj.ClearData();
    localStorage.clear();
    this.authObj.loggedin = false;
    this.routerObj.navigate(['login'], { relativeTo: this.route });
  }
  onChangePassword() {
    this.routerObj.navigate(['change-password/' + this.masterObj.userId], { relativeTo: this.route });
  }
  onEditProfile() {
    // this.routerObj.navigate(['/institute/profile/'+ this.masterObj.userId]); 

    this.routerObj.navigate(['settings'], { relativeTo: this.route });
  }

  onpreview() {
    var inst_name = localStorage.getItem('headerName');
    window.open('/dashboard/preview/' + inst_name, '_blank')
    // window.location.href ='/preview/' + inst_name ;

    // this.routerObj.navigate(['/preview', inst_name]);
  }

  onSidebartoggle() {
    this.sidebarToggle.emit();
  }

  home() {
    this.masterObj.checkUselogin();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
