import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common/';

import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css'],
  
})

export class EnquiryComponent implements OnInit {

  
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2018, 6, 1);
  fromdt:Date = new Date();
  todt:Date = new Date();
  displayedColumns = ['id', 'course', 'date', 'description', 'email', 'mobile', 'status'];
  dataSource = new MatTableDataSource();

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
  constructor(public datepipe: DatePipe,
    public commonserObj: CommonService
  ) { }

  ngOnInit() {
    this.commonserObj.breadcrum = 'Enquiry';
    this.dataSource.data = ELEMENT_DATA;
  }
  onSearch(){
    
    if(this.status === null){
      alert('Please select Status');
    }else if(this.course === null){
      alert('please select Couse');
    }else {

    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}


export interface Element {
  id: number
  course: string;
  date: Date;
  description: string;
  email: string;
  mobile: number;
  status: string;
}
const ELEMENT_DATA: Element[] = [
  {
    id: 1, course: 'angular js', date: new Date(), description: 'when will the new batch start', email: 'xyz@tekismarg.com',
    mobile: 1234567890, status: 'replied'
  },
  {
    id: 2, course: 'asp net ', date: new Date(), description: 'when will the new batch start', email: 'xyz@tekismarg.com',
    mobile: 1234567890, status: 'replied'
  },
  {
    id: 3, course: 'angular', date: new Date(), description: 'when will the new batch start', email: 'xyz@tekismarg.com',
    mobile: 1234567890, status: 'replied'
  }
];