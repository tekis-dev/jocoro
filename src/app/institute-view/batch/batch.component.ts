import { Component, OnInit } from '@angular/core';

import { Router, Route, ActivatedRoute } from '@angular/router';
import { InstituteService,InstituteModel } from '../service/institute.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  batchList: any = [];
  filteredBatchesOptions:any=[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public instiServObj: InstituteService,
  ) {
    this.getTechModeArr();
    this.batchList = this.instiServObj.BatchDetails;
    this.filteredBatchesOptions=this.batchList;
    console.log(this.filteredBatchesOptions);

  }

  ngOnInit() {

    /* if (!this.batchList.length) {
      this.router.navigate(['../'], { relativeTo: this.route });
    } */

  }
  onBatchDetails(bid: number) {
    this.instiServObj.getBatchDetailsById(bid).subscribe(
      (data: InstituteModel) => {
        var res: any = <InstituteModel>data;
        if (res.status === 1) {
          this.instiServObj.BatchDescription = res.data[0];
          this.router.navigate(['../batch/details'], { relativeTo: this.route });
        }
        else {

        }
      },
      (error) => {

      }
    );
  }

  getTechModeArr() {
    this.instiServObj.getTeachMode().subscribe(
      (data: InstituteModel) => {
        var res: any = data
        if (res.status) {
          var arr = res.data;
          this.instiServObj.teachModeArr = arr;

        }
      },
      (error) => {

      }
    )
  }

  techdeatils(list: any) {
    var arr;
    var returnList
    if (list.includes(",")) {
      arr = list.split(",");
      returnList = this.instiServObj.teachModeArr.filter(x => x.ct_id == arr[0])[0].course_type;
      for (var i = 1; i < arr.length; i++) {
        returnList = returnList + "," + this.instiServObj.teachModeArr.filter(x => x.ct_id == arr[i])[0].course_type;
      }
      return returnList;
    } else {
      returnList = list == "" ? "" : this.instiServObj.teachModeArr.filter(x => x.ct_id == parseInt(list, 10))[0].course_type;
      return returnList
    }
  }

  onCourseDrpChange(course:any){
    const filterValue = course.toLowerCase();
    if(filterValue!='all'){
    this.filteredBatchesOptions=this.batchList.filter(option => option.course_name.toLowerCase().indexOf(filterValue) === 0);
  }else{
    this.filteredBatchesOptions=this.batchList;
  }
  }

}
