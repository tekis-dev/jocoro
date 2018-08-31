import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobsService } from '../../jobs.service';
import { AlertsService } from '../../../services/alerts.service';
import { CommonService } from '../../../services/common.service';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA, TAB } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  btnText: string = '';
  submitFlag = false;
  dateFlag = '1';
  @Output() evt: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  expType = [
    { id: 0, type: 'Fresher' },
    { id: 1, type: 'Experienced' }
  ];
  exp_type: number = null;
  JobnatureList = [];
  profileList = [];
  fromRange = [];
  toRange = []
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

  brief_Content = '';
  desc_Content = '';
  selectedSkillSet = [];
  separatorKeysCodes = [ENTER, COMMA, TAB];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;

  addOnBlurSkill: boolean = false;
  endDt: Date;
  startDt: Date;
  // @ViewChild('qualiER') qualiER: ElementRef;
  constructor(
    public jobsObj: JobsService,
    private alertObj: AlertsService,
    public commonObj: CommonService
  ) {
    this.jobsObj.btnText = 'Add';
    this.form = new FormGroup({
      'profile': new FormControl(null, [Validators.required]),
      'nature': new FormControl(null, [Validators.required]),
      'title': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+([, _ -]?[a-zA-Z0-9])*$')]),
      'type': new FormControl(null, [Validators.required]),
      'skill': new FormControl(null),
      'start': new FormControl(null),
      'lastdateflag': new FormControl(null, [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'brief': new FormControl(''),
      'job_location': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+([, _ -]?[a-zA-Z0-9])*$')]),
      'int_location': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+([, _ -]?[a-zA-Z0-9])*$')]),
      'person': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+([, _ -]?[a-zA-Z])*$')]),
      'link': new FormControl(''),
    });
  }

  ngOnInit() {



    this.getmasterData();
    this.fromRange = this.jobsObj.from;
    this.toRange = this.jobsObj.to;
  }

  getmasterData() {
    this.jobsObj.getmasterData().subscribe(
      (data) => {
        var arr: any = data;
        if (arr.status == 1) {
          this.profileList = arr.data.jobtypes
          this.JobnatureList = arr.data.Jobnature
        }
      },
      (error) => {
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

  removeSkill(chip) {
    if (this.form.enabled) {
      const index = this.selectedSkillSet.indexOf(chip);
      if (index >= 0) {
        this.selectedSkillSet.splice(index, 1);
      }
    }

  }

  addSkill(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add 
    if ((value || '').trim()) {
      this.selectedSkillSet.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.form.controls.skill.setValue(null);
  }

  onExpChange(evt) {

    if (evt.value === 1) {
      this.form.addControl('from', new FormControl(null, [Validators.required]));
      this.form.addControl('to', new FormControl(null, [Validators.required]));
    } else {
      this.form.removeControl('from');
      this.form.removeControl('to');

    }
  }
  onFromExpChange(evt){
    if(evt.value){
      for(var i =0;i<this.toRange.length;i++){
        if(this.toRange[i].id <= evt.value)
          this.toRange[i].disabled = true;
        else 
          break;
      }
    }
  }

  ondateFlagchange() {
    if (this.dateFlag === '1') {

      this.form.removeControl('end');
    } else {

      this.form.addControl('end', new FormControl(null));
    }
  }

  oncancel() {
    this.selectedSkillSet = []
    this.cancel.emit({ form: this.form });
  }
  onformSubmit() {

    this.submitFlag = true
    if(this.form.controls.skill.value !== null && this.form.controls.skill.value !== ""){
      this.selectedSkillSet.push(this.form.controls.skill.value.trim());
    }
    this.jobsObj.selectedSkillSet = this.selectedSkillSet;
    // console.log(this.selectedSkillSet,this.form.controls.skill.value);
    this.evt.emit({ form: this.form });
    if (this.form.valid) {
      this.submitFlag = false;
    } else {

    }
  }

}
