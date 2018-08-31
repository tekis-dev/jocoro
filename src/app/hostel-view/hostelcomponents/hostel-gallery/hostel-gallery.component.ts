import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hostel-gallery',
  templateUrl: './hostel-gallery.component.html',
  styleUrls: ['./hostel-gallery.component.css']
})
export class HostelGalleryComponent implements OnInit {
  galleryDetailsList:any=[
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
