import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild, UrlTree } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class AuthserviceService  {

 
  constructor(private route: Router,private cookieService: CookieService) { }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     const cookieValue = this.cookieService.get('Test');
     console.log("cookieValue",cookieValue)
   
    if (cookieValue){
      return true

    }
    else{
    return  this.route.navigate(['login'])
        
    }
   

  }
  

}
