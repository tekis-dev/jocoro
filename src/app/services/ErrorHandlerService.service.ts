import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MasterService } from './master.service';
import { AlertsService } from './alerts.service';
import { Router } from '@angular/router';


@Injectable()
export class ErrorHandlerService implements HttpInterceptor {
  private master: MasterService;
  constructor(
    private inj: Injector,
    private alertObj: AlertsService,
    private router: Router) {
    // setTimeout(() => );
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const master = this.inj.get(MasterService)
    const authHeader = master.getheader();
    // // Clone the request to add the new header.
    const authReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });
    // Pass on the cloned request instead of the original request.
    return next
      .handle(authReq)
      .catch(err => {
        //  console.log(err);
        if (err.status > 0 || err.status == 401 || err.status == 404 || err.status == 500) {
          return Observable.throw(err);
        } else {
          this.alertObj.online.subscribe(val => {
            if (val) {
              this.alertObj.errorAlert('Server down Please try after some time');
              this.router.navigate(['/error']);
            } else {
              this.alertObj.errorAlert('Please check your internet connection');
              this.router.navigate(['/error']);
            }
            return Observable.throw(err);
          })
        }

      });

  }
}
