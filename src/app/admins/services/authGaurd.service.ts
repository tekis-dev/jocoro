import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthGaurd implements CanActivate {
  loggedin = false;
  constructor(public routingobj: Router) { }
  canActivate() {
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      this.loggedin = true;
      return true;
    } else {
      this.routingobj.navigate(['dashboard/login']);
      return false;
    }
  }

}
