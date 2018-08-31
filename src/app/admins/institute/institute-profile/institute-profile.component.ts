import { Component, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Data, MasterService } from '../../services/master.service';
import { Router, NavigationEnd } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';
import { InstituteService } from '../../services/institute.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-institute-profile',
  templateUrl: './institute-profile.component.html',
  styleUrls: ['./institute-profile.component.css']
})
export class InstituteProfileComponent implements OnInit, AfterContentInit {
  res: any;
  logo_file: any = null;
  files: File;
  @ViewChild('regForm') form: any;
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
    private router: Router,
    private route:ActivatedRoute
  ) {

    this.instituteserObj.user_id = this.masterObj.userId;
  }

  ngOnInit() {

    this.form.btnText = "Update";
    this.urlForm = new FormGroup({
      'i_url': new FormControl(''),
      'f_url': new FormControl(''),
      'g_url': new FormControl(''),
    });
    this.instituteserObj.editorFlag = false;
    /* bind values to the reg form */

    this.BindRegistrationForm();
  }

  /* institute reg'n form binding */
  BindRegistrationForm() {
    this.instituteserObj.getInstituteDetails(this.instituteserObj.user_id)
      .subscribe(
      (data: Data) => {
        this.res = <Data>data;
        if (this.res.data.length > 0) {
          this.res = this.res.data;
          this.instituteserObj.instituteId = this.res[0].iid;
          this.instituteserObj.i_name = this.res[0].institute_name;
          this.masterObj.headerName = this.res[0].institute_name.toUpperCase();
          localStorage.setItem('headerName', this.masterObj.headerName);
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
                this.masterObj.getCities(this.res[0].state).subscribe(
                  (data) => {
                    const res2: any = <Data>data;
                    if (res2.data.length > 0) {
                      this.masterObj.cities = res2.data;
                      // this.form.Institute_form.controls.i_city.disabled ;

                      this.form.Institute_form.controls.i_city.setValue(this.res[0].city_name)
                    }
                  },
                  (error) => {
                    this.alertObj.errorAlert(error.error.message);

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
            // this.logo_file = this.masterObj.getimages('logos', this.res[0].logo)

            this.logo_file = this.masterObj.url + '/images/' + this.res[0].logo;
            this.logobtnText = "Update logo";
            document.body.scrollTo(0, 0);
          }

        } else {
          this.alertObj.infoAlert('Please register your Institute').then(
            (dt) => {
              this.instituteserObj.editorFlag = true;
              this.router.navigate(['../../settings/institute-registration'],{relativeTo:this.route});
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
   
  }

  /* on reg'n form cancel */

  bindregformOncancel() {
    this.instituteserObj.getInstituteDetails(this.instituteserObj.user_id)
      .subscribe(
      (data: Data) => {
        this.res = <Data>data;

        if (this.res.data.length > 0) {
          this.res = this.res.data;
          this.instituteserObj.instituteId = this.res[0].iid;
          this.instituteserObj.i_name = this.res[0].institute_name;
          this.masterObj.headerName = this.res[0].institute_name.toUpperCase();
          localStorage.setItem('headerName', this.masterObj.headerName);
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
                this.alertObj.errorAlert(error.message);
              } else if (error.status === 401) {
                this.alertObj.errorAlert(error.error.message);
              } else if (error.status === 500) {
                this.alertObj.errorAlert(error.error.message);
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
                this.masterObj.getCities(this.res[0].state).subscribe(
                  (data) => {
                    const res2: any = <Data>data;
                    if (res2.data.length > 0) {
                      this.masterObj.cities = res2.data;
                      // this.form.Institute_form.controls.i_city.disabled ;
                      this.form.Institute_form.controls.i_city.setValue(this.res[0].city_name)
                    }
                  },
                  (error) => {
                    this.alertObj.errorAlert(error.error.message);
                  }
                  );
              }
            },
            (error) => {
              this.alertObj.errorAlert(error.error.message);
            }
          );
        } else {
          this.alertObj.infoAlert('Please register your Institute').then(
            (dt) => {
              this.instituteserObj.editorFlag = true;
              this.router.navigate(['../../settings/institute-registration'],{relativeTo:this.route});
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
  }

  /* link url to http */
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

  /* url form binding */
  bindURLs() {
    this.instituteserObj.getInstituteDetails(this.instituteserObj.user_id).subscribe(
      (data: Data) => {
        this.res = <Data>data;
        
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

  /* reg'n  edit button click */
  onedit(f) {
    this.btncancel = true;
    f.Institute_form.enable();
    this.instituteserObj.editorFlag = false;
    f.Institute_form.controls.mobile.disable();
    f.Institute_form.controls.email.disable();
  }

  /* reg'n cancel button event */
  onCancel() {
    this.bindregformOncancel();
    // this.BindRegistrationForm();
    this.form.Institute_form.disable();
  }

  /* on image change event */
  handleFileInput(event) {

    if (event.target.files && event.target.files[0]) {
      this.files = event.target.files[0];
      const reader = new FileReader();
      const maxSize = 300;

      const image = new Image();
      const canvas = document.createElement('canvas');

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
          event.target.value = '';
          // console.log(dataURItoBlob(dataUrl));
          return dataUrl;
        };
      }

    } else {
      event.target.value = '';
      // this.files = null;
      // this.logo_file = null;
      // this.alertObj.infoAlert('no file - logo');
    }
  }

  /* logo cancel button event */
  onlogoCancel() {
    this.logo_file = null;
    this.bindLogo();
    this.files = null;
  }

  /* insti reg'n  form update */
  onRegistrationUpdate(f) {
    var i_form: FormGroup = f.form;
    if (i_form.valid) {

      if (this.instituteserObj.instituteId === null && this.instituteserObj.instituteId == undefined) {
        this.instituteserObj.instituteId = parseInt(localStorage.getItem('Iid'), 10);
      }
      var iType = this.instituteserObj.i_type[0];
      for (var j = 1; j < this.instituteserObj.i_type.length; j++) {
        iType = iType + ',' + this.instituteserObj.i_type[j];
      }
      var cityId = 0;
      var temp = this.masterObj.cities.filter(x => x.city_name === this.instituteserObj.txtCity.trim());
      if (temp.length > 0) {
        cityId = temp[0].id;
      } else {
        // var temp = this.masterObj.cities.filter(x => x.city_name === this.instituteserObj.txtCity.trim());

      }
      var secNo = (i_form.controls.i_secNo.value == undefined || i_form.controls.i_secNo.value == null) ? '' : i_form.controls.i_secNo.value;
      var putoptions = {
        inst_id: this.instituteserObj.instituteId,
        inst_name: this.instituteserObj.i_name,
        inst_typ: iType,
        cont_per: i_form.controls.fullname.value,
        cont_pri_num: i_form.controls.mobile.value,
        cont_sec_num: secNo,
        door_no: i_form.controls.Address_1.value.trim(),
        street_name: i_form.controls.Address_2.value,
        area: i_form.controls.i_area.value.trim(),
        landmark: i_form.controls.i_landmark.value,
        city_id: cityId,
        city_name: this.instituteserObj.txtCity.trim(),
        state: this.instituteserObj.selState,
        pincode: i_form.controls.i_pin.value,
        country: this.instituteserObj.selCountry,
        about: i_form.controls.about.value == null ? '' : i_form.controls.about.value
      };
      this.instituteserObj.PutInstitutebyId(putoptions).subscribe(
        (data: Data) => {
          this.res = <Data>data;
          if (this.res.status == 1) {

            this.masterObj.headerName = this.instituteserObj.i_name.toUpperCase();
            localStorage.setItem('headerName', this.masterObj.headerName);
            i_form.controls.mobile.disabled;
            i_form.controls.email.disabled;
            i_form.disable();
            this.alertObj.topRoghtAlert('Updated Successfully');

          } else {
            this.alertObj.warningAlert(this.res.message + 'please try after sometime')
          }
        },
        (error) => {
          this.alertObj.consoleContent('On update instittute profile', error);
          if (error.status === 404) {
            this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
          } else if (error.status === 401) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status === 500) {
            this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
          } else if (error.status > 0) {
            this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
          }
        }
      );

    } else {

    }
  }

  /* logo bind */
  bindLogo() {
    this.instituteserObj.getInstituteDetails(this.instituteserObj.user_id).subscribe(
      (data: Data) => {
        this.res = <Data>data;
        if (this.res.data.length > 0) {
          this.res = this.res.data;
          if (this.res[0].logo !== '' && this.res[0].logo !== null) {
            // this.logo_file = this.masterObj.getimages('logos', this.res[0].logo);

            this.logo_file = this.masterObj.url + '/images/' + this.res[0].logo;
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

  /* logo upload btn event */

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
  }

  /* url form upload function */
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
