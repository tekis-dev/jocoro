import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//import { HostelService } from './service/Hostel.service';


@Component({
  selector: 'app-hostel-preview',
  templateUrl: './hostel-view.component.html',
  styleUrls: ['./hostel-view.component.css']
})
export class HostelViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router
    ) {

    }

  ngOnInit() {

  }

}
