import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  pageFlag = false;

  breadcrum = 'Dashboard';
  mainbreadcrum = '';
  Reg_jobSeekers = 0;
  reg_emp = 0;
  posted_jobs = 0;

  months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

  ckEditorConfig: {} = {
    // "uiColor": "#99000",
    "toolbarGroups": [
      { "name": "document", "groups": ["mode", "document", "doctools"] },
      { "name": "editing", "groups": ["find", "selection", "spellchecker", "editing"] },
      // { "name": "forms", "groups": ["forms"] },
      { "name": 'clipboard', "groups": ['clipboard', 'undo'] },
      { "name": 'insert' },
      { "name": 'basicstyles', "groups": ['basicstyles', 'cleanup'] },
      { "name": 'paragraph', "groups": ['list', 'indent', 'blocks', 'align', 'bidi'] },
      { "name": 'styles' },
      { "name": 'colors' },

    ],
    "removeButtons": "Iframe,Flash,New page,Form,Print,Source,Save,Templates,Find,Replace,Scayt,SelectAll",
    "extraPlugins": "divarea"
  }
  presentMenu = [];
  inst_menu: Menu[] = [
    {
      id: 1, menuName: 'Dashboard', icon: 'fa fa-dashboard', url: '/institute/institute-dashboard'
    },
    {
      id: 2, menuName: 'Profile', icon: 'fa fa-dashboard', url: '/institute/institute-edit'
    },
    {
      id: 3, menuName: 'Details', icon: 'fa fa-dashboard', url: '/institute/faculty Details'
    },
    {
      id: 4, menuName: 'Course', icon: 'fa fa-dashboard', url: '/institute/manage-course'
    },
    {
      id: 5, menuName: 'Batches & Demos', icon: 'fa fa-dashboard', url: '/institute/batches-list'
    },
    {
      id: 6, menuName: 'Gallery', icon: 'fa fa-dashboard', url: '/institute/add-photos'
    }
  ]
  hostel_menu: Menu[] = [
    /*
     { 
       id: 1, menuName: 'Dashboard', icon: 'fa fa-dashboard', url: '/institute/institute-dashboard' 
     },
     {
       id: 2, menuName: 'Institutes Profile', icon: 'fa fa-dashboard', url: '/institute/institute-edit' 
     },
     {
       id: 3, menuName: 'Faculty',  icon: 'fa fa-dashboard', url: '/institute/faculty Details' 
     },
     {
       id: 4, menuName: 'Manage Course', icon: '', url: '/institute/manage-course' 
     },
     {
       id: 5, menuName: 'Batches & Demo', icon: '', url: '/institute/batches-list'
     },
     {
       id: 6, menuName: 'Gallery', icon: '', url: '/institute/add-photos'
     }
     */
  ];
  job_menu: Menu[] = [
    /*
    { 
      id: 1, menuName: 'Dashboard', icon: 'fa fa-dashboard', url: '/institute/institute-dashboard' 
    },
    {
      id: 2, menuName: 'Institutes Profile', icon: 'fa fa-dashboard', url: '/institute/institute-edit' 
    },
    {
      id: 3, menuName: 'Faculty',  icon: 'fa fa-dashboard', url: '/institute/faculty Details' 
    },
    {
      id: 4, menuName: 'Manage Course', icon: '', url: '/institute/manage-course' 
    },
    {
      id: 5, menuName: 'Batches & Demo', icon: '', url: '/institute/batches-list'
    },
    {
      id: 6, menuName: 'Gallery', icon: '', url: '/institute/add-photos'
    }
    */
  ]
  constructor() { }

  restrictNumeric(event) {
    const pattern = /^[a-zA-Z ]+$/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onlyNumberKey(event) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  AlphaNumeric(event) {
    const pattern = /[a-zA-Z0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  withspace(event) {
    const pattern = /[a-zA-Z0-9 ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  resizeImage = (settings: IResizeImageOptions) => {
    const file = settings.file;
    const maxSize = settings.maxSize;
    const reader = new FileReader();
    const image = new Image();
    const canvas = document.createElement('canvas');
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
      return dataUrl;
      // return dataURItoBlob(dataUrl);
    };

    return new Promise((ok, no) => {
      if (!file.type.match(/image.*/)) {
        no(new Error("Not an image"));
        return;
      }

      reader.onload = (readerEvent: any) => {
        image.onload = () => ok(resize());
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
    })
  };
}

interface IResizeImageOptions {
  maxSize: number;
  file: File;
}

export interface Menu {
  id: number
  menuName: string;
  icon: string;
  url: string;
};



