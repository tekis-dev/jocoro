import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms/';

@Component({
  selector: 'app-basic-settings',
  templateUrl: './basic-settings.component.html',
  styleUrls: ['./basic-settings.component.css']
})
export class BasicSettingsComponent implements OnInit {

  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      'w_name': new FormControl(null), // [Validators.pattern('^[a-zA-Z ]+$')]),
      'w_title': new FormControl(null),
      'wf_name': new FormControl(null), // [Validators.required, Validators.pattern('^[a-zA-Z ]'), Validators.minLength(6)]),
    //  '': new FormControl(null, [Validators.pattern('^[a-zA-Z ]+$')]),
      'w_contact': new FormControl(null, [Validators.pattern('^[1-9]+[0-9]*$'),Validators.maxLength(10)]),
      
    });
  }

  onCancel() {
    alert('cancel');
  }
  onSubmit() {
    alert('on submit');
  }
}
