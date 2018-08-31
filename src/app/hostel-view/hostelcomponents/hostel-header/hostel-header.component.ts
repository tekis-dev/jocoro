import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'hostel-header',
  templateUrl: './hostel-header.component.html',
  styleUrls: ['./hostel-header.component.css']
})
export class HostelHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  stickyNav() {
    var scrollTop = $(window).scrollTop();

    if (scrollTop > 100) {
      $('.navbar-hostel').addClass('stickyheader');
    }
    else {
      $('.navbar-hostel').removeClass('stickyheader');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    this.stickyNav();
  }
}
