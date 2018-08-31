import { Component } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public progress: NgProgress){
    console.log(progress);
  }
 
}
