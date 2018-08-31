import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonService } from '../../services/common.service';
import { InstituteService } from '../services/institute.service';
import { Data } from '../../services/master.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-facultydetails',
  templateUrl: './facultydetails.component.html',
  styleUrls: ['./facultydetails.component.css']
})
export class FacultydetailsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['sno', 'faculty_name', 'experience', 'phone', 'action']
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  url = '';
  constructor(private dialogref: MatDialog,
    public commonserObj: CommonService, private instiObj: InstituteService,
    private alertObj: AlertsService,
    private routerObj: Router, private param: ActivatedRoute
  ) {
    if (this.instiObj.user_id === null)
      this.instiObj.user_id = parseInt(localStorage.getItem('userId'), 10);
  }

  ngOnInit() {
    // console.log(this.routerObj,this.param);
    this.url = this.routerObj.url;
    this.commonserObj.breadcrum = 'Faculty Details';
    // this.dataSource.data = ELEMENT_DATA;
    this.instiObj.getFacultyList(this.instiObj.user_id).subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        console.log(res);
        var arr = res.data
        if (res.status === 1) {
          this.instiObj.facTable = arr;
          this.dataSource.data = arr;
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
        } else {
          this.alertObj.infoAlert(res.message);
        }
      },
      (error) => {
        this.alertObj.consoleContent('error at get faculty', error);
        if (error.status === 404) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 500) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
        } 
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onEdit(row, i) {

    this.routerObj.navigate(['/institute/edit faculty/' + row.fid]);
  }

  onActivate(row, i) {
    this.alertObj.confirmAlert({ message: 'to activate', btntext: 'Yes,Activate' }).then(
      (result) => {
        if (result.value) {
          var options = {
            fid: row.fid,
            status: 1
          }
          this.instiObj.updateFacultyStatus(options).subscribe(
            (data: Data) => {
              var res: any = <Data>data;
              if (res.status === 1) {
                this.instiObj.facTable[(this.paginator.pageSize)*(this.paginator.pageIndex) + i].is_active = 1;
                this.dataSource.data = this.instiObj.facTable;
                this.alertObj.topRoghtAlert('Activated Successfully');
              } else {
                this.alertObj.warningAlert(res.message);
              }
            },
            (error) => {
              this.alertObj.consoleContent('error occured while Deactivating', error);
              if (error.status === 404) {
                this.alertObj.errorAlert('Please contact Adminstrator' + error.message);
              } else if (error.status === 401) {
                this.alertObj.errorAlert(error.error.message);
              } else if (error.status === 500) {
                this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
              } else if (error.status > 0) {
                this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
              }
            }
          );
        } else {

        }
      }
    )
  }
  onDeactivate(row, i) {
    this.alertObj.confirmAlert({ message: ' to Deactivate the faculty', btntext: 'Yes,Deactivate' }).then(
      (result) => {
        if (result.value) {
          var options = {
            fid: row.fid,
            status: 0
          }

          this.instiObj.updateFacultyStatus(options).subscribe(
            (data: Data) => {
              var res: any = <Data>data;
            
              if (res.status === 1) {
                this.instiObj.facTable[(this.paginator.pageSize)*(this.paginator.pageIndex) + i].is_active = 0;
                this.dataSource.data = this.instiObj.facTable;
                this.alertObj.topRoghtAlert('Deactivated Successfully');
              } else {
                this.alertObj.infoAlert(res.message);
              }
            },
            (error) => {
              this.alertObj.consoleContent('error occured while Deactivating', error);
              if (error.status === 404) {
                this.alertObj.errorAlert('Please contact Adminstrator' + error.message);
              } else if (error.status === 401) {
                this.alertObj.errorAlert(error.error.message);
              } else if (error.status === 500) {
                this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
              } else if (error.status > 0) {
                this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
              } 
            }
          );
        } else {

        }
      }
    );
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
  exp: string;

}
const ELEMENT_DATA: Element[] = [
  { id: 1, name: 'rk', exp: '5 years' },
  { id: 2, name: 'kk', exp: '1 year' },
  { id: 3, name: 'pk', exp: '2 years' }
];