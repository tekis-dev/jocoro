
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { AuthGaurd } from '../../services/authGaurd.service';
import { CommonService } from '../../services/common.service';
import { MasterService } from '../../services/master.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  constructor(private masterObj: MasterService,
    private routerObj: Router,
    private route:ActivatedRoute
  ) {
    if (this.masterObj.token == null && this.masterObj.token == '') {
      this.routerObj.navigate(['../login'],{relativeTo:this.route});
    }
    if (this.masterObj.userType !== 1) {
      this.masterObj.checkUselogin();
    }
  }
  ngOnInit() {

  }
}
