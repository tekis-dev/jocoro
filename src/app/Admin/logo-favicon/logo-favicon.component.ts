import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-favicon',
  templateUrl: './logo-favicon.component.html',
  styleUrls: ['./logo-favicon.component.css']
})
export class LogoFaviconComponent implements OnInit {
  files: File | FileList;
  disabled: boolean = false;
  logo_file: File = null;
  favicon_file: File = null;
  
  constructor() { }

  ngOnInit() {
  }
  handleFileInput(event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.logo_file = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      const file: FileList = event.target.files
      if (file.length > 0) {
        this.files = file[0];
        console.log(this.files);

        let formData: FormData = new FormData();
        formData.append('uploadFile', this.files, this.files.name);
        // let headers = new Headers();
        // /** In Angular 5, including the header Content-Type can invalidate your request */
        // headers.append('Content-Type', 'multipart/form-data');
        // headers.append('Accept', 'application/json');
        // let options = new RequestOptions({ headers: headers });
        // this.http.post(`${this.apiEndPoint}`, formData, options)
        //     .map(res => res.json())
        //     .catch(error => Observable.throw(error))
        //     .subscribe(
        //         data => console.log('success'),
        //         error => console.log(error)
        //     )
      }

    } else{
      this.logo_file = null;
      alert('no file - logo');
    }
  }
  handleFileInput_favicon(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.favicon_file = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      const file: FileList = event.target.files
      if (file.length > 0) {
        this.files = file[0];
        console.log(this.files);

        let formData: FormData = new FormData();
        formData.append('uploadFile', this.files, this.files.name);
      }
    } else {
      this.favicon_file= null;
      alert('no file selected');
    }
  }

  onSubmit(){
    if(this.logo_file !== null && this.favicon_file!== null){
      alert('saved successfully');
    }
  }
  onCancel(){
    // clear files if there are
  console.log(this.logo_file,this.favicon_file);
  this.files = null;
    if(this.logo_file !== null ){
      // alert('clear successfully');
      this.logo_file = null;
      
    }
    if(this.favicon_file !== null){
      this.favicon_file = null;
    }
  }
}
