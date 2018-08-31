import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-upate',
  templateUrl: './email-upate.component.html',
  styleUrls: ['./email-upate.component.css']
})
export class EmailUpateComponent implements OnInit {

  formEmail: FormGroup;
  constructor() { }

  ngOnInit() {
    this.formEmail = new FormGroup({
      'from_email': new FormControl('',[Validators.required,Validators.email]),
      'to_email': new FormControl(null, [Validators.required,Validators.email]),
    });
  }

}
