import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { InstituteService } from '../services/institute.service';
import { Data } from '../../services/master.service';
import swal from 'sweetalert2';
import { AlertsService } from '../../services/alerts.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-batches-list',
  templateUrl: './batches-list.component.html',
  styleUrls: ['./batches-list.component.css']
})
export class BatchesListComponent implements OnInit, AfterViewInit {

  displayedColumns = ['sno', 'batch_name', 'session_name', 'course_name', 'startson', 'demo_from_date',
    'demo_to_date', 'timings', 'status', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchFlag = false;
  status: number = null;
  course: number = null;
  course_options = [
    { id: 1, value: 'angular' },
    { id: 2, value: 'Classroom Training' },
    { id: 3, value: 'Training & Placement' },
  ];
  status_options = [
    { id: 1, value: 'Online Training' },
    { id: 2, value: 'Classroom Training' },
    { id: 3, value: 'Training & Placement' },
  ];
  constructor(private routerobj: Router, 
    private datepipe: DatePipe,
    public instiServObj: InstituteService,
    private alertObj: AlertsService,
    public commonserObj: CommonService) {
    if (this.instiServObj.user_id === null)
      this.instiServObj.user_id = parseInt(localStorage.getItem('userId'), 10);
    if (this.instiServObj.instituteId === null)
      this.instiServObj.instituteId = parseInt(localStorage.getItem('Iid'), 10);
  }

  ngOnInit() {
    this.commonserObj.breadcrum = 'Batches & Demos';
    // this.dataSource.data = ELEMENT_DATA;
    // this.instiServObj.batchTable = ELEMENT_DATA;
    this.bindDatatable()
  }

  bindDatatable() {
    this.instiServObj.getOfferedBatches(this.instiServObj.user_id).subscribe(
      (data: Data) => {
        var res: any = <Data>data;
        if (res.status === 1) {
          this.instiServObj.batchTable = res.data;
          this.dataSource.data = res.data;        
        } else {
          this.alertObj.errorAlert('Error occured while get batches');
        }
      },
      (error) => {
        this.alertObj.consoleContent('error occured while get batches', error);
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getTimeFormat(id) {

      // this.datepipe.transform(this.instiServObj.batchTable[id].demo_start_time,'hh:mm a'));
    var fromtime = this.instiServObj.batchTable[id].demo_start_time.split(':');
    var totime = this.instiServObj.batchTable[id].demo_end_time.split(':');
    // console.log(fromtime);
    var ft = fromtime[0] > 12 ? (fromtime[0] - 12) : fromtime[0];
    var ftc = fromtime[0] > 12 ? 'PM' : 'AM' ;
    var tt = totime[0] > 12 ? (totime[0]-12) : totime[0];
    var ttc = fromtime[0] > 12 ? 'PM' : 'AM' ;
    var timing = ft + ':' + fromtime[1]+' ' + ftc+' - ' + tt + ':' + totime[1]+' ' + ttc;
    return timing;
  }

  onSearch() {

    if (this.status === null) {
      alert('Please select Status');
    } else if (this.course === null) {
      alert('please select Couse');
    } else {

    }

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  onActivate(row, i) {
    this.alertObj.confirmAlert({ message: 'to activate', btntext: 'Yes,Activate' }).then(
      (result) => {
        if (result.value) {
          var options = {
            bid: row.bid,
            status: 1
          }
          this.instiServObj.updateBatchStatus(options).subscribe(
            (data: Data) => {
              var res: any = <Data>data;
              if (res.status === 1) {
                this.instiServObj.batchTable[(this.paginator.pageSize)*(this.paginator.pageIndex) + i].is_active = 1;
                this.dataSource.data = this.instiServObj.batchTable;
                this.alertObj.topRoghtAlert('Activated Successfully');
              } else {
                alert('error occured while Activating');
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
    )
  }
  onDeactivate(row, i) {
    this.alertObj.confirmAlert({ message: 'to Deactivate Batch', btntext: 'Yes,Deactivate' }).then(
      (result) => {
        if (result.value) {
          var options = {
            bid: row.bid,
            status: 0
          }
          this.instiServObj.updateBatchStatus(options).subscribe(
            (data: Data) => {
              var res: any = <Data>data;
             
              if (res.status === 1) {
                this.instiServObj.batchTable[(this.paginator.pageSize)*(this.paginator.pageIndex) + i].is_active = 0;
                this.dataSource.data = this.instiServObj.batchTable;
                this.alertObj.topRoghtAlert('Deactivated Successfully');
              } else {
                this.alertObj.errorAlert('error occured while Deactivating');
              }
            },
            (error) => {
              this.alertObj.consoleContent('error occured while Deactivating', error);
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
  onEdit(i, row) {
    // alert('edit');
    this.routerobj.navigate(['/institute/batch-edit/' + row.bid]);
  }
}


export interface Element {
  batch: number
  session: string;
  course: string;
  startdate: Date;
  demodate: Date;
  timings: string;
  status: string;
}
const ELEMENT_DATA: Element[] = [
  {
    batch: 1, session: 'regular', course: 'angular js', startdate: new Date(), demodate: new Date(),
    timings: '9-12pm', status: 'replied'
  },
  {
    batch: 2, session: 'regular', course: 'angular js', startdate: new Date(), demodate: new Date(),
    timings: '9-12pm', status: 'running'
  },
  {
    batch: 3, session: 'regular', course: 'angular js', startdate: new Date(), demodate: new Date(),
    timings: '9-12pm', status: 'started'
  }
];
