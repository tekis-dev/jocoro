import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../../services/alerts.service';
import { JobsService } from '../../jobs.service';
import { FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MasterService } from '../../../services/master.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private datepipe:DatePipe,
    private router:Router,
    private route:ActivatedRoute,
    private alertObj: AlertsService,
    private jobsObj: JobsService,
    private masterObj:MasterService
  ) { 
    if (this.masterObj.token == null && this.masterObj.token == '') {
      this.masterObj.checkUselogin();
    }
  }

  ngOnInit() {
  }

  onCancel(f) {
    var form:FormGroup = f.form;
    
    form.reset();
  }
  
  onAdd(f) {
    var form:FormGroup = f.form;
    if (form.valid) {
      // data.uid,data.profile,data.title,data.job_nature,data.skills,data.exp,data.from_exp,data.to_exp,data.job_desc
      //       ,data.brief,data.postdate,data.lastdate,data.joblocation,data.interviewlocation,data.person,data.link
      var from = 0;
      var to = 0
      if (form.controls.type.value == 1) {
        from = form.controls.from.value;
        to = form.controls.to.value
      }
      var desc = form.controls.description.value == undefined ? '' : form.controls.description.value;
      var brief = form.controls.brief.value == undefined ? '' : form.controls.brief.value;

      var tempSkill;
      if (this.jobsObj.selectedSkillSet.length) {
        tempSkill = this.jobsObj.selectedSkillSet[0];
        for (var i = 1; i < this.jobsObj.selectedSkillSet.length; i++) {
          tempSkill = tempSkill + ',' + this.jobsObj.selectedSkillSet[i];
        }
      } else {
        tempSkill = '';
      }
      var options = {
        uid: this.masterObj.userId,
        profile: form.controls.profile.value,
        title: form.controls.title.value,
        job_nature: form.controls.nature.value,
        skills: tempSkill,
        exp: form.controls.type.value,
        from_exp: from,
        to_exp: to,
        job_desc: desc,
        brief: brief,
        postdate: this.datepipe.transform(form.controls.start.value ,"yyyy-MM-dd"),
        lastdate:  this.datepipe.transform(form.controls.lastdateflag.value == 1 ?  new Date() : form.controls.end.value,"yyyy-MM-dd"),//form.controls.end.value,
        lastdateFlag: form.controls.lastdateflag.value,
        joblocation: form.controls.job_location.value,
        interviewlocation: form.controls.int_location.value,
        person: form.controls.person.value,
        link: form.controls.link.value
      }
      console.log(this.jobsObj.uid,options);
      this.jobsObj.postJob(options).subscribe(
        (data) => {
          // console.log(data);
          var arr: any = data;
          if (arr.status == 1) {
            this.alertObj.topRoghtAlert('Job Added Successfully');
              this.router.navigate(['../list'],{relativeTo: this.route});
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
    } else {
      this.alertObj.warningAlert("Please enter valid details in required fields").then(
        dt => {
          // document.body.scrollTop;
        });
    }
  }

  fromatdate(value) {
    if ((typeof value === 'string') && (value.indexOf('-') > -1)) {
      const str = value.split('-');
      const year = Number(str[0]);
      const month = Number(str[1]) - 1;
      const date = Number(str[2]);

      return new Date(year, month, date);
    }
  }
}
