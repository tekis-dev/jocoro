import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommonService } from '../../services/common.service';
import { InstituteService } from '../services/institute.service';
import { Data } from '../../services/master.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.css']
})
export class AddFacultyComponent implements OnInit {
  url = '';
  btnText = '';
  submitFlag = false;
  ckeditorContent = '';
  fid: number = null;
  tempFacTable = []
  form = new FormGroup({
    'facName': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    'exp': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]),
    'about': new FormControl(''),
    'mobile': new FormControl(null, [Validators.minLength(10), Validators.pattern('^[1-9]+[0-9]*$')]
    ),
    'email': new FormControl('', [Validators.pattern('^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$')]),
  })

  ckEditorConfig: {} = {
    // "uiColor": "#99000",
    "toolbarGroups": [
      { "name": "document", "groups": ["mode", "document", "doctools"] },
      { "name": "editing", "groups": ["find", "selection", "spellchecker", "editing"] },
      // { "name": "forms", "groups": ["forms"] },
      { "name": 'clipboard', "groups": ['clipboard', 'undo'] },
      { "name": 'insert' },
      { "name": 'basicstyles', "groups": ['basicstyles', 'cleanup'] },
      { "name": 'paragraph', "groups": ['list', 'indent', 'blocks', 'align', 'bidi'] },
      { "name": 'styles' },
      { "name": 'colors' },

    ],
    "removeButtons": "Iframe,Flash,New page,Form,Print,Source,Save,Templates,Find,Replace,Scayt,SelectAll",
    "extraPlugins": "divarea"
  }
  constructor(private alertObj: AlertsService,
    public commonObj: CommonService, public instituteObj: InstituteService,
    private router: Router, private activerouteObj: ActivatedRoute
  ) {
    if (this.instituteObj.instituteId === null)
      this.instituteObj.instituteId = parseInt(localStorage.getItem('Iid'), 10);
  }

  ngOnInit() {
    this.url = this.activerouteObj.snapshot.routeConfig.path;
    if (this.url === 'add faculty') {
      this.commonObj.breadcrum = 'Add Faculty';
      this.btnText = 'Add';
    } else {
      this.commonObj.breadcrum = 'Edit Faculty';
      this.btnText = 'Update';
      this.activerouteObj.params.subscribe(
        (param: Params) => {
          this.fid = param['fid'];
          if (this.fid !== undefined && this.instituteObj.facTable.length > 0) {
            this.tempFacTable = this.filterFactableOnFid(parseInt(this.fid.toString(),10));
            this.bindData(this.fid);
          }
          else {
            this.router.navigate(['/institute/faculty Details']);
          }
        }
      );
    }

  }
  bindData(fid) {

    var tempFacTable = this.tempFacTable;
    if (tempFacTable.length > 0) {
      this.form.controls.facName.setValue(tempFacTable[0].faculty_name);
      this.form.controls.exp.setValue(tempFacTable[0].experience);
      this.ckeditorContent = tempFacTable[0].about;
      this.form.controls.mobile.setValue(tempFacTable[0].phone);
      this.form.controls.email.setValue(tempFacTable[0].email);
      this.form.disable();
    }


  }
  filterFactableOnFid(id: number) {

    return this.instituteObj.facTable
      .filter(
      rows => {
        console.log(rows);
        return rows.fid === id
      }
      );
  }
  onback() {
    this.router.navigate(['/institute/faculty Details']);
  }
  onedit() {
    this.form.enable();
  }
  onCancel() {
    if (this.btnText === 'Add') {
      this.form.reset();
      this.ckeditorContent = '';
      this.router.navigate(['/institute/faculty Details']);
    } else {
      // this.router.navigate(['/institute/faculty Details']);
      this.instituteObj.getFacultyBYid(this.fid).subscribe(
        (data: Data) => {
          var res: any = <Data>data;
          var arr = res.data
          if (res.status === 1) {
            this.tempFacTable = arr;
            this.bindData(this.fid);
          } else {
            this.alertObj.infoAlert(res.message);
          }
        },
        (error) => {
          this.alertObj.consoleContent('error at get faculty', error);
          if (error.status === 404) {
            this.alertObj.errorAlert('Please contact Administrator. ' + error.message);
          } else if (error.status === 401) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status === 500) {
            this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
          } else if (error.status > 0) {
            this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
          } 
        }
      )
      
    }
  }

  onFacAdd() {
      if (!this.form.valid) {
      this.submitFlag = true;
      this.alertObj.warningAlert("Please enter valid details in required fields").then(
        dt =>{
          window.scrollTo(0, 0);
          document.body.scrollTop = 0;
        }
      );
    } else {
      this.submitFlag = false;
      if (this.btnText === 'Add') {
        var options = {
          inst_id: this.instituteObj.instituteId,
          // uid:this.instituteObj.user_id,
          faculty_name: this.form.controls.facName.value,
          experience: this.form.controls.exp.value,
          about: this.ckeditorContent == null ? '' : this.ckeditorContent,
          phone: this.form.controls.mobile.value == null ? "" : this.form.controls.mobile.value,
          email: this.form.controls.email.value
        }
        this.instituteObj.postNewFaculty(options).subscribe(
          (data: Data) => {
            var res: any = <Data>data;
            var arr = res.data
            if (res.status === 1) {
              // this.fid = arr[0].faculty_id;
              this.alertObj.topRoghtAlert('Faculty Added Successfully');
              this.form.disable();
              this.router.navigate(['/institute/faculty Details']);
            } else {
              this.alertObj.warningAlert('Error occured while posting');
            }
          },
          (error) => {
            this.alertObj.consoleContent('error occured adding faculty', error);
            if (error.status === 404) {
              this.alertObj.errorAlert('Please contact Administrator. ' + error.message);
            } else if (error.status === 401) {
              this.alertObj.errorAlert(error.error.message);
            } else if (error.status === 500) {
              this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
            }  else if (error.status > 0) {
              this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
            } 
          }
        );

      } else {
        /* update fac detais */

        var putoptions = {
          fid: this.fid,
          inst_id: this.instituteObj.instituteId,
          faculty_name: this.form.controls.facName.value,
          experience: this.form.controls.exp.value,
          about: this.ckeditorContent == null ? '' : this.ckeditorContent,
          phone: this.form.controls.mobile.value == null ? "" : this.form.controls.mobile.value,
          email: this.form.controls.email.value
        }

        this.instituteObj.putFacultybyId(putoptions).subscribe(
          (data: Data) => {
            var res: any = <Data>data;
            if (res.status === 1) {
              this.alertObj.topRoghtAlert('Updated Successfully');
              this.form.disable();
            } else {
              this.alertObj.errorAlert('Error occured while updating, please try again later');
            }
          },
          (error) => {
            this.alertObj.consoleContent('error occured updating Faculty details', error);
            if (error.status === 404) {
              this.alertObj.errorAlert('Please contact Administrator. ' + error.message);
            } else if (error.status === 401) {
              this.alertObj.errorAlert(error.error.message);
            } else if (error.status === 500) {
              this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
            }  else if (error.status > 0) {
              this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
            } 
          }
        );
      }
    }
  }
}
