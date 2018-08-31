import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router/src/config';
import { MasterService } from '../../services/master.service';
import { AlertsService } from '../../services/alerts.service';
import { CommonService } from '../../services/common.service';
import { Router,ActivatedRoute } from '@angular/router';
import { InstituteService } from '../../services/institute.service';

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.component.html',
  styleUrls: ['./add-photos.component.css']
})
export class AddPhotosComponent implements OnInit {
  logo_file: Array<type> = [];
  files = [];
  blob = [];
  maxlength = 0;
  popImg: string = null;
  popUpTitle: string;
  popId: number = null;
  constructor(private instiObj: InstituteService,
    private alertObj: AlertsService,
    public commonserObj: CommonService,
    private route:ActivatedRoute,
    private routerObj:Router,
    private masterObj: MasterService) {
    if (this.instiObj.user_id === null)
      this.instiObj.user_id = parseInt(localStorage.getItem('userId'), 10);
  }

  ngOnInit() {
    this.commonserObj.breadcrum = 'Gallery';
    this.getImages();
  }

  getImages() {
    this.instiObj.getGalleryList(this.instiObj.user_id).subscribe(
      (data) => {
        const res: any = <Data>data;
        if (res.status == 1) {
          this.logo_file = [];
          this.blob = [];
          var arr = res.data;
          for (var i = 0; i < arr.length; i++) {
            // var img = this.masterObj.getimages('institutes', arr[i].img_file_name);
            var img = this.masterObj.url + '/images/' + arr[i].img_file_name;

            this.logo_file.push({ id: arr[i].id, title: arr[i].title, image: img });
            this.blob.push(this.dataURItoBlob(img));
          }
        }
      },
      (error) => {
        
        if (error.status === 404) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.message);
        } else if (error.status === 401) {
          this.alertObj.errorAlert(error.error.message);
        } else if (error.status === 500) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        } else if (error.status > 0) {
          this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
        } 
      }
    )
  }
  handleFileInput(event) {

    if (event.target.files && event.target.files[0] && (event.target.files.length <= 5)) {
      if ((this.logo_file.length + event.target.files.length) <= 10) {
        const maxSize = 500;
        this.files = [];
        const image = new Image();
        const canvas = document.createElement('canvas');
        for (var i = 0; i < this.blob.length; i++) {
          this.maxlength += this.blob[i].length;
        }
        if ((this.maxlength / (1024 * 1024)) > 2) {
          this.alertObj.infoAlert('you can upload upto 2MB');
        } else {
          for (let i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader();
            if (event.target.files[i].size < 102400) {
              reader.onload = (readerEvent: any) => {
                this.files.push({ title: '', image: readerEvent.target.result });
                var imgBlob: any = this.dataURItoBlob(readerEvent.target.result);
                this.blob.push(imgBlob);
                this.maxlength += imgBlob.size
                setTimeout(() => {
                  this.onAddGallery({ title: '', image: readerEvent.target.result });
                }, 500);
              };
              reader.readAsDataURL(event.target.files[i]);

            } else {
              reader.onload = (readerEvent: any) => {
                image.onload = () => resize();
                image.src = readerEvent.target.result;
                // this.logo_file.push(readerEvent.target.result);
              };
              reader.readAsDataURL(event.target.files[i]);

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
                this.files.push({ title: '', image: dataUrl });
                // this.logo_file.push({ title: '', image: dataUrl });
                // this.blob.push(this.dataURItoBlob(dataUrl));
                var imgBlob: any = this.dataURItoBlob(dataUrl);
                setTimeout(() => {
                  this.blob.push(imgBlob);
                  this.maxlength += imgBlob.size;
                  this.onAddGallery({ title: '', image: dataUrl });
                }, 500);

                return dataUrl;
              };
            }
          }
          setTimeout(() => {
            event.target.value = '';
            // console.log('hi');
            this.getImages();
            // this.routerObj.navigate(['../add-photos'],{relativeTo:this.route})
          }, (event.target.files.length + 1) * 1500);
        }
      } else {
        event.target.value = '';
        this.alertObj.warningAlert('maximum Upload limit is 10 files')
      }
    } else {
      if (event.target.files.length > 5) {
        event.target.value = '';
        this.alertObj.warningAlert('You can Upload maximum of 5 files at once');
      } else {
        event.target.value = '';
      }
        // this.alertObj.warningAlert('no file - logo');
    }

  }
  dataURItoBlob(dataURI: string) {
    const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
      atob(dataURI.split(',')[1]) :
      encodeURI(dataURI.split(',')[1]);
    const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const max = bytes.length;
    const ia = new Uint8Array(max);
    for (var j = 0; j < max; j++) ia[j] = bytes.charCodeAt(j);
    return new Blob([ia], { type: mime });
  }


  onAddGallery(option) {
    if ((this.maxlength / (1024 * 1024)) > 2) {
      this.alertObj.infoAlert('you can upload upto 2MB');
    } else {
      var putlogo = {
        'uid': this.instiObj.user_id,
        'title': option.title,
        'module': 'institutes',
        'image': option.image
      }
      this.instiObj.postInstituteGallery(putlogo).subscribe(
        (data) => {
          const res: any = <Data>data;
          if (res.status == 1) {

            // this.alertObj.topRoghtAlert('Uploaded Successfully');
          }
        },
        (error) => {
          this.alertObj.consoleContent('error occured while post gallery', error);
          if (error.status === 404) {
            this.alertObj.errorAlert('Please contact Administrator. ' + error.message);
          } else if (error.status === 401) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status === 500) {
            this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
          } else if (error.status > 0) {
            this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
          } 
        }
      );
    }
  }
  onclear(i) {

    this.alertObj.confirmAlert({ message: 'to Delete this Image?', btntext: 'Yes,Delete' }).then(
      (dt) => {
        if (dt.value) {
          this.instiObj.deleteGalleryImage(i).subscribe(
            (data) => {
              const res: any = <Data>data;
              if (res.status == 1) {
                this.alertObj.topRoghtAlert('Deleted Successfully');
              }
            },
            (error) => {
              this.alertObj.consoleContent('error occured while post gallery', error);
              if (error.status === 410) {
                if (error.error.status == 1) {
                  this.getImages();
                  this.alertObj.topRoghtAlert('Deleted Successfully');
                }
              } else if (error.status === 404) {
                this.alertObj.errorAlert('Please contact Administrator.  ' + error.message);
              }
              else if (error.status === 401) {
                this.alertObj.errorAlert(error.error.message);
              } else if (error.status === 500) {
                this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
              } else if (error.status > 0) {
                this.alertObj.errorAlert('Please contact Administrator.  ' + error.error.message);
              } 
            }
          )
        }
      }
    )
  }


  /* open popup in image */
  openPopUp(imgId) {
    document.getElementById('imgModal').style.display = 'block';
    var arr = this.logo_file.filter(x => x.id == imgId);
    this.popId = imgId;
    this.popImg = arr[0].image
    this.popUpTitle = arr[0].title;
  }
  /* open popup for title edit */
  onEdittitle(imgId) {
    document.getElementById('titleModal').style.display = 'block';
  }

  submitTitle(imgId) {
    if (this.popUpTitle == undefined) {
      this.alertObj.infoAlert('Please enter something before updating');
    } else {
      var options = {
        gid: imgId,
        title: this.popUpTitle
      }
      this.instiObj.updateGalleryTitles(options).subscribe(
        (data) => {
          const res: any = <Data>data;
          if (res.status == 1) {
            this.logo_file.filter(x => x.id == imgId)[0].title = this.popUpTitle;
            document.getElementById('imgModal').style.display = 'none';
            this.alertObj.topRoghtAlert('Updated Successfully');
          }
        },
        (error) => {
          this.alertObj.consoleContent('error occured while get gallery', error);
          if (error.status === 404) {
            this.alertObj.errorAlert('Please contact Administrator. ' + error.message);
          } else if (error.status === 401) {
            this.alertObj.errorAlert(error.error.message);
          } else if (error.status === 500) {
            this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
          } else if (error.status > 0) {
            this.alertObj.errorAlert('Please contact Administrator. ' + error.error.message);
          } 
        }
      )
    }
  }
  /* imgModal popup close  */
  onImgModalclose() {
    document.getElementById('imgModal').style.display = 'none';
  }
  /* titleModal popup close  */
  ontitleModalclose() {

  }
}

export interface type {
  id: number;
  title: string;
  image: string;
}