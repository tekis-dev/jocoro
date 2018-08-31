import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';

import { MasterService } from '../../services/master.service';
import { InstituteService } from '../../services/institute.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private routerObj: Router,
    private route: ActivatedRoute,
    private masterObj: MasterService,
    private instituteObj: InstituteService
  ) {
    this.masterObj.clearData();
    localStorage.clear();
    this.instituteObj.ClearData();
    this.routerObj.navigate(['../../login'], { relativeTo: this.route });
  }

  ngOnInit() {
  }

}
