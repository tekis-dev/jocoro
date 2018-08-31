import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { JobsService } from '../jobs.service';
import { Data } from '@angular/router/src/config';
import { AlertsService } from '../../services/alerts.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-jobs-dashboard',
  templateUrl: './jobs-dashboard.component.html',
  styleUrls: ['./jobs-dashboard.component.css']
})
export class JobsDashboardComponent implements OnInit {

 constructor(){

 }

 ngOnInit(){
   
 }
}
