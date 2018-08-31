import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JobsService } from '../../jobs.service';
import { AlertsService } from '../../../services/alerts.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, AfterViewInit {

  @ViewChild('jobform') job_form;
  jid: number = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobsObj: JobsService,
    private alertObj: AlertsService,
    private datepipe: DatePipe

  ) {
    if (!this.jobsObj.jobId) {
      this.router.navigate(['../list'], { relativeTo: this.route });
    }
  }

  ngOnInit() {
    this.jid = this.jobsObj.jobId;

    this.jobsObj.btnText = "Update";

    var f: FormGroup = this.job_form.form;


    this.job_form.form.disable();
    this.bindData()
  }
  ngAfterViewInit() {
  }

  bindData() {
    var f: FormGroup = this.job_form.form;
    this.jobsObj.getjobsDetails(this.jid).subscribe(
      (data) => {
        
        var res: any = data;
        if (res.status == 1) {
          var arr = res.data;
          f.controls.profile.setValue(arr[0].profile);
          f.controls.nature.setValue(arr[0].nature);
          f.controls.title.setValue(arr[0].job_title);
          f.controls.type.setValue(arr[0].experiance_type);
          // f.controls.skill.setValue(arr[0].profile);

          // f.controls.start.setValue(new Date(this.datepipe.transform(arr[0].post_date,"dd-MM-yyy")));
          // f.controls.end.setValue(new Date(this.datepipe.transform(arr[0].last_date,"dd-MM-yyy")));
          if (arr[0].lastdate_flag == 1) {
            f.controls.lastdateflag.setValue(arr[0].lastdate_flag);
          } else {
            f.controls.lastdateflag.setValue(arr[0].lastdate_flag);
            f.addControl('end', new FormControl(null, [Validators.required]));
            this.job_form.endDt = this.fromatdate(this.datepipe.transform(arr[0].last_date, "yyyy-MM-dd"));
          }
          this.job_form.startDt = this.fromatdate(this.datepipe.transform(arr[0].post_date, "yyyy-MM-dd")),//arr[0].post_date;
            f.controls.description.setValue(arr[0].job_desc);
          f.controls.brief.setValue(arr[0].breif_about_job);
          f.controls.job_location.setValue(arr[0].job_location);
          f.controls.int_location.setValue(arr[0].interview_location);
          f.controls.person.setValue(arr[0].contact_person);
          f.controls.link.setValue(arr[0].apply_link);
          if (arr[0].experiance_type == 1) {
            f.addControl('from', new FormControl(null, [Validators.required]));
            f.addControl('to', new FormControl(null, [Validators.required]));
            f.controls.from.setValue(arr[0].from_exp);
            f.controls.to.setValue(arr[0].to_exp);
          }
          var skilset: Array<any> = [];
          var skills = arr[0].skills;

          if (skills !== "" && skills !== null) {
            if (skills.includes(',')) {
              skilset = arr[0].skills.split(',');

            } else {
              skilset.push(skills.toString());
            }
          }
          this.job_form.selectedSkillSet = skilset;
          f.disable();
        }
      },
      (error) => {
        if (error.status === 404) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 500) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        }
      }
    )
    // f.controls.profile.setValue()
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
  onEdit(f) {
    f.form.enable();
  }

  onCancel(f) {
    var form: FormGroup = f.form;
    this.bindData()
    this.job_form.form.disable();
  }


  onUpdate(f) {
    var form: FormGroup = f.form;
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
        uid: this.jobsObj.uid,
        jobid: this.jid,
        profile: form.controls.profile.value,
        title: form.controls.title.value,
        job_nature: form.controls.nature.value,
        skills: tempSkill,
        exp: form.controls.type.value,
        from_exp: from,
        to_exp: to,
        job_desc: desc,
        brief: brief,
        postdate: this.datepipe.transform(form.controls.start.value, "yyyy-MM-dd"),
        lastdate: this.datepipe.transform(form.controls.lastdateflag.value == 1 ? new Date() : form.controls.end.value, "yyyy-MM-dd"),//form.controls.end.value,
        lastdateFlag: form.controls.lastdateflag.value,
        joblocation: form.controls.job_location.value,
        interviewlocation: form.controls.int_location.value,
        person: form.controls.person.value,
        link: form.controls.link.value
      }
      this.jobsObj.putJobbyId(options).subscribe(
        (data) => {
          // console.log(data);
          var arr: any = data;
          if (arr.status == 1) {
            this.alertObj.topRoghtAlert('Job Updated Successfully');
            this.router.navigate(['../list'], { relativeTo: this.route });
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

 

}
