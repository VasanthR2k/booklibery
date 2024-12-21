import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { BooksService } from '../books.service';
@Component({
  selector: 'app-pastrologin',
  templateUrl: './pastrologin.component.html',
  styleUrls: ['./pastrologin.component.css']
})
export class PastrologinComponent {
  pastrologin: FormGroup

  constructor(private route: Router, public fb: FormBuilder, private service: BooksService, private cookieService: CookieService) {

    this.pastrologin = this.fb.group({
      Username: ['', Validators.required],
      password: ['', Validators.required,],
    })


  }

  get fieldUsername() {
    return this.pastrologin.get('Username') as FormControl
  }
  get fieldPassword() {
    return this.pastrologin.get('password') as FormControl
  }
  Submit(): any {
    if (this.pastrologin.invalid) {
      this.pastrologin.markAllAsTouched();
      return false
    }
    this.service.pastrodata(this.pastrologin.value).subscribe(result => {

      if (result.message == "username doesn't same") {

        confirm("username and password doesn't match ")

      }
      else {

        this.cookieService.set('Test', result.access_token);
        this.route.navigate(['books'])

      }
    })

  }



}
