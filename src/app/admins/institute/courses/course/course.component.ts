import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes'
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';

import { CommonService } from '../../../services/common.service';
import { AlertsService } from '../../../services/alerts.service';
import { MasterService, Data } from '../../../services/master.service';
import { InstituteService } from '../../../services/institute.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  submitFlag = false;
  btnCourse = 'Save';
  url = '';
  files: File;
  cid: any;
  courseOptions = [
    // { id: 1, courseName: 'C++' },
    // { id: 2, courseName: 'Angular-complete' }
  ];
  qualiOption = [
    { name: 'B.Tech' },
    { name: 'MCA' }
  ];
  selectedqualiOption = [];
  filteredcourse: Observable<any[]>;
  filteredqualification: Observable<any[]>;
  subcourse: any = [];
  subCorse_ARR = [];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  addOnBlurquali: boolean = false;
  months = [];
  days = [];
  Selectedfee = 0;
  toAmountFlag = false;
  logo_file = null;
  logoname= '';
  logo_text = '';
  separatorKeysCodes = [ENTER, COMMA, TAB];
  fruitCtrl = new FormControl();
  filteredsubcourse: Observable<any[]>;

  @ViewChild('qualiER') qualiER: ElementRef;
  @ViewChild('Elsubcourse') subcourse_el: ElementRef;
  ckeditorContent: any = '';
  t_mode :any = [];
  tempCourseTable = [];
  form = new FormGroup(
    {
      'courseName': new FormControl(null, [Validators.required,]),
      // Validators.pattern('[a-zA-Z0-9]+([ -]?[a-zA-Z0-9])*$')
      'subcourseName': new FormControl(null),
      'mode': new FormControl(1, [Validators.required]),
      'qualification': new FormControl(null),
      'about': new FormControl(null),
      'months': new FormControl(null, [Validators.required]),
      'days': new FormControl(null, [Validators.required]),
      'fee': new FormControl(null),
      'fixed': new FormControl(null, [Validators.pattern('^[0-9]+[1-9]*$')]),
      'fromRange': new FormControl('', [Validators.pattern('^[0-9]+[1-9]*$')]),
      'toRange': new FormControl('', [Validators.pattern('^[0-9]+[1-9]*$')]),
      // 'logo': new FormControl(null)
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
  constructor(public commonserObj: CommonService, 
    public instituteservObj: InstituteService,
    private alertObj: AlertsService,
    private activeroute: ActivatedRoute,
     public masterObj: MasterService,
    private router: Router,
    private route:ActivatedRoute
  ) {
    this.months = this.commonserObj.months;
    this.days = this.commonserObj.days;

    this.url = this.activeroute.snapshot.routeConfig.path;
    this.instituteservObj.user_id = this.masterObj.userId;
    // else {
    //   this.instituteservObj.instituealert('error occured');
    //   this.router.navigate(['/institute/institute-dashboard'])
    // }
    this.getMasterData();
    /* course filter */
    this.filteredcourse = this.form.controls.courseName.valueChanges
      .pipe(
      startWith(''),
      map((state: string | null) => state ? this.filtercourse(state) : this.courseOptions.slice())
      );
    // filter sub course
    this.filteredsubcourse = this.form.controls.subcourseName.valueChanges.pipe(
      startWith(null),
      map((chip: string | null) => chip ? this.filter(chip) : this.subCorse_ARR.slice())
    );
    /* filtering qualification */
    this.filteredqualification = this.form.controls.qualification.valueChanges
      .pipe(
      startWith(''),
      map(state => state ? this.filterqualification(state) : this.qualiOption.slice())
      );


  }


  ngOnInit() {

    if (this.url === 'add') {
      this.btnCourse = 'Add';
      this.logo_text = 'Upload logo';
    }
    else {
      this.btnCourse = 'Update';
      this.logo_text = 'Update logo';
      this.activeroute.params
        .subscribe(
        (param: Params) => {
          this.cid = param['cid'];
          if (this.cid !== undefined && this.instituteservObj.courseTable.length > 0) {
            this.tempCourseTable = this.filterOncid(parseInt(this.cid, 10));
            this.bindData(this.cid);
          }
          else {
            this.router.navigate(['institute/course'],{relativeTo:this.route});
          }
        }
        );
    }
  }

  getMasterData() {
    this.masterObj.getMasterCourses().subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        this.courseOptions = res.data;
      },
      (error) => {
        this.alertObj.consoleContent('error occured while get courses', error);
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
    this.instituteservObj.getTeachMode().subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        // console.log(res);
        this.instituteservObj.tech_mode = res.data;
      },
      (error) => {
        this.alertObj.consoleContent('error occured while get teching mode', error);
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
    this.masterObj.getFeetypes().subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        this.masterObj.feeTypes = res.data;
        this.masterObj.feeTypes = this.masterObj.feeTypes.slice(2, 3);

      },
      (error) => {
        this.alertObj.consoleContent('error occured while get feetypes', error);
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


  filtercourse(name: string) {
    return this.courseOptions.filter(state =>
      state.course_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  filterqualification(name: string) {
    return this.qualiOption.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  /* chip list code */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our subcourse
    if ((value || '').trim()) {

      this.subcourse.push(value.trim());
      this.subCorse_ARR.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.form.controls.subcourseName.setValue(null);
  }
  addQualifi(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add 
    if ((value || '').trim()) {

      this.selectedqualiOption.push(value.trim());
      this.qualiOption.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.form.controls.qualification.setValue(null);
  }
  remove(fruit: any): void {
    if (this.form.enabled) {
      const index = this.subcourse.indexOf(fruit);

      if (index >= 0) {
        this.subcourse.splice(index, 1);
      }
    }
  }
  removeQuali(chip) {
    if (this.form.enabled) {
      const index = this.selectedqualiOption.indexOf(chip);
      if (index >= 0) {
        this.selectedqualiOption.splice(index, 1);
      }
    }

  }
  filter(name: string) {
    return this.subCorse_ARR.filter(chip => chip.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.subcourse.includes(event.option.viewValue))
      this.subcourse.push(event.option.viewValue);
    this.subcourse_el.nativeElement.value = '';
    this.form.controls.subcourseName.setValue(null);
  }

  selectedQualifi(event: MatAutocompleteSelectedEvent): void {
    if (!this.selectedqualiOption.includes(event.option.viewValue))
      this.selectedqualiOption.push(event.option.viewValue);
    // this.filteredqualification = this.qualiOption.filter(obj => obj.name !== event.option.viewValue);

    this.qualiER.nativeElement.value = '';
    this.form.controls.qualification.setValue(null);
  }
  /* 
  course fee change fn
  */
  onFeeselect(event) {
    // console.log(event);
  }

  /****
   file upload event
   ****/
  handleFileInput(event) {
    if (event.target.files && event.target.files[0]) {
      this.files = event.target.files[0];
      const reader = new FileReader();
      const maxSize = 300;
      const image = new Image();
      const canvas = document.createElement('canvas');
      if (event.target.files[0].size < 102400) {
        reader.onload = (readerEvent: any) => {
          this.logo_file = readerEvent.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        reader.onload = (readerEvent: any) => {
          image.onload = () => resize();
          image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        const resize = () => {
          let width = image.width;
          let height = image.height;
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          let dataUrl = canvas.toDataURL('image/jpeg');
          this.logo_file = dataUrl;
          event.target.value = '';
          return dataUrl;
        };
      }
    } else {
      event.target.value  = '';
      this.files = null;
    }
  }

 
  /* databind for edit course */
  filterOncid(id: number) {
    return this.instituteservObj.courseTable
      .filter(
      rows => {
        // console.log(rows);
        return rows.cid === id
      }
      );
  }

  bindData(id) {
    this.selectedqualiOption = [];
    var c_details = this.tempCourseTable; //this.filterOncid(parseInt(id, 10));
    if (c_details.length > 0) {
      var feeid = c_details[0].fee_type; 
      var modeArr = c_details[0].course_type === '' ? [] : c_details[0].course_type.split(',');
      for (let index = 0; index < modeArr.length; index++) {
        this.t_mode.push(parseInt(modeArr[index],10));
      }
      var sub_c: string = c_details[0].sub_courses;
      if (sub_c !== '' && c_details[0].sub_courses !== null && c_details[0].sub_courses !== undefined && sub_c.includes(',')) {
        this.subcourse = c_details[0].sub_courses.split(',');
        // console.log(this.subcourse);
      } else {
        if (sub_c !== '' && !this.subcourse.includes(c_details[0].sub_courses))
          this.subcourse.push(c_details[0].sub_courses);
      }
      if (c_details[0].qualification !== '') {

        if (c_details[0].qualification !== null && c_details[0].qualification !== undefined && c_details[0].qualification.includes(',')) {
          this.selectedqualiOption = c_details[0].qualification.split(',');
          // console.log(this.subcourse);
        } else {
          this.selectedqualiOption.push(c_details[0].qualification);
        }
      }
      // this.form.controls.qualification.setValue(c_details[0].qualification);
      // this.courseOptions.push(c_details[0].course_name);
      this.form.controls.courseName.setValue(c_details[0].course_name);
      this.form.controls.months.setValue(parseInt(c_details[0].duration_months, 10));
      this.form.controls.days.setValue(parseInt(c_details[0].duration_days, 10));
      this.form.controls.fee.setValue(feeid);
      this.Selectedfee = feeid;
      // this.form.controls.mode.setValue(mode);
      this.form.controls.about.setValue(c_details[0].course_content);
      this.ckeditorContent = c_details[0].course_content;
      if (this.Selectedfee === 2) {
        this.form.controls.fixed.setValue(c_details[0].min_fee);
      } else if (this.Selectedfee === 3) {
        this.form.controls.fromRange.setValue(c_details[0].min_fee);
        this.form.controls.toRange.setValue(c_details[0].max_fee);
      } else {

      }
      // course_logo
      // this.logo_file = this.masterObj.getimages('courses', c_details[0].course_logo);
      this.logo_file = this.masterObj.url + '/images/' + c_details[0].course_logo;
      this.logoname = c_details[0].course_logo;
      
    }
    this.form.disable();
  }


  tofeeOnBlur(evt) {
    var to = this.form.controls.toRange.value;
    var from = this.form.controls.fromRange.value;
    if ((from !== '' || from !== null) && (to !== '' || to !== null)) {
      if (parseInt(to, 10) < parseInt(from, 10)) {
        this.alertObj.infoAlert('To Amount should be grater than From Amount');
        this.toAmountFlag = true;
      } else {
        this.toAmountFlag = false;
      }
    }
  }
  onAddCourse() {
    if (this.form.invalid) {
      this.submitFlag = true;
      this.alertObj.warningAlert("Please enter valid details in required fields");
      // window.scrollTo(0, 0);
    } else if(this.toAmountFlag){
      this.alertObj.infoAlert('To Amount should be greater than From Amount');
    }  else{
      this.toAmountFlag = false;
      this.submitFlag = false;
      var mode 
      if(this.t_mode.length > 0){
        mode = this.t_mode[0];
        for (let index = 1; index < this.t_mode.length; index++) {
         mode = mode + ','+ this.t_mode[index];         
        }
      }
      
      if (this.url === 'add') {
        var minfee = '';
        var maxfee = '';
        if (this.subcourse.length == 0) {
          if (this.form.controls.subcourseName.value !== null) {
            this.subcourse.push(this.form.controls.subcourseName.value);
          }
        }
        /* sub course */
        var sub;
        if (this.subcourse.length) {
          sub = this.subcourse[0];
          for (var i = 1; i < this.subcourse.length; i++) {
            sub = sub + ',' + this.subcourse[i];
          }
        } else {
          sub = '';
        }
        /* qualification */
        if (this.selectedqualiOption.length == 0) {
          if (this.form.controls.qualification.value !== null) {
            this.selectedqualiOption.push(this.form.controls.subcourseName.value);
          }
        }
        var tempquali;
        if (this.selectedqualiOption.length) {

          tempquali = this.selectedqualiOption[0];
          for (var i = 1; i < this.selectedqualiOption.length; i++) {
            tempquali = tempquali + ',' + this.selectedqualiOption[i];
          }
        } else {
          tempquali = '';
        }
        //  fee 
        if (this.form.controls.fee.value == 1) {
          minfee = '';
          maxfee = '';
        } else if (this.form.controls.fee.value == 2) {
          minfee = this.form.controls.fixed.value;
          maxfee = this.form.controls.fixed.value;
        } else {
          minfee = this.form.controls.fromRange.value;
          maxfee = this.form.controls.toRange.value;
        }
        // course name
        var cName: string = this.form.controls.courseName.value;
        var arr_cid = this.courseOptions.filter(x => x.course_name.toLowerCase() == cName.toLowerCase());
        
        var cid = arr_cid.length ?  arr_cid[0].cour_id : 0;
        // logo 
        var logo_name = '';
        if (this.files == null){
          this.logo_file = '';
          logo_name = this.logoname;
        }else {
          logo_name = '';
        }
        var options = {
          uid: this.instituteservObj.user_id,
          course_id: cid,
          course_name: cName,
          module:'courses',
          course_logo: this.logo_file, // empty if no file selected
          // course_logo_name: logo_name,  // if file selected = '' else  = 'oldname'
          sub_courses: sub,
          duration_months: this.form.controls.months.value,
          duration_days: this.form.controls.days.value,
          min_fee: minfee,
          max_fee: maxfee,
          fee_type: this.Selectedfee,
          qualification: tempquali,
          course_type: mode, // parseInt(this.form.controls.mode.value, 10),
          course_content: this.ckeditorContent == null ? '' : this.ckeditorContent
        }

        this.instituteservObj.postCourseDetails(options).subscribe(
          (data) => {
            var res: any = <Data>data;
            if (res.status > 0) {
              this.alertObj.topRoghtAlert('Course Added Successfully');
              this.router.navigate(['../list'],{relativeTo:this.route});
              this.form.disable();
            }
          },
          (error) => {
            this.alertObj.consoleContent('error occured while add courses', error);
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
        // this.instituteservObj.consolecontent(options,formData);
      } else {
        // this.btnCourse = 'Update Course';
        var minfee = '';
        var maxfee = '';
        if (this.subcourse.length == 0) {
          if (this.form.controls.subcourseName.value !== null) {
            this.subcourse.push(this.form.controls.subcourseName.value);
          }
        } else {

        }
        if (this.form.controls.fee.value == 1) {
          minfee = '';
          maxfee = '';
        } else if (this.form.controls.fee.value == 2) {
          minfee = this.form.controls.fixed.value;
          maxfee = this.form.controls.fixed.value;
        } else {
          minfee = this.form.controls.fromRange.value;
          maxfee = this.form.controls.toRange.value;
        }
        var sub;
        if (this.subcourse.length) {

          sub = this.subcourse[0];
          for (var i = 1; i < this.subcourse.length; i++) {
            sub = sub + ',' + this.subcourse[i];
          }
        } else {
          sub = '';
        }

        if (this.selectedqualiOption.length == 0) {
          if (this.form.controls.qualification.value !== null) {
            this.selectedqualiOption.push(this.form.controls.subcourseName.value);
          }
        }
        var quali;
        if (this.selectedqualiOption.length) {

          quali = this.selectedqualiOption[0];
          for (var i = 1; i < this.selectedqualiOption.length; i++) {
            quali = quali + ',' + this.selectedqualiOption[i];
          }
        } else {
          quali = '';
        }
        var cName: string = this.form.controls.courseName.value;
        var arr_cid = this.courseOptions.filter(x => x.course_name.toLowerCase() == cName.toLowerCase());
        var cid = arr_cid.length ?  arr_cid[0].cour_id : 0;
        var logo_name = '';
        var logo 
        if (this.files == null){
          logo = '';
          logo_name = this.logoname;
        }else {
          logo = this.logo_file;
          logo_name = '';
        }
        const putoptions = {
          cid: parseInt(this.cid, 10),
          course_name: cName,
          course_id: cid,
          module:'courses',
          course_logo: logo, // empty if no file selected
          course_logo_name: logo_name,  // if file selected = '' else  = 'oldname'
          sub_courses: sub,
          duration_months: this.form.controls.months.value,
          duration_days: this.form.controls.days.value,
          min_fee: minfee,
          max_fee: maxfee,
          fee_type:this.Selectedfee,
          qualification: quali,//this.form.controls.qualification.value,
          course_type: mode, //parseInt(this.form.controls.mode.value, 10),
          course_content: this.ckeditorContent == null ? '' : this.ckeditorContent
        }
        this.instituteservObj.putCourseById(putoptions).subscribe(
          (data) => {
            var res: any = <Data>data;
            if (res.status > 0) {
              this.alertObj.topRoghtAlert('Updated Successfully');
              // this.router.navigate(['/institute/course']);
              this.form.disable();
            }
          },
          (error) => {
            this.alertObj.consoleContent('error occured while update courses', error);
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
  }

  onCancel() {
    if (this.btnCourse === 'Add') {
      this.form.reset();
      this.Selectedfee = 3;
      this.router.navigate(['../list'],{relativeTo:this.route});
    } else {
      this.instituteservObj.getCourseBYid(this.cid).subscribe(
        (data: Data) => {
          var res: any = <Data>data;
          var arr = res.data;
          if (res.status === 1) {
            this.tempCourseTable = arr;
            this.bindData(this.cid);
          } else {
            this.alertObj.infoAlert(res.message);
          }
        },
        (error) => {
          this.alertObj.consoleContent('error at get faculty', error);
          if (error.status === 404) {
            this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
          } else if (error.status === 401) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status === 500) {
            this.alertObj.errorAlert('Please contact Administrator. ');
          } else if (error.status > 0) {
            this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
          } 
        }
      )
      // this.bindData(this.cid);
      this.form.disable();
    }
  }
}
