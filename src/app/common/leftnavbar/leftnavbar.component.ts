import { Component, OnInit, } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-leftnavbar',
  templateUrl: './leftnavbar.component.html',
  styleUrls: ['./leftnavbar.component.css']
})
export class LeftnavbarComponent implements OnInit {

  usertype = null;
  menu: any;
  constructor(
    public commonObj: CommonService
  ) {
    this.usertype = parseInt(localStorage.getItem('userType'), 10);
  }

  ngOnInit() {
    if (this.usertype == 1) {
      this.commonObj.presentMenu = this.commonObj.job_menu;
    } else if (this.usertype == 2) {
      this.commonObj.presentMenu = this.commonObj.hostel_menu;
    } else {
      this.commonObj.presentMenu = this.commonObj.inst_menu;
    }
  }

}
