import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, PageEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { InstituteAddCourseComponent } from '../institute-add-course/institute-add-course.component';
import { AlertsService } from '../../../services/alerts.service';
import { CommonService } from '../../../services/common.service';
import { Data } from '@angular/router/src/config';
import { InstituteService } from '../../../services/institute.service';


@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id', 'course_name', 'sub_courses', 'views', 'interested', 'created_at', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSize = 5;
  pageEvent: PageEvent;
  constructor(private dialogref: MatDialog,
    private alertObj: AlertsService,
    private instituteServObj: InstituteService,
    public commonserObj: CommonService,
    private routerObj: Router,
    private route: ActivatedRoute
  ) { 

  }

  ngOnInit() {
    this.commonserObj.breadcrum = 'Manage Course';
    // this.dataSource.data = ELEMENT_DATA;
    if (this.instituteServObj.user_id === null)
      this.instituteServObj.user_id = parseInt(localStorage.getItem('userId'), 10);
    this.databind();

  }
  databind() {
    this.instituteServObj.getofferedCourstable(this.instituteServObj.user_id)
      .subscribe(
      (data) => {
        var res: any = <Data>data;
        const rows = res.data;
        if (rows.length > 0) {
          this.instituteServObj.courseTable = [];
          this.instituteServObj.courseTable = rows;
          this.dataSource.data = rows;
        }
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
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  onDelete(row, i) {
    this.instituteServObj.deleteCourseById(row.cid)
      .subscribe(
      (data) => {
        var res: any = <Data>data;
        const rows = res.data;

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

  }
  onEdit(row, i) {
    // console.log(row)
    this.routerObj.navigate(['../edit/' + row.cid], { relativeTo: this.route });
  }

  onActivate(row, i) {
    this.alertObj.confirmAlert({ message: 'to activate', btntext: 'Yes,Activate' }).then(
      (result) => {
        if (result.value) {
          var options = {
            inst_id: localStorage.getItem("Iid"),
            cid: row.cid,
            status: 1
          }
          this.instituteServObj.updateCourseStatus(options).subscribe(
            (data: Data) => {
              var res: any = <Data>data;

              if (res.status === 1) {
                this.instituteServObj.courseTable[(this.paginator.pageSize) * (this.paginator.pageIndex) + i].is_active = 1;
                this.dataSource.data = this.instituteServObj.courseTable;
                this.alertObj.topRoghtAlert('Activated Successfully');
              } else {
                this.alertObj.errorAlert('Error occured while posting');
              }
            },
            (error) => {
              this.alertObj.consoleContent('error occured while activating', error);
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
    );
  }
  onDeactivate(row, i) {
    this.alertObj.confirmAlert({ message: 'to Deactivate', btntext: 'Yes,Deactivate' }).then(
      (result) => {
        if (result.value) {
          var options = {
            inst_id: localStorage.getItem("Iid"),
            cid: row.cid,
            status: 0
          }
          console.log(options);
          this.instituteServObj.updateCourseStatus(options).subscribe(
            (data: Data) => {
              var res: any = <Data>data;

              var arr = res.data
              if (res.status === 1) {
                this.instituteServObj.courseTable[(this.paginator.pageSize) * (this.paginator.pageIndex) + i].is_active = 0;
                this.dataSource.data = this.instituteServObj.courseTable;
                this.alertObj.topRoghtAlert('Deactivated Successfully');
              } else {
                this.alertObj.confirmAlert('error occured while Deactivating');
              }
            },
            (error) => {
              this.alertObj.consoleContent('error occured while Deactivating', error);
              if (error.status === 404) {
                this.alertObj.errorAlert( error.message);
              } else if (error.status === 401) {
                this.alertObj.errorAlert(error.error.message);
              } else if (error.status === 500) {
                this.alertObj.errorAlert( error.error.message);
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
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
export interface Element {
  id: number
  name: string;
  location: string;
  views: number;
  interested_candidates: number;
}
const ELEMENT_DATA: Element[] = [
  { id: 1, name: 'angular', location: 'hyd', views: 10, interested_candidates: 50 },
  { id: 2, name: 'node js', location: 'hyd', views: 10, interested_candidates: 50 },
  { id: 3, name: 'my sql', location: 'hyd', views: 10, interested_candidates: 50 }
];