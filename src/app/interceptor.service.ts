import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  intercept(req: any, next: HttpHandler) {
    req =req.clone({ headers: req.headers.set('Authentication', this.getCookie("Test")) });
   req =req.clone({ headers: req.headers.set('cookies', `{"Authentication":"${this.getCookie("Test")}"}`) });
   req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
   return next.handle(req);
 }

 private getCookie(name: string) {
   let ca: string = document.cookie;
   let caLen: number = 1;
   let cookieName = `${name}=`;
   let c: string;

   for (let i: number = 0; i < caLen; i += 1) {
     c = ca.replace(/^\s+/g, '').trim();
     if (c.indexOf(cookieName) == 0) {
       return c.replace(cookieName, "").trim()
       
     }
   }
   return ''  
 }
}
