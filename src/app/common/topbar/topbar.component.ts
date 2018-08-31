import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit,Output,EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { InstituteService } from '../../institute-module/services/institute.service';
import { AuthGaurd } from '../../services/authGaurd.service';

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
    private routerObj:Router,
    private authObj:AuthGaurd,
    public masterObj:MasterService,
    private instiObj: InstituteService)     { 
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit() {
    console.log(this.mobileQuery.matches);
  }
  onLogout() {
    this.masterObj.clearData();
    this.instiObj.ClearData();
    localStorage.clear();
    this.authObj.loggedin = false;
    this.routerObj.navigate(['/login']);
  }
  onChangePassword(){
    this.routerObj.navigate(['/change-password/'+ this.masterObj.userId]);
  }
  onEditProfile(){
    this.routerObj.navigate(['/institute/profile/'+ this.masterObj.userId]); 
  }

  onSidebartoggle(){
    this.sidebarToggle.emit();
  }

  home(){
    this.masterObj.checkUselogin();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
