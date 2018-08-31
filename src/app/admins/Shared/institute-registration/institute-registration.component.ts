import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router/';
import { AlertsService } from '../../services/alerts.service';

import { CommonService } from '../../services/common.service';
import { MasterService, Data } from '../../services/master.service';
import { InstituteService } from '../../services/institute.service';

@Component({
  selector: 'app-institute-registration',
  templateUrl: './institute-registration.component.html',
  styleUrls: ['./institute-registration.component.css']
})
export class InstituteRegistrationComponent implements OnInit {
  Institute_Type: Array<any> = [];
  res: any;
  btnText = 'Save'
  submitFlag = false;
  isLinear = false;
  countries: any;
  states: any;
  cities: any;
  filteredcity: Observable<any[]>;
  @ViewChild(MatAutocompleteTrigger) trigger;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() btnCancel = new EventEmitter();

  Institute_form = new FormGroup({
    'mobile': new FormControl('', [Validators.minLength(10),
    // Validators.maxLength(10),
    Validators.pattern('^[1-9]+[0-9]*$')]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'name': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    'type': new FormControl(Validators.required),
    'fullname': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    'about': new FormControl(''),
    // 'i_primaryNo': new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
    'i_secNo': new FormControl(null, [Validators.pattern('^[1-9]+[0-9]*$'), Validators.minLength(10),
    Validators.maxLength(10)]),
    'Address_1': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+([/ , _ -]?[a-zA-Z0-9])*$')]),
    'Address_2': new FormControl("", [Validators.pattern('[a-zA-Z0-9]+([, _ -]?[a-zA-Z0-9])*$')]),
    'i_area': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]+([, _ -]?[a-zA-Z0-9])*$')]),
    'i_landmark': new FormControl("", [Validators.pattern('[a-zA-Z0-9]+([, _ -]?[a-zA-Z0-9])*$')]),
    'i_city': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    'i_pin': new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
    'state': new FormControl(null, Validators.required),
    'country': new FormControl(null, Validators.required)
  });

  /* config of cd editor */
  ckeditorContent: any = '';
  constructor(public commonObj: CommonService, public institueserObj: InstituteService,
    public masterObj: MasterService, private alertObj: AlertsService,
    private activeroute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute) {
    if (this.masterObj.userId == null || this.masterObj.userId == undefined) {
      this.masterObj.clearData();
      this.institueserObj.ClearData();
      this.router.navigate(['../login'], { relativeTo: this.route });
    }
    if (this.masterObj.userType !== 3) {
      this.masterObj.checkUselogin();
    }
    /* city filter */
    if (this.activeroute.snapshot.routeConfig.path === 'institute-registration') {
      if (this.masterObj.moduleCreated) {
        this.router.navigate(['../institute/'], { relativeTo: this.route });
      }
      this.btnText = "Save";
    }
    this.filteredcity = this.Institute_form.controls.i_city.valueChanges
      .pipe(
      startWith(''),
      map(state => state ? this.filtercity(state) : (this.masterObj.cities !== undefined ? this.masterObj.cities.slice() : []))
      );
  }

  ngOnInit() {
    this.masterObj.getConutries().subscribe(
      (data: Data) => {
        this.res = <Data>data;
        if (this.res.status == 1)
          this.masterObj.countries = this.res.data;
        else
          this.alertObj.warningAlert(this.res.message)
      },
      (error) => {
        this.alertObj.consoleContent('On get countries', error);
        if (error.status === 404) {
          this.alertObj.errorAlert('Please contact Administrator.  ' + error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 500) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
        }
      }
    );
    this.institueserObj.getTeachMode().subscribe(
      (data: Data) => {
        this.res = <Data>data;
        if (this.res.status == 1) {
          var arr: Array<any> = this.res.data;
          this.institueserObj.tech_mode = arr;
        } else {
          this.alertObj.warningAlert(this.res.message)
        }
      },
      (error) => {
        this.alertObj.consoleContent('On get teaching modes', error);
        if (error.status === 404) {
          this.alertObj.errorAlert('Please contact Administrator.  ' + error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 500) {
          this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
        }
      }
    );
    this.Institute_form.controls.email.setValue(this.masterObj.regEmail);
    this.Institute_form.controls.mobile.setValue(this.masterObj.regMobile);
    if (this.btnText == "Save")
      this.Institute_form.controls.fullname.setValue(this.masterObj.firstName);
  }


  filtercity(name: string) {
    return this.masterObj.cities !== undefined ? this.masterObj.cities.filter(city =>
      city.city_name.toLowerCase().indexOf(name.toLowerCase()) === 0) : [];
  }
  /* if it is not in cities */
  city_onblur(evt) {
    if (evt.target.value.trim() !== '') {
      if (!this.masterObj.cities.includes(this.institueserObj.txtCity.trim())) {

      }
    } else {

    }
  }

  onCountryChange(evt) {
    if (evt.value == null) {
      this.alertObj.warningAlert('Please select country');
    } else {
      this.masterObj.getStates(evt.value).subscribe(
        (data: Data) => {
          this.res = <Data>data;
          if (this.res.status == 1) {
            this.institueserObj.selCountry = evt.value;
            this.masterObj.states = this.res.data;
          } else {
            this.alertObj.warningAlert(this.res.message)
          }
        },
        (error) => {
          this.alertObj.consoleContent('On get states', error);
          if (error.status === 404) {
            this.alertObj.errorAlert('Please contact Administrator.  ' + error.message);
          } else if (error.status === 401) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status === 500) {
            this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
          } else if (error.status > 0) {
            this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
          }
        }
      );
    }

  }
  onStateChange(evt) {
    if (evt.value == null) {
      this.alertObj.warningAlert('Please select state');
    } else {
      this.masterObj.getCities(evt.value).subscribe(
        (data: Data) => {

          this.res = <Data>data;
          if (this.res.status == 1) {
            this.masterObj.cities = this.res.data;
            this.institueserObj.selState = evt.value;

          } else {
            this.alertObj.warningAlert(this.res.message)
          }
        },
        (error) => {
          this.alertObj.consoleContent('On get countries', error);
          if (error.status === 404) {
            this.alertObj.errorAlert('Please contact Administrator.  ' + error.message);
          } else if (error.status === 401) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status === 500) {
            this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
          } else if (error.status > 0) {
            this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
          }
        }
      );
    }
  }

  onedit() {

    this.Institute_form.enable();
    this.Institute_form.controls.mobile.disable();
    this.Institute_form.controls.email.disable();
  }

  onUpdate() {
    this.institueserObj.consolecontent(this.Institute_form);
    if (this.Institute_form.invalid) {
      this.submitFlag = true;
      this.alertObj.warningAlert("Please enter valid details in required fields");

    }
    else {
      this.submitFlag = false;
      this.submitEvent.emit({ form: this.Institute_form });


    }
  }

  onCancel() {
    this.btnCancel.emit()
  }
}

