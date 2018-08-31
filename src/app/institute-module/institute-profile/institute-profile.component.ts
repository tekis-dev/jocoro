import { Component, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { InstituteComponent } from '../institute/institute.component';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { InstituteService } from '../services/institute.service';
import { Data, MasterService } from '../../services/master.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';


@Component({
  selector: 'app-institute-profile',
  templateUrl: './institute-profile.component.html',
  styleUrls: ['./institute-profile.component.css']
})
export class InstituteProfileComponent implements OnInit, AfterContentInit {
  res: any;
  logo_file: any = null;
  files: File;
  @ViewChild('regForm') form: InstituteComponent;
  @ViewChild('map') map: ElementRef;
  btncancel = false;
  urlForm: FormGroup;
  mapKey = '';
  url = '';
  iUrl = '';
  fUrl = '';
  gUrl = '';
  logobtnText = "Upload logo";
  btnUrl = "Save";
  constructor(public commonserObj: CommonService, private instituteserObj: InstituteService,
    public sanitizer: DomSanitizer, private masterObj: MasterService, private alertObj: AlertsService,
    private router: Router) {
    this.instituteserObj.user_id = this.masterObj.userId;
  }

  ngOnInit() {
    this.commonserObj.breadcrum = 'Institute Profile';
    this.urlForm = new FormGroup({
      'i_url': new FormControl(''),
      'f_url': new FormControl(''),
      'g_url': new FormControl(''),
    });
    this.instituteserObj.editorFlag = false;
    /* bind values to the reg form */

    this.BindRegistrationForm();
  }
  BindRegistrationForm() {
    this.instituteserObj.getInstituteDetails(this.instituteserObj.user_id)
      .subscribe(
      (data: Data) => {
        this.res = <Data>data;
        this.instituteserObj.consolecontent(this.res);
        if (this.res.data.length > 0) {
          this.res = this.res.data;
          this.instituteserObj.instituteId = this.res[0].iid;
          this.instituteserObj.i_name = this.res[0].institute_name;
          this.instituteserObj.getTeachMode().subscribe(
            (data: Data) => {
              const res: any = <Data>data;
              this.instituteserObj.tech_mode = res.data;
              this.instituteserObj.i_type = [];
              var itype = this.res[0].institute_type.split(',');
              for (var i = 0; i < itype.length; i++) {
                this.instituteserObj.i_type.push(parseInt(itype[i], 10));
              }
            },
            (error) => {
              this.alertObj.consoleContent('On intitute details erro', error);
              if (error.status === 404) {
                this.alertObj.errorAlert('Please contact Adminstrator' + error.message);
              } else if (error.status === 401) {
                this.alertObj.errorAlert(error.error.message);
              } else if (error.status === 500) {
                this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
              } else if (error.status > 0) {
                this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
              } 
            }
          );
          this.form.Institute_form.controls.email.setValue(this.masterObj.regEmail);
          this.form.Institute_form.controls.fullname.setValue(this.res[0].contact_person);
          this.form.Institute_form.controls.mobile.setValue(this.res[0].mobile_no);
          this.form.Institute_form.controls.i_secNo.setValue(this.res[0].mobile_no2);
          this.form.Institute_form.controls.Address_1.setValue(this.res[0].door_no);
          this.form.Institute_form.controls.Address_2.setValue(this.res[0].street);
          this.form.Institute_form.controls.i_area.setValue(this.res[0].area);
          this.form.Institute_form.controls.i_landmark.setValue(this.res[0].landmark);
          this.form.Institute_form.controls.i_pin.setValue(this.res[0].pincode);
          this.instituteserObj.selCountry = this.res[0].country;
          this.form.Institute_form.controls.about.setValue(this.res[0].about_institute);
          this.masterObj.getStates(this.res[0].country).subscribe(
            (data: Data) => {
              var res1: any = <Data>data;
              if (res1.data.length > 0) {
                this.masterObj.states = res1.data;
                this.instituteserObj.selState = this.res[0].state;
                this.masterObj.getCities(this.res[0].state)
                  .subscribe(
                  (data) => {
                    const res2: any = <Data>data;
                    if (res2.data.length > 0) {
                      this.masterObj.cities = res2.data;
                      // this.form.Institute_form.controls.i_city.disabled ;
                      this.form.Institute_form.controls.i_city.setValue(this.res[0].city_name)
                    }
                  },
                  (error) => {
                    this.instituteserObj.instituealert('get cities error');
                    this.instituteserObj.consolecontent('get cities ' + error);
                  }
                  );
              }
            },
            (error) => {
              this.instituteserObj.instituealert('error');
            }
          );


          /* urls */
          this.urlForm.controls.i_url.setValue(this.res[0].web_site);
          this.urlForm.controls.f_url.setValue(this.res[0].fb_page);
          this.urlForm.controls.g_url.setValue(this.res[0].gplus);

          if (this.res[0].web_site !== null || this.res[0].fb_page !== null || this.res[0].gplus !== null) {
            this.urlForm.disable();
            this.btnUrl = 'Update';
            if (this.res[0].web_site !== '' && this.res[0].web_site !== null) {
              this.iUrl = this.gotoUrl(this.res[0].web_site);
            }
            if (this.res[0].fb_page !== '' && this.res[0].fb_page !== null) {
              this.fUrl = this.gotoUrl(this.res[0].fb_page);
            }
            if (this.res[0].gplus !== '' && this.res[0].gplus !== null) {
              this.gUrl = this.gotoUrl(this.res[0].gplus);
            }
          }
          if (this.res[0].logo !== '' && this.res[0].logo !== null) {
            this.logo_file = this.masterObj.getimages('logos', this.res[0].logo)

            // this.logo_file = this.masterObj.url + '/uploads/images/logos/'+;
            this.logobtnText = "Update logo";
          }

        } else {
          this.alertObj.infoAlert('Please register your Institute').then(
            (dt) => {
              this.instituteserObj.editorFlag = true;
              this.router.navigate(['/institute/institute-registration']);
            }
          );;

        }
      },
      (error) => {
        this.alertObj.consoleContent('On intitute details erro', error);
        if (error.status === 404) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 500) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
        } 
      }
      );
    // console.log(this.form.Institute_form);
  }

  bindregformOncancel() {
    this.instituteserObj.getInstituteDetails(this.instituteserObj.user_id)
      .subscribe(
      (data: Data) => {
        this.res = <Data>data;
        this.instituteserObj.consolecontent(this.res);
        if (this.res.data.length > 0) {
          this.res = this.res.data;
          this.instituteserObj.instituteId = this.res[0].iid;
          this.instituteserObj.i_name = this.res[0].institute_name;
          this.instituteserObj.getTeachMode().subscribe(
            (data: Data) => {
              const res: any = <Data>data;
              this.instituteserObj.tech_mode = res.data;
              this.instituteserObj.i_type = [];
              var itype = this.res[0].institute_type.split(',');
              for (var i = 0; i < itype.length; i++) {
                this.instituteserObj.i_type.push(parseInt(itype[i], 10));
              }
            },
            (error) => {
              this.alertObj.consoleContent('On intitute details erro', error);
              if (error.status === 404) {
                this.alertObj.errorAlert('Please contact Adminstrator' + error.message);
              } else if (error.status === 401) {
                this.alertObj.errorAlert(error.error.message);
              } else if (error.status === 500) {
                this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
              } else if (error.status > 0) {
                this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
              } 
            }
          );
          this.form.Institute_form.controls.email.setValue(this.masterObj.regEmail);
          this.form.Institute_form.controls.fullname.setValue(this.res[0].contact_person);
          this.form.Institute_form.controls.mobile.setValue(this.res[0].mobile_no);
          this.form.Institute_form.controls.i_secNo.setValue(this.res[0].mobile_no2);
          this.form.Institute_form.controls.Address_1.setValue(this.res[0].door_no);
          this.form.Institute_form.controls.Address_2.setValue(this.res[0].street);
          this.form.Institute_form.controls.i_area.setValue(this.res[0].area);
          this.form.Institute_form.controls.i_landmark.setValue(this.res[0].landmark);
          this.form.Institute_form.controls.i_pin.setValue(this.res[0].pincode);
          this.instituteserObj.selCountry = this.res[0].country;
          this.form.Institute_form.controls.about.setValue(this.res[0].about_institute);
          this.masterObj.getStates(this.res[0].country).subscribe(
            (data: Data) => {
              var res1: any = <Data>data;
              if (res1.data.length > 0) {
                this.masterObj.states = res1.data;
                this.instituteserObj.selState = this.res[0].state;
                this.masterObj.getCities(this.res[0].state)
                  .subscribe(
                  (data) => {
                    const res2: any = <Data>data;
                    if (res2.data.length > 0) {
                      this.masterObj.cities = res2.data;
                      // this.form.Institute_form.controls.i_city.disabled ;
                      this.form.Institute_form.controls.i_city.setValue(this.res[0].city_name)
                    }
                  },
                  (error) => {
                    this.instituteserObj.instituealert('get cities error');
                    this.instituteserObj.consolecontent('get cities ' + error);
                  }
                  );
              }
            },
            (error) => {
              this.instituteserObj.instituealert('error');
            }
          );
        } else {
          this.alertObj.infoAlert('Please register your Institute').then(
            (dt) => {
              this.instituteserObj.editorFlag = true;
              this.router.navigate(['/institute/institute-registration']);
            }
          );;

        }
      },
      (error) => {
        this.alertObj.consoleContent('On intitute details erro', error);
        if (error.status === 404) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 500) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
        }
      });

  }
  ngAfterContentInit() {

    this.form.Institute_form.disable();
    console.log(this.form.Institute_form);

  }
  gotoUrl(link: string) {
    var result;
    var startingUrl = "http://";
    var httpsStartingUrl = "https://";
    if (link.startsWith(startingUrl) || link.startsWith(httpsStartingUrl)) {
      result = link;
    }
    else {
      result = startingUrl + link;
    }
    return result;
  }

  bindURLs() {
    this.instituteserObj.getInstituteDetails(this.instituteserObj.user_id) .subscribe(
      (data: Data) => {
        this.res = <Data>data;
        this.instituteserObj.consolecontent(this.res);
        if (this.res.data.length > 0) {
          this.res = this.res.data;

          this.urlForm.controls.i_url.setValue(this.res[0].web_site);
          this.urlForm.controls.f_url.setValue(this.res[0].fb_page);
          this.urlForm.controls.g_url.setValue(this.res[0].gplus);

          if (this.res[0].web_site !== null || this.res[0].fb_page !== null || this.res[0].gplus !== null) {
            this.urlForm.disable();
            this.btnUrl = 'Update';
            if (this.res[0].web_site !== '' && this.res[0].web_site !== null) {
              this.iUrl = this.gotoUrl(this.res[0].web_site);
            }
            if (this.res[0].fb_page !== '' && this.res[0].fb_page !== null) {
              this.fUrl = this.gotoUrl(this.res[0].fb_page);
            }
            if (this.res[0].gplus !== '' && this.res[0].gplus !== null) {
              this.gUrl = this.gotoUrl(this.res[0].gplus);
            }
          }
        }
      },
      (error) => {
        this.alertObj.consoleContent('On intitute ', error);
        if (error.status === 404) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 500) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
        }
      }
      );

  }
  onedit(f) {
    this.btncancel = true;
    f.Institute_form.enable();
    this.instituteserObj.editorFlag = false;
    f.Institute_form.controls.mobile.disable();
    f.Institute_form.controls.email.disable();
  }
  onCancel() {
    this.bindregformOncancel();
    // this.BindRegistrationForm();
    this.form.Institute_form.disable();
  }
  handleFileInput(event) {

    if (event.target.files && event.target.files[0]) {
      this.files = event.target.files[0];
      const reader = new FileReader();
      const maxSize = 300;

      const image = new Image();
      const canvas = document.createElement('canvas');

      // console.log(event.target.files[0]);
      if (event.target.files[0].size < 102400) {
        reader.onload = (readerEvent: any) => {
          this.logo_file = readerEvent.target.result;
          // console.log(this.logo_file);
        };
        reader.readAsDataURL(event.target.files[0]);

      } else {
        reader.onload = (readerEvent: any) => {
          image.onload = () => resize();
          image.src = readerEvent.target.result;
          this.logo_file = readerEvent.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);

        const resize = () => {
          let width = image.width;
          let height = image.height;
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          let dataUrl = canvas.toDataURL('image/jpeg');
          this.logo_file = dataUrl;
          // console.log(dataURItoBlob(dataUrl));
          return dataUrl;
        };

        const dataURItoBlob = (dataURI: string) => {
          const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
            atob(dataURI.split(',')[1]) :
            encodeURI(dataURI.split(',')[1]);
          const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
          const max = bytes.length;
          const ia = new Uint8Array(max);
          for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
          return new Blob([ia], { type: mime });
        };
      }

    } else {
      // this.logo_file = null;
      // this.alertObj.infoAlert('no file - logo');
    }
  }


  onlogoCancel() {
    this.logo_file = null;
    this.bindLogo();
    this.files = null;
  }

  bindLogo() {
    this.instituteserObj.getInstituteDetails(this.instituteserObj.user_id).subscribe(
      (data: Data) => {
        this.res = <Data>data;
        this.instituteserObj.consolecontent(this.res);
        if (this.res.data.length > 0) {
          this.res = this.res.data;
          if (this.res[0].logo !== '' && this.res[0].logo !== null) {
            this.logo_file = this.masterObj.getimages('logos', this.res[0].logo)
            this.logobtnText = "Update logo";
          }
        }
      },
      (error) => {
        this.alertObj.consoleContent('On intitute ', error);
        if (error.status === 404) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 500) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
        }
      }
      );

  }


  logoUpload() {
    if (this.logo_file !== null) {

      const logo = this.logo_file.split(',');
      var putlogo = {
        'uid': this.instituteserObj.user_id,
        'module': 'logos',
        'image': this.logo_file
      }
      this.instituteserObj.putInstituteLogo(putlogo).subscribe(
        (data) => {
          const res: any = <Data>data;
          if (res.status == 1) {
            this.masterObj.logo = this.logo_file;
            this.files = null;
            this.alertObj.topRoghtAlert('Uploaded Successfully');
          }
        },
        (error) => {
          this.alertObj.consoleContent('On put logo error', error);
          if (error.status === 404) {
            this.alertObj.errorAlert('Please contact Adminstrator' + error.message);
          } else if (error.status === 401) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status === 500) {
            this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
          } else if (error.status > 0) {
            this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
          } 
        }
      );
    }
  }
  onUpdate(f) {
    console.log(f);
    if (!f.Institute_form.valid) {
      alert('Please enter all required fields');
    } else {
    }
  }
  sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getHtmlContent() {
    //This will return '<p> Text </p>' as a string
    this.map.nativeElement.innerHTML = this.mapKey;
  }
  urlEdit() {
    this.urlForm.enable();
  }

  OnUrlformCacel() {
    this.bindURLs();
    // this.form.Institute_form.disable();

  }
  onUploadUrl() {
    if (this.urlForm.invalid) {
      this.alertObj.infoAlert('Please fill all details');
    } else {
      var options = {
        id: this.instituteserObj.instituteId,
        website: this.urlForm.controls.i_url.value,
        fb_page: this.urlForm.controls.f_url.value,
        gplus: this.urlForm.controls.g_url.value,
        whatsapp: '',
      }

      this.urlForm.disable();
      if (options.website !== '' && options.website !== null) {
        this.iUrl = this.gotoUrl(options.website);
      } else {
        options.website = "";
      }
      if (options.fb_page !== '' && options.fb_page !== null) {
        this.fUrl = this.gotoUrl(options.fb_page);
      } else {
        options.fb_page = "";
      }
      if (options.gplus !== '' && options.gplus !== null) {
        this.gUrl = this.gotoUrl(options.gplus);
      } else {
        options.gplus = "";
      }

      this.instituteserObj.putUrls(options).subscribe(
        (data: Data) => {
          var res: any = <Data>data;
          // console.log(res, res.data);
          var arr: Array<any> = res.data;
          if (res.status === 1) {
            this.urlForm.disable();
            if (this.btnUrl === 'Save') {
              this.alertObj.topRoghtAlert('Saved Successfully');
              this.btnUrl = 'Update';
            } else
              this.alertObj.topRoghtAlert('Updated Successfully');
          }
        },
        (error) => {
          this.alertObj.consoleContent('On put urls error', error);
          if (error.status === 404) {
            this.alertObj.errorAlert('Please contact Adminstrator' + error.message);
          } else if (error.status === 401) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status === 500) {
            this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
          } else if (error.status > 0) {
            this.alertObj.errorAlert('Please contact Adminstrator' + error.error.message);
          } 
        }
      );
    }
  }
}
