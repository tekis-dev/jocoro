import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstituteService,InstituteModel } from '../service/institute.service';

@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.css']
})
export class BatchDetailsComponent implements OnInit {
 batchDetails:any ={};
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    public instiServObj: InstituteService 
  ) { 
    this.getTechModeArr();
  }

  ngOnInit() {
    console.log(this.instiServObj.BatchDescription,'batch details');
    if(this.instiServObj.BatchDescription.length==0){
      this.router.navigate(['../'],{relativeTo:this.route});
    }else{
      this.batchDetails=this.instiServObj.BatchDescription;
      
    }
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
    console.log()
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
}
