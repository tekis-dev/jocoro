import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-hostel-home',
  templateUrl: './hostel-home.component.html',
  styleUrls: ['./hostel-home.component.css']
})
export class HostelHomeComponent implements OnInit {
  @Input() galleryDetailsList:any=[
    {
      "img_file_name":"http://122.175.58.27:3000/images/courses/9128428jley5za5.gif",
      "title":"test"
    },
    {
      "img_file_name":"http://122.175.58.27:3000/images/courses/9128428jley5za5.gif",
      "title":"test"
    },
    {
      "img_file_name":"http://122.175.58.27:3000/images/courses/9128428jley5za5.gif",
      "title":"test"
    },
    {
      "img_file_name":"http://122.175.58.27:3000/images/courses/9128428jley5za5.gif",
      "title":"test"
    },
    {
      "img_file_name":"http://122.175.58.27:3000/images/courses/9128428jley5za5.gif",
      "title":"test"
    }
];
  constructor() { }
 
  ngOnInit() {
  }

}
