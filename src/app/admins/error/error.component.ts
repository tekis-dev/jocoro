import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../services/alerts.service';
import { MasterService } from '../services/master.service';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  offline = false;
  serverdown = false;
  constructor(private alertObj: AlertsService,private masterServ:MasterService) {
    setTimeout(() => {
      if (navigator.onLine) {
        this.offline = false;
        this.serverdown = true;
      } else {
        this.serverdown = false;
        this.offline = true;
      }
    }, 500);

    setInterval(() => {
      if (navigator.onLine) {
        this.offline = false;
        this.serverdown = true;
        this.masterServ.checkUselogin();

      } else {
        this.serverdown = false;
        this.offline = true;
      }
    }, 3000);
  }

  ngOnInit() {
  }

}
