import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { BatchesComponent } from '../batches/batches.component';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-batches-edit',
  templateUrl: './batches-edit.component.html',
  styleUrls: ['./batches-edit.component.css']
})
export class BatchesEditComponent implements OnInit {

  @ViewChild('batchForm') form: BatchesComponent;

  constructor(public commonserObj: CommonService,private router: Router) { }

  ngOnInit() {
    this.commonserObj.breadcrum = 'Batch Edit';
  }

  onUpdate(f) {
    if(f.form.valid){
      console.log(f);

    } else {
      alert('Please enter valid inputs');
    }
  }

  onEdit(f){
    f.form.enable();
  }
  goBack(){
    this.router.navigate(['/institute/batches-list'])
  }
}
