import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthserviceService } from './authservice.service';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { PastrologinComponent } from './pastrologin/pastrologin.component';

const routes: Routes = [
  {path: '', redirectTo:'pastrologin', pathMatch: 'full'},
  {
    path:'books',component:BooksComponent,
    canActivate: [AuthserviceService]
   
  },
  {
    path:'',component:PastrologinComponent
  },
  {
    path: '**', 
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
