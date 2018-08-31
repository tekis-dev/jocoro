import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { BatchesComponent } from '../batches/batches.component';

import { Router,ActivatedRoute, Params } from '@angular/router';
import { CommonService } from '../../../services/common.service';


@Component({
  selector: 'app-batches-edit',
  templateUrl: './batches-edit.component.html',
  styleUrls: ['./batches-edit.component.css']
})
export class BatchesEditComponent implements OnInit {

  @ViewChild('batchForm') form: BatchesComponent;

  constructor(public commonserObj: CommonService,private router: Router,
    private route:ActivatedRoute,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.commonserObj.breadcrum = 'Batch Edit';
  
    
  }

  onUpdate(f) {
    if(f.form.valid){
     
    } else {
      alert('Please enter valid inputs');
    }
  }

  onEdit(f){
    f.form.enable();
    
  }
  goBack(){
    this.router.navigate(['../../list'],{relativeTo:this.route})
  }
}
