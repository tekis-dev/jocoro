import { Component, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.css']
})
export class InstituteComponent implements OnInit,OnDestroy {
  @ViewChild('regForm') form: InstituteComponent;
  Institute_Type: Array<any>;
  Institute_form: FormGroup;
  confirm_form: FormGroup;
  submitFlag = false;
  isLinear = false;

  constructor(private commonservObj: CommonService,private masterObj:MasterService) {
    this.Institute_Type = [
      { id: 1, type_value: 'Online Training' },
      { id: 2, type_value: 'Classroom Training' },
      { id: 3, type_value: 'Training & Placement' },
      { id: 4, type_value: 'All' }
    ];
  }

  ngOnInit() {
    this.masterObj.navtoggle = true;
    this.commonservObj.breadcrum = 'Institute Registration';
    this.Institute_form = new FormGroup({
      'name': new FormControl(null, [Validators.pattern('^[a-zA-Z ]+$')]),
      'type': new FormControl(1, Validators.required),
      'fullname': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]'), Validators.minLength(6)]),
      'contactperson': new FormControl(null, [Validators.pattern('^[a-zA-Z ]+$')]),
      'i_primaryNo': new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
      'i_secNo': new FormControl(null, [Validators.pattern('^[1-9]+[0-9]*$')]),
      'i_doorNo': new FormControl(null, [Validators.pattern('[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$')]),
      'i_streetName': new FormControl(null, [Validators.pattern('^^[a-zA-Z ]+$]')]),
      'i_area': new FormControl(null, [Validators.pattern('^[a-zA-Z ]+$')]),
      'i_landmark': new FormControl(null, [Validators.pattern('^[a-zA-Z ]+$')]),
      'i_city': new FormControl(null, [Validators.pattern('^^[a-zA-Z ]+$')]),
      'i_pin': new FormControl(null, [Validators.pattern('^[1-9]+[0-9]*$')]),
      'state': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required)
    });
    this.confirm_form = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'c_email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'c_password': new FormControl(null, Validators.required),
    });
    console.log(this.commonservObj.pageFlag);
  }

  onRegisterInstitute(f) {
    if (!f.Institute_form.valid) {


    } else
      this.submitFlag = true;
  }
  ngOnDestroy(){
    this.masterObj.navtoggle = false;
  }
}
