import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';
import swal from 'sweetalert2';

@Injectable()
export class AlertsService {

  online: Observable<boolean>;
  // on = require('');
  constructor() {
    this.online = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').mapTo(true),
      Observable.fromEvent(window, 'offline').mapTo(false)
    )
  }

  /* top-right alert */

  topRoghtAlert(option) {
    swal({
      position: 'top-end',
      toast: true,
      type: 'success',
      title: option,
      background: 'green',
      showConfirmButton: false,
      timer: 3000
    });
  }
  
  successAlert(option) {
    swal({
      type: 'success',
      title: option,
      showConfirmButton: false,
      timer: 3000
    });
  }
  errorAlert(message) {
    swal({
      type: 'error',
      text: message,
    })
  }

  warningAlert(message) {
   return swal({
      type: 'warning',
      text: message,
    })
  }
  infoAlert(message) {
    return swal({
      type: 'info',
      text: message,
      showConfirmButton: false,
      timer: 3000
    })
  }

  infoAlertwithbutton(message,btntext) {
    return swal({
      type: 'info',
      text: message,
      confirmButtonText: btntext,
      showCancelButton: false,
      // timer: 3000
    })
  }

  confirmAlert(option) {
    return swal({
      title: 'Are you sure ' + option.message + '?',
      // text: option.message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: option.btntext
    })
  }

  consoleContent(place, content) {
    console.log(place, content);
  }


}
