import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { MasterService, Data } from '../../services/master.service';
import { InstituteService } from '../services/institute.service';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router/';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-institute-registration',
  templateUrl: './institute-registration.component.html',
  styleUrls: ['./institute-registration.component.css']
})
export class InstituteRegistrationComponent implements OnInit, AfterViewInit {
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
    'Address_1': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]+([, _ -]?[a-zA-Z0-9])*$')]),
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
    private router: Router) {
    this.institueserObj.user_id = this.masterObj.userId;
    if(this.masterObj.userId == null || this.masterObj.userId == undefined){
      this.masterObj.clearData();
      this.institueserObj.ClearData();
      this.router.navigate(['/login']);
    }
    /* city filter */
    if (this.activeroute.snapshot.routeConfig.path === 'institute-registration') {

      this.btnText = "Save";
      this.institueserObj.getInstituteDetails(this.institueserObj.user_id).subscribe(
        (data: Data) => {
          var res: any = <Data>data;
          if (res.status == 1) {
            var arr = res.data;
            if (arr.length > 0) {
              this.institueserObj.instituteId = arr[0].iid;
              localStorage.setItem('Iid', arr[0].iid);
              this.masterObj.headerName = arr[0].institute_name.toUpperCase();
              localStorage.setItem('headerName', this.masterObj.headerName);
              if (arr[0].logo !== '' && arr[0].logo !== null) {
                this.masterObj.logo = this.masterObj.getimages('logos', arr[0].logo)
              }
              localStorage.setItem('logo', this.masterObj.logo);
              this.router.navigate(['institute/institute-dashboard']);
            }
          }
        },
        (error) => {
          if (error.status === 404) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status === 401) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status === 500) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status > 0) {
            this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
          } 
        }
      );
    } else {
      this.btnText = "Update";
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
          this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
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
    if(this.btnText == "Save")
      this.Institute_form.controls.fullname.setValue(this.masterObj.firstName);
  }

  ngAfterViewInit() {
  
  }
  filtercity(name: string) {
    return this.masterObj.cities !== undefined ? this.masterObj.cities.filter(city =>
      city.city_name.toLowerCase().indexOf(name.toLowerCase()) === 0) : [];
  }
  /* if it is not in cities */
  city_onblur(evt) {
    if (evt.target.value.trim() !== '') {
      if (!this.masterObj.cities.includes(this.institueserObj.txtCity.trim())) {
        this.institueserObj.instituealert('not in cities');
      }
    } else {

    }
  }

  onCountryChange(evt) {
    if (evt.value == null) {
      this.institueserObj.instituealert('Please select country')
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
          }else if (error.status > 0) {
            this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
          } 
        }
      );
    }

  }
  onStateChange(evt) {
    if (evt.value == null) {
      this.institueserObj.instituealert('Please select state')
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
      this.alertObj.errorAlert("Please enter valid details in required fields");
      window.scrollTo(0, 0);
    }
    else {
      this.submitFlag = false;
      var url = this.activeroute.snapshot.routeConfig.path;
      var cityId = 0;
      var temp = this.masterObj.cities.filter(x => x.city_name === this.institueserObj.txtCity.trim());
      if (temp.length > 0) {
        cityId = temp[0].id;
      } else {
        // var temp = this.masterObj.cities.filter(x => x.city_name === this.institueserObj.txtCity.trim());
        
      }
      var secNo = (this.Institute_form.controls.i_secNo.value == undefined || this.Institute_form.controls.i_secNo.value == null) ? '' : this.Institute_form.controls.i_secNo.value
      var iType = this.institueserObj.i_type[0];
      for (var j = 1; j < this.institueserObj.i_type.length; j++) {
        iType = iType + ',' + this.institueserObj.i_type[j];
      }

      if (url === 'institute-registration') {
        var options = {
          inst_name: this.institueserObj.i_name,
          inst_typ: iType,
          cont_per: this.Institute_form.controls.fullname.value,
          cont_pri_num: this.Institute_form.controls.mobile.value,
          cont_sec_num: secNo,
          door_no: this.Institute_form.controls.Address_1.value.trim(),
          street_name: this.Institute_form.controls.Address_2.value,
          area: this.Institute_form.controls.i_area.value.trim(),
          landmark: this.Institute_form.controls.i_landmark.value,
          city: cityId,
          state: this.institueserObj.selState,
          pincode: this.Institute_form.controls.i_pin.value,
          country: this.institueserObj.selCountry,
          user_id: this.institueserObj.user_id
        };
        this.institueserObj.PostRegisterInstitute(options).subscribe(
          (data: Data) => {
            this.res = <Data>data;
            if (this.res.status == 1) {
              // this.institueserObj.instituteId = this.res.data[0].iid;
              this.alertObj.topRoghtAlert('Institute Registered Successfully');
              this.router.navigate(['institute/institute-dashboard']);
            } else {
              this.alertObj.topRoghtAlert(this.res.message + 'please try after sometime')
            }
          },
          (error) => {
            this.alertObj.consoleContent('On institute registration', error);
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
        )
        // this.btnText = 'Add';
      } else {

        /* form disabled only about content API  else edited whole form (whole form update API)        */
        if (this.Institute_form.disabled) {
          this.institueserObj.consolecontent(this.ckeditorContent);
          if (this.institueserObj.instituteId === null) {
            this.institueserObj.instituteId = parseInt(localStorage.getItem('Iid'), 10);
          } else if (this.ckeditorContent === '' || this.ckeditorContent === undefined) {
            this.institueserObj.instituealert('Please enter about institute');
          } else {
            const options = {
              id: this.institueserObj.instituteId,
              about: this.ckeditorContent
            }
            this.institueserObj.consolecontent(options);
            this.institueserObj.putAbout(options).subscribe(
              (data: Data) => {
                this.res = <Data>data;
                if (this.res.status === 1) {
                  this.Institute_form.disable();
                }
              },
              (error) => {
                this.alertObj.consoleContent('On update institute profile', error);
                if (error.status === 404) {
                  this.alertObj.errorAlert('Please contact Administrator.  ' + error.message);
                } else if (error.status === 401) {
                  this.alertObj.errorAlert(error.error.message);
                } else if (error.status === 505) {
                  this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
                } 
              });
          }
        } else {

          if (this.institueserObj.instituteId === null && this.institueserObj.instituteId == undefined) {
            this.institueserObj.instituteId = parseInt(localStorage.getItem('Iid'), 10);
          }
          var iType = this.institueserObj.i_type[0];
          for (var j = 1; j < this.institueserObj.i_type.length; j++) {
            iType = iType + ',' + this.institueserObj.i_type[j];
          }
          var secNo = (this.Institute_form.controls.i_secNo.value == undefined || this.Institute_form.controls.i_secNo.value == null) ? '' : this.Institute_form.controls.i_secNo.value;
          var putoptions = {
            inst_id: this.institueserObj.instituteId,
            inst_name: this.institueserObj.i_name,
            inst_typ: iType,
            cont_per: this.Institute_form.controls.fullname.value,
            cont_pri_num: this.Institute_form.controls.mobile.value,
            cont_sec_num: secNo,
            door_no: this.Institute_form.controls.Address_1.value.trim(),
            street_name: this.Institute_form.controls.Address_2.value,
            area: this.Institute_form.controls.i_area.value.trim(),
            landmark: this.Institute_form.controls.i_landmark.value,
            city: cityId,
            state: this.institueserObj.selState,
            pincode: this.Institute_form.controls.i_pin.value,
            country: this.institueserObj.selCountry,
            about: this.ckeditorContent == null ? '' : this.ckeditorContent
          };
          this.institueserObj.PutInstitutebyId(putoptions).subscribe(
            (data: Data) => {
              this.res = <Data>data;
              if (this.res.status == 1) {
                // this.institueserObj.instituteId = this.res.data[0].iid;
                this.Institute_form.controls.mobile.disabled;
                this.Institute_form.controls.email.disabled;
                this.alertObj.topRoghtAlert('Updated Successfully');
                // this.router.navigate(['institute/institute-dashboard']);
                this.Institute_form.disable();
              } else {
                this.alertObj.warningAlert(this.res.message + 'please try after sometime')
              }
            },
            (error) => {
              this.alertObj.consoleContent('On update instittute profile', error);
              if (error.status === 404) {
                this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
              } else if (error.status === 401) {
                this.alertObj.errorAlert(error.error.message);
              } else if (error.status === 500) {
                this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
              } else if (error.status > 0) {
                this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
              } 
            }
          )
        }
      }
    }
  }

  onCancel() {
    this.btnCancel.emit()
  }
}

// export class Customer {
//   constructor(
//     public Id: any

//   ) { }
// }