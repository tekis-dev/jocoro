import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router,ActivatedRoute } from '@angular/router';


import { JobsService } from '../../jobs.service';
import { AlertsService } from '../../../services/alerts.service';


@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  displayedColumns = ['jobid', 'title', 'exp_type', 'postdate', 'lastdate', 'job_location', 'action']

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private routerobj: Router,
    private route: ActivatedRoute,
    private jobsObj: JobsService,
    private alertObj: AlertsService) { }

  ngOnInit() {
    let uid = localStorage.getItem('userId');
    this.jobsObj.getjobsList(uid).subscribe(
      (data) => {
        // console.log(data);
        var arr: any = data;
        this.jobsObj.jobsList = arr.data;
        this.dataSource.data = arr.data;
        this.dataSource.paginator = this.paginator;
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onDeactivate(row, i) {
    this.alertObj.confirmAlert({ message: 'to Deactivate job', btntext: 'Yes,Deactivate' }).then(
      (result) => {
        if (result.value) {
          var options = {
            jobId: row.jobId,
            status: 0
          }
          this.jobsObj.updatejobStatus(options).subscribe(
            (data) => {
              var res: any = data;
              if (res.status === 1) {
                this.jobsObj.jobsList [(this.paginator.pageSize) * (this.paginator.pageIndex) + i].is_active = 0;
                this.dataSource.data = this.jobsObj.jobsList ;
                this.alertObj.topRoghtAlert('Deactivated Successfully');
              } else {
                this.alertObj.errorAlert('error occured while Deactivating');
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

        }
      }
    )
   
  }

  onActivate(row, i) {
    this.alertObj.confirmAlert({ message: 'to activate', btntext: 'Yes,Activate' }).then(
      (result) => {
        if (result.value) {
          var options = {
            jobId: row.jobId,
            status: 1
          }
          this.jobsObj.updatejobStatus(options).subscribe(
            (data) => {
              var res: any = data;
              if (res.status === 1) {
                this.jobsObj.jobsList [(this.paginator.pageSize) * (this.paginator.pageIndex) + i].is_active = 1;
                this.dataSource.data = this.jobsObj.jobsList ;
                this.alertObj.topRoghtAlert('Activated Successfully');
              } else {
                alert('error occured while Activating');
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
          );
        } else {

        }
      }
    )
  }

  onEdit(row, i) {
    this.jobsObj.jobId = row.jobId;
    this.routerobj.navigate(['../edit' ],{ relativeTo: this.route});
  }

}
