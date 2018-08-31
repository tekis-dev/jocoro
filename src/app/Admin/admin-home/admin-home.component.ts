import { Component, OnInit } from '@angular/core';
import { AuthGaurd } from 'app/services/authGaurd.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private authgaurdObj: AuthGaurd) { }

  ngOnInit() {
    console.log(this.authgaurdObj.loggedin);
  }

}
