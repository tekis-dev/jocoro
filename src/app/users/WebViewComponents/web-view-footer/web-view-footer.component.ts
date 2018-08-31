import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'web-view-footer',
  templateUrl: './web-view-footer.component.html',
  styleUrls: ['./web-view-footer.component.css']
})
export class WebViewFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onScrollToTop(){
    let home = document.getElementById('home');
      if (home !== null) {
        home.scrollIntoView();
        home = null;
      }
  }
  

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 200) {
      document.getElementById('scroll-to-top').style.display = 'block';
    } else if (number < 200) {
      document.getElementById('scroll-to-top').style.display = 'none';
    }

  }

}
