import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonService, ProMenu } from '../services/common.service';
import { MasterService } from '../services/master.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  presentMenu:ProMenu[] = []
  mobileQuery: MediaQueryList;
  iid = null;
  private _mobileQueryListener: () => void;
  @Output() sidebarToggle = new EventEmitter();
  sideFlag = true;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private routerObj:Router,
    private route:ActivatedRoute,
    private masterObj: MasterService,
    private commonObj: CommonService) {
      if (this.masterObj.token == null && this.masterObj.token == '') {
        this.routerObj.navigate(['../login'],{ relativeTo: this.route });
      }
      if (this.masterObj.userType != null) {
       
      } else {
        this.masterObj.checkUselogin();
      }
    this.presentMenu = this.commonObj.profileMenu;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    // console.log('hi');
    if (this.masterObj.userType == 1) {
      this.commonObj.profileMenu[0].url = "../jobs/job" ;
      this.commonObj.profileMenu[2].hide = true;
    } else if (this.masterObj.userType == 2) {
      this.commonObj.profileMenu[0].url = "../jobs/job" ;
      this.commonObj.profileMenu[2].hide = true;
    } else {
      this.iid = localStorage.getItem('Iid');
      if (this.masterObj.moduleCreated) {
        this.commonObj.profileMenu[2].hide = true;
      } else {
        this.commonObj.profileMenu[2].hide = false;
      }
    }

  }
  onSidebartoggle() {
    this.sidebarToggle.emit();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
