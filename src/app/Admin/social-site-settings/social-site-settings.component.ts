import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-social-site-settings',
  templateUrl: './social-site-settings.component.html',
  styleUrls: ['./social-site-settings.component.css']
})
export class SocialSiteSettingsComponent implements OnInit {

  form:FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      'f_link': new FormControl(null),
      't_link': new FormControl(null),
      'l_link': new FormControl(null),
      'g_link': new FormControl(null),
     });
  }
  onCancel() {

  }
  onSubmit(){
    
  }
}
