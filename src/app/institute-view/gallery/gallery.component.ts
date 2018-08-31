import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstituteService } from '../service/institute.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  galleryDetailsList:any=[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public instiServObj: InstituteService
  ) { }

  ngOnInit() {
    this.galleryDetailsList=this.instiServObj.GalleryDetails;
    /*if(!this.galleryDetailsList.length){
      this.router.navigate(['../'],{relativeTo:this.route})
    }*/
  }

}
