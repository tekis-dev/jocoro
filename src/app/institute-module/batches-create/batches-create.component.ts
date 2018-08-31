import { Component, OnInit, ViewChild } from '@angular/core';
import { BatchesComponent } from '../batches/batches.component';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-batches-create',
  templateUrl: './batches-create.component.html',
  styleUrls: ['./batches-create.component.css']
})
export class BatchesCreateComponent implements OnInit {

  @ViewChild('batchForm') form: BatchesComponent;

  constructor(public commonserObj: CommonService) { }

  ngOnInit() {
    this.commonserObj.breadcrum = 'Batch Create'
  }

  onUpdate(f) {
    if(f.form.valid){
      console.log(f);

    } else {
      alert('Please enter valid inputs');
    }
  }

}
