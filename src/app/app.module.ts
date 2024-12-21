import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BookpopupComponent } from './books/bookpopup/bookpopup.component';
import { LoginComponent } from './login/login.component';
import { AuthserviceService } from './authservice.service';
import { CookieService } from 'ngx-cookie-service';
import { PastrologinComponent } from './pastrologin/pastrologin.component';
import { InterceptorService } from './interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookpopupComponent,
    LoginComponent,
    PastrologinComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule,  
    MatTableModule,
    MatPaginatorModule,   
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true },AuthserviceService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
