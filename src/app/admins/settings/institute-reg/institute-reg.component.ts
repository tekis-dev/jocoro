import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { MasterService, Data } from '../../services/master.service';
import { AlertsService } from '../../services/alerts.service';
import { InstituteService } from '../../services/institute.service';

@Component({
  selector: 'app-institute-reg',
  templateUrl: './institute-reg.component.html',
  styleUrls: ['./institute-reg.component.css']
})
export class InstituteRegComponent implements OnInit, OnDestroy {
  @ViewChild('regForm') form: any;
  Institute_Type: Array<any>;
  // Institute_form: FormGroup;
  confirm_form: FormGroup;
  submitFlag = false;
  isLinear = false;
  
  constructor(private instituteserObj: InstituteService,
    private masterObj: MasterService,
    private alertObj: AlertsService,
    private router: Router,
    private route:ActivatedRoute
  ) {
    this.Institute_Type = [
      { id: 1, type_value: 'Online Training' },
      { id: 2, type_value: 'Classroom Training' },
      { id: 3, type_value: 'Training & Placement' },
      { id: 4, type_value: 'All' }
    ];
  }

  ngOnInit() {


  }


  onRegistration(f) {
    var i_form: FormGroup = f.form;
    if (i_form.valid) {
      var cityId = 0;
      var temp = this.masterObj.cities.filter(x => x.city_name === this.instituteserObj.txtCity.trim());
      if (temp.length > 0) {
        cityId = temp[0].id;
      } else {
        // var temp = this.masterObj.cities.filter(x => x.city_name === this.instituteserObj.txtCity.trim());

      }
      var secNo = (i_form.controls.i_secNo.value == undefined || i_form.controls.i_secNo.value == null) ? '' : i_form.controls.i_secNo.value
      var iType = this.instituteserObj.i_type[0];
      for (var j = 1; j < this.instituteserObj.i_type.length; j++) {
        iType = iType + ',' + this.instituteserObj.i_type[j];
      }

      var options = {
        inst_name: this.instituteserObj.i_name,
        inst_typ: iType,
        cont_per: i_form.controls.fullname.value,
        cont_pri_num: i_form.controls.mobile.value,
        cont_sec_num: secNo,
        door_no: i_form.controls.Address_1.value.trim(),
        street_name: i_form.controls.Address_2.value,
        area: i_form.controls.i_area.value.trim(),
        landmark: i_form.controls.i_landmark.value,
        city_id: cityId,
        city_name: this.instituteserObj.txtCity.trim(),
        state: this.instituteserObj.selState,
        pincode: i_form.controls.i_pin.value,
        country: this.instituteserObj.selCountry,
        user_id: this.masterObj.userId
      };
      this.instituteserObj.PostRegisterInstitute(options).subscribe(
        (data: Data) => {
          var res: any = <Data>data;
          if (res.status == 1) {
            this.alertObj.topRoghtAlert('Institute Registered Successfully');
            this.masterObj.moduleCreated = 1;
            localStorage.setItem('moduleCreated', this.masterObj.moduleCreated.toString());
            this.router.navigate(['../../institute/institute-dashboard'],{relativeTo: this.route});
          } else {
            this.alertObj.topRoghtAlert(res.message + 'please try after sometime')
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


    }
  }
  onCancel() {
    this.form.Institute_form.reset();
  }
  ngOnDestroy() {
    this.masterObj.navtoggle = false;
  }
}
