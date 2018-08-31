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
    
  }

}
