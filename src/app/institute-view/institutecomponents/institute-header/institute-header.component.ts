import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { InstituteService } from '../../service/institute.service';

@Component({
  selector: 'institute-header',
  templateUrl: './institute-header.component.html',
  styleUrls: ['./institute-header.component.css']
})
export class InstituteViewHeaderComponent implements OnInit {
  
 logo:string;
 instituteName:string;
  constructor(
    public instiServObj: InstituteService,
  ) { 
    
   }

  ngOnInit() {

  }

  // stickyNavTop = $('.navbar-intitute').offset().top;

  stickyNav() {
    var scrollTop = $(window).scrollTop();

    if (scrollTop > 100) {
      $('.navbar-intitute').addClass('stickyheader');
    }
    else {
      $('.navbar-intitute').removeClass('stickyheader');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    this.stickyNav();
  }
  
}
