import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  offline = false;
  serverdown = false;
  constructor(private alertObj:AlertsService) {
    setTimeout(() => {
      if(this.alertObj.online){
          this.serverdown = true;
      }else {
        this.offline = true;
      }
    }, 3000);
   }

  ngOnInit() {
  }

}
