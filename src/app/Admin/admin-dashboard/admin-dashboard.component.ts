import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  payment_displayedColumns = ['pay_emp' , 'pay_seeker', 'pay_tot']
  displayedColumns = ['NO', 'Name', 'Email', 'Industries', 'Functional_Name', 'Job_Role', 'Registered_On'];
  payment_ARR = [{pay_emp: 123, pay_seeker: 1233, pay_tot: 1233}]
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  payment_dataSource = new MatTableDataSource();
  constructor() { }

  ngOnInit() {
    // this.dataSource = new mat
    this.payment_dataSource = new MatTableDataSource(this.payment_ARR);
  }

}
export interface Element {
  name: string;
  No: number;
  Email: string;
  Industries : string;
   Functional_Name: string; Job_Role:string; Registered_On:string
}

const ELEMENT_DATA: Element[] = [
  {No: 1, name: 'Hydrogen', Email: 'rk@gmail.com', Industries: 'SD', Functional_Name: 'sde', Job_Role:'fde', Registered_On:'2018-04-03'},
  {No: 2, name: 'Helium', Email: 'rk@gmail.com', Industries: 'SD', Functional_Name: 'sde', Job_Role:'fde', Registered_On:'2018-04-03'},
  {No: 3, name: 'Lithium', Email: 'rk@gmail.com', Industries: 'SD', Functional_Name: 'sde', Job_Role:'fde', Registered_On:'2018-04-03'},
  {No: 4, name: 'Beryllium', Email: 'rk@gmail.com', Industries: 'SD', Functional_Name: 'sde', Job_Role:'fde', Registered_On:'2018-04-03'},
  {No: 5, name: 'Boron', Email: 'rk@gmail.com', Industries: 'SD', Functional_Name: 'sde', Job_Role:'fde', Registered_On:'2018-04-03'},
  // {No: 6, name: 'Carbon',Email: 'rk@gmail.com', Industries: 'SD', Functional_Name: 'sde', Job_Role:'fde', Registered_On:'2018-04-03'},
  // {No: 7, name: 'Nitrogen', Email: 'rk@gmail.com', Industries: 'SD', Functional_Name: 'sde', Job_Role:'fde', Registered_On:'2018-04-03'},
  // {No: 8, name: 'Oxygen', Email: 'rk@gmail.com', Industries: 'SD', Functional_Name: 'sde', Job_Role:'fde', Registered_On:'2018-04-03'},
  // {No: 9, name: 'Fluorine', Email: 'rk@gmail.com', Industries: 'SD', Functional_Name: 'sde', Job_Role:'fde', Registered_On:'2018-04-03'},
  // {No: 10, name: 'Neon',Email: 'rk@gmail.com', Industries: 'SD', Functional_Name: 'sde', Job_Role:'fde', Registered_On:'2018-04-03'}
];