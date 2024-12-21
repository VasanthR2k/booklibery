import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/books.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute,  ActivatedRouteSnapshot, RouterStateSnapshot,CanActivate } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formSubmitted = false;
  login:FormGroup
  
  

  constructor(public fb: FormBuilder, private route: Router,private service: BooksService,private cookieService: CookieService){
    this.login = this.fb.group({
      Username: ['',Validators.required],
      password: ['',Validators.required,],


    })

  }
  get validData() {
    return this.login.controls;
  }
  ngOnInit(): void {
 
   
  }
 
  Submit(){
   console.log("this.login.value",this.login.value)
    this.service.finddatacheck(this.login.value).subscribe(result => {

      if(result.message == "username doesn't same"){
        
        confirm("username and password doesn't match ")
        
       }
      else{
        console.log(result.access_token)
        // localStorage.setItem("token",JSON.stringify(result.access_token))
        this.cookieService.set('Test', result.access_token);
        this.route.navigate(['books'])

      }
     
    })

  }
  
}
