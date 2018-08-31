import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';
import { InstituteService } from '../services/institute.service';
import { CommonService } from '../../services/common.service';
import { Data, MasterService } from '../../services/master.service';
import { DatePipe } from '@angular/common';
import { AlertsService } from '../../services/alerts.service';
// var CKEDITOR_BASEPATH = '../node_modules/ckeditor/';





@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {
  url = '';
  btnText = '';
  bid = null;
  submitFlag = false;
  status: number = null;
  status_options = [
    { id: 1, value: 'Online Training' },
    { id: 2, value: 'Classroom Training' },
    { id: 3, value: 'Training & Placement' },
  ];
  ckeditorContent = '';
  Selectedfee = 1;
  course: number = null;
  course_options = [
    { id: 1, courseName: 'C++' },
    { id: 2, courseName: 'Angular-complete' }
  ];
  months: any;
  days: any;
  minDate = new Date();
  startDt: Date;
  c_startTime: any;
  c_endTime: any;
  demostartDate: Date;
  demostartTime: any;
  Demotodt: Date;
  demoendTime: any;
  toAmountFlag = false;
  t_mode = [];
  tempbatchTable = [];
  form = new FormGroup(
    {
      'course': new FormControl(null, [Validators.required]),
      'facName': new FormControl(null, [Validators.required]),
      // 'facExp': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]),
      'batchName': new FormControl('', [Validators.pattern('[a-zA-Z0-9]+([, _ -]?[a-zA-Z0-9])*$')]),
      'teachMode': new FormControl(null, [Validators.required]),
      'session': new FormControl(null, [Validators.required]),
      // 'duration': new FormControl(null, [Validators.required]),
      'months': new FormControl(null, [Validators.required]),
      'days': new FormControl(null, [Validators.required]),
      'fee': new FormControl(),
      // 'fixed': new FormControl(null,[Validators.pattern('^[1-9]+[0-9]*$')]),
      'fromRange': new FormControl(null, [Validators.pattern('^[1-9]+[0-9]*$')]),
      'toRange': new FormControl(null, [Validators.pattern('^[1-9]+[0-9]*$')]),
      'start': new FormControl(null),
      'fromdt': new FormControl(null),
      'todt': new FormControl(null),
      'c_startTime': new FormControl(null),
      'c_endTime': new FormControl(null),
      'demostartTime': new FormControl(null),
      'demoendTime': new FormControl(null),
      'about': new FormControl('')
    }
  );
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




  constructor(private routerobj: Router, public instiServObj: InstituteService,
    private alertObj: AlertsService,
    public masterObj: MasterService,
    public commonServObj: CommonService, private datepipe: DatePipe,
    private activeroute: ActivatedRoute,
    private router: Router) {
    this.url = this.activeroute.snapshot.routeConfig.path;
    this.months = this.commonServObj.months;
    this.days = this.commonServObj.days;
    if (this.instiServObj.user_id === null)
      this.instiServObj.user_id = parseInt(localStorage.getItem('userId'), 10);
    if (this.instiServObj.instituteId === null)
      this.instiServObj.instituteId = parseInt(localStorage.getItem('Iid'), 10);
  }

  ngOnInit() {
    this.getmasterData();
    if (this.url === 'batch-create') {
      this.btnText = 'Add';

    } else {
      this.btnText = 'Update';
      this.activeroute.params.subscribe(
        (param: Params) => {
          this.bid = param['bid'];
          if (this.bid !== undefined && this.instiServObj.batchTable.length > 0) { // 
            this.tempbatchTable = this.instiServObj.batchTable.filter(x => x.bid === parseInt(this.bid, 10));
            this.bindData(this.bid);
          }
          else {
            this.router.navigate(['/institute/batches-list']);
          }
        }
      );
    }
    // this.startDt = new Date(2018,7,6);
  }


  getmasterData() {

    this.masterObj.getSessionTypes().subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        this.masterObj.sessionType = res.data;
      },
      (error) => {
        this.alertObj.consoleContent('error occured while get session', error);
        if (error.status === 404) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 505) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        } 
      }
    );
    this.instiServObj.getTeachMode().subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        this.instiServObj.tech_mode = res.data;
      },
      (error) => {
        this.alertObj.consoleContent('error occured while get teching mode', error);
        if (error.status === 404) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 505) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        }  else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        } 
      }
    );
    this.instiServObj.getCourseList(this.instiServObj.user_id).subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        this.instiServObj.courseList = res.data;
       
      },
      (error) => {
        this.alertObj.consoleContent('error occured while get courses', error);
        if (error.status === 404) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 505) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        }  else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        } 
      }
    );
    this.instiServObj.getFacultydrp(this.instiServObj.user_id).subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        this.instiServObj.facList = res.data;
      },
      (error) => {
        this.alertObj.consoleContent('error occured while get faculty', error);
        if (error.status === 404) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 505) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        }  else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        } 
      }
    );
    this.masterObj.getFeetypes().subscribe(
      (data: Data) => {
        var res: any = <Data>data;

        this.masterObj.feeTypes = [];
        this.masterObj.feeTypes = res.data;
      },
      (error) => {
        this.alertObj.consoleContent('error occured while get courses', error);
        if (error.status === 404) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 505) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        }  else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        } 
      }
    );
  }

  bindData(bid) {
    if (bid !== undefined) {
      var arra = this.tempbatchTable;
      if (arra.length > 0) {
        this.form.controls.course.setValue(parseInt(arra[0].course_id, 10));
        this.form.controls.facName.setValue(parseInt(arra[0].faculty_id, 10));
        // this.form.controls.facExp.setValue(arra[0].course_id);
        var exp;
        if (this.instiServObj.facList.length > 0) {

        } else {
          this.instiServObj.getFacultydrp(this.instiServObj.user_id).subscribe(
            (data: Data) => {
              var res: any = <Data>data;
              this.instiServObj.facList = res.data;
            },
            (error) => {
              this.alertObj.consoleContent('error occured while get faculty', error);
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
          );
        }
        // this.form.controls.facExp.setValue(exp);
        this.form.controls.batchName.setValue(arra[0].batch_name);
        var modeArr = arra[0].teaching_mode === '' ? [] : arra[0].teaching_mode.split(',');
        for (let index = 0; index < modeArr.length; index++) {
          this.t_mode.push(parseInt(modeArr[index], 0));
        }
        //this.form.controls.teachMode.setValue(parseInt(arra[0].teaching_mode, 10)); // session_typ
        this.form.controls.session.setValue(parseInt(arra[0].session_type_id, 10));
        this.form.controls.months.setValue(parseInt(arra[0].duration_months, 10));
        this.form.controls.days.setValue(parseInt(arra[0].duration_days, 10));

        this.Selectedfee = arra[0].fee_type;
        if (this.Selectedfee === 2) {
          this.form.addControl('fixed', new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]), );
          this.form.controls.fixed.setValue(arra[0].fee_from);

        } else if (this.Selectedfee === 3) {
          // this.form.controls.fixed.setValue(arra[0].course_id);
          this.form.addControl('fromRange', new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]), );
          this.form.addControl('toRange', new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]), );
          this.form.controls.fromRange.setValue(arra[0].fee_from);
          this.form.controls.toRange.setValue(arra[0].fee_to);
        } else {
          this.form.removeControl('fixed');
          this.form.removeControl('fromRange');
          this.form.removeControl('toRange');
        }
        // this.form.controls.start.setValue(new Date(arra[0].startson));
        this.startDt = this.fromatdate(arra[0].startson);
        // this.form.setValue({
        //   'start': new Date(arra[0].startson,
        // })
        this.c_startTime = this.formattime(arra[0].from_time);
        this.c_endTime = this.formattime(arra[0].to_time);
        this.demostartDate = this.fromatdate(arra[0].demo_from_date);
        this.Demotodt = this.fromatdate(arra[0].demo_to_date);
        this.demostartTime = this.formattime(arra[0].demo_start_time);
        this.demoendTime = this.formattime(arra[0].demo_end_time);
        this.ckeditorContent = arra[0].course_content;
        this.form.disable();
      }

    }
  }

  /* to desired date $ time format for binfing */
  fromatdate(value) {
    if ((typeof value === 'string') && (value.indexOf('-') > -1)) {
      const str = value.split('-');
      const year = Number(str[0]);
      const month = Number(str[1]) - 1;
      const date = Number(str[2]);

      return new Date(year, month, date);
    }
  }
  formattime(value) {
    if ((typeof value === 'string') && (value.indexOf(':') > -1)) {
      const str = value.split(':');
      // console.log(str);
      const hr = Number(str[0]);
      const min = Number(str[1]);
      // const date = Number(str[2]);
      var dt = new Date()
      return new Date(dt.getFullYear(), dt.getMonth(), dt.getDay(), hr, min);
    }
  }

  onFacultyChange(evt) {
    if (evt.value !== undefined) {
      var exp = this.instiServObj.facultyDetails.filter(
        x => x.fid == evt.value)[0].experience;
      // console.log(exp, this.instiServObj.facultyDetails.filter(
      //   x => x.fid == evt.value));
      this.form.controls.facExp.setValue(exp);
    }
    // this.form.
  }

  onSearch() {
    if (this.status === null) {
      alert('Please select Status');
    } else if (this.course === null) {
      alert('please select Couse');
    } else {

    }
  }


  onfeeChange(evt) {
    console.log(evt);
    if (evt.value === 2) {
      this.form.removeControl('fromRange');
      this.form.removeControl('toRange');
      this.form.addControl('fixed', new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]), );
    } else if (evt.value === 3) {
      this.form.removeControl('fixed');
      this.form.addControl('fromRange', new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]), );
      this.form.addControl('toRange', new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]), );

    } else {
      this.form.removeControl('fixed');
      this.form.removeControl('fromRange');
      this.form.removeControl('toRange');
    }
  }
  onEdit(i, row) {
    alert('edit');
    this.routerobj.navigate(['/institute/batch-edit']);
  }

  onCancel() {
    if (this.btnText === 'Add') {
      this.form.reset();
      this.router.navigate(['/institute/batches-list']);
    } else {
      // getBatchBYid
      this.instiServObj.getBatchBYid(this.bid).subscribe(
        (data: Data) => {
          var res: any = <Data>data;
          var arr = res.data
          if (res.status === 1) {
            this.tempbatchTable = arr;
            this.bindData(this.bid);
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
      // this.bindData(this.bid);
    }
  }

getnative(){

}
  tofeeOnBlur(evt) {
    var to = this.form.controls.toRange.value;
    var from = this.form.controls.fromRange.value;
    if ((from !== '' || from !== null) && (to !== '' || to !== null)) {
      if (parseInt(to, 10) < parseInt(from, 10)) {
        // (<any>this.form.get('toRange')).nativeElement.focus();
        this.alertObj.errorAlert('To Amount should be greater than From Amount');
        this.toAmountFlag = true;
      } else {
        this.toAmountFlag = false;
      }
    }
  }


  onBatchSubmit() {
    // console.log(this.form);
    if (this.form.invalid) {
      this.submitFlag = true;
      this.alertObj.warningAlert("Please enter valid details in required fields").then(
        dt => {
          // document.body.scrollTop;
        });
    } else if (this.toAmountFlag) {
      this.alertObj.infoAlert('To Amount should be greater than From Amount');
    } else {
      this.submitFlag = false;
      // sp_post_institute_batch(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      // [data.uid,data.cid,data.faculty_id,data.batch_name,data.teaching_mode,data.session_type,data.duration_months,
      // data.duration_days,data.fee_type,data.fee_from,data.fee_to,data.demo_start_date,data.demo_end_date
      //,data.demo_start_time,data.demo_end_time,data.starts_on,data.start_from_time,data.start_end_time,data.course_content],res)
      var mode
      if (this.t_mode.length > 0) {
        mode = this.t_mode[0];
        for (let index = 1; index < this.t_mode.length; index++) {
          mode = mode + ',' + this.t_mode[index];
        }
      }

      if (this.btnText === 'Add') {
        var minfee;
        var maxfee;
        if (this.form.controls.fee.value == 1) {
          minfee = 0;
          maxfee = 0;
        } else if (this.form.controls.fee.value == 2) {
          minfee = this.form.controls.fixed.value;
          maxfee = this.form.controls.fixed.value;
        } else {
          minfee = this.form.controls.fromRange.value;
          maxfee = this.form.controls.toRange.value;
        }
        const options = {
          uid: this.instiServObj.user_id,
          cid: this.form.controls.course.value,
          faculty_id: this.form.controls.facName.value,
          // faculty_exp: this.form.controls.facExp.value,
          batch_name: this.form.controls.batchName.value,
          teaching_mode: mode, // this.form.controls.teachMode.value,
          session_type: this.form.controls.session.value,
          duration_months: this.form.controls.months.value,
          duration_days: this.form.controls.days.value,
          fee_type: this.form.controls.fee.value,
          fee_from: minfee,
          fee_to: maxfee,
          demo_start_date: this.form.controls.fromdt.value,
          demo_end_date: this.form.controls.todt.value,
          demo_start_time: this.datepipe.transform(this.demostartTime, 'HH:mm'),
          demo_end_time: this.datepipe.transform(this.demoendTime, 'HH:mm'),
          starts_on: this.form.controls.start.value,
          start_from_time: this.datepipe.transform(this.c_startTime, 'HH:mm'),// this.form.controls.c_startTime.value,
          start_end_time: this.datepipe.transform(this.c_endTime, 'HH:mm'),//this.form.controls.c_endTime.value,
          course_content: this.ckeditorContent
        }

        this.instiServObj.postBatch(options).subscribe(
          (data: Data) => {
            var res: any = <Data>data;
            if (res.status === 1) {
              this.alertObj.topRoghtAlert('Batch Created Successfully');
              this.router.navigate(['/institute/batches-list']);
            }
          },
          (error) => {
            this.alertObj.consoleContent('error occured while add batch', error);
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
        );
      } else {
        var minfee;
        var maxfee;
        if (this.form.controls.fee.value == 1) {
          minfee = 0;
          maxfee = 0;
        } else if (this.form.controls.fee.value == 2) {
          minfee = this.form.controls.fixed.value;
          maxfee = this.form.controls.fixed.value;
        } else {
          minfee = this.form.controls.fromRange.value;
          maxfee = this.form.controls.toRange.value;
        }
        const putoptions = {
          bid: this.bid,
          // uid: this.instiServObj.user_id,
          cid: this.form.controls.course.value,
          faculty_id: this.form.controls.facName.value,
          // faculty_exp: this.form.controls.facExp.value,
          batch_name: this.form.controls.batchName.value,
          teaching_mode: mode, //this.form.controls.teachMode.value,
          session_type: this.form.controls.session.value,
          duration_months: this.form.controls.months.value,
          duration_days: this.form.controls.days.value,
          fee_type: this.form.controls.fee.value,
          fee_from: minfee,
          fee_to: maxfee,
          demo_start_date: this.form.controls.fromdt.value,
          demo_end_date: this.form.controls.todt.value,
          demo_start_time: this.datepipe.transform(this.demostartTime, 'HH:mm'),
          demo_end_time: this.datepipe.transform(this.demoendTime, 'HH:mm'),
          starts_on: this.form.controls.start.value,
          start_from_time: this.datepipe.transform(this.c_startTime, 'HH:mm'),
          start_end_time: this.datepipe.transform(this.c_endTime, 'HH:mm'),
          course_content: this.ckeditorContent == null ? '' : this.ckeditorContent
        }
        // console.log(options);
        this.instiServObj.putBatchbyId(putoptions).subscribe(
          (data: Data) => {
            var res: any = <Data>data;
      
            if (res.status === 1) {
              this.alertObj.topRoghtAlert('Updated Successfully');
              this.form.disable();
              // this.router.navigate(['/institute/batches-list']);
            }
          },
          (error) => {
            this.alertObj.consoleContent('error occured while get faculty', error);
            if (error.status === 404) {
              this.alertObj.errorAlert('Please contact Administrator. ' + error.message);
            } else if (error.status === 401) {
              this.alertObj.errorAlert(error.error.message);
            } else if (error.status === 500) {
              this.alertObj.errorAlert('Please contact Administrator. ');
            } else if (error.status > 0) {
              this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
            } 
          }
        );
      }
    }
  }

  

}
/*

const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
FormControlName.prototype.ngOnChanges = function () {
  const result = originFormControlNameNgOnChanges.apply(this, arguments);
  this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
  return result;
};
*/