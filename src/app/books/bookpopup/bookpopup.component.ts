import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { BooksService } from 'src/app/books.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bookpopup',
  templateUrl: './bookpopup.component.html',
  styleUrls: ['./bookpopup.component.css']
})

export class BookpopupComponent {
  books: FormGroup

  constructor(private dialogRef: MatDialogRef<BookpopupComponent>, public fb: FormBuilder,
    private service: BooksService, @Inject(MAT_DIALOG_DATA) private data: any,) {

    this.books = this.fb.group({
      id: [data.load.id || 0],
      title: [data.load.title || '', Validators.required],
      description: [data.load.description || '', Validators.required],
      author: [data.load.author || '', Validators.required],
      release_year: [data.load.release_year || '', Validators.required],
      download: [''],
      uploadpdf: [''],
      imagevalue: [data.load.uploadpdf || ''],
      pdf: [data.load.download]
    })

  }

  saveBook() {
    if (this.data.isNew) {
      this.service.createBooks(this.books.value).subscribe(result => {
        if (result.message == "title already exit") {
          confirm("name already exit ")
        }
        else {
          this.dialogRef.close(false);
        }
      })
    }

    else {
      this.service.Update(this.books.value,).subscribe(result => {
        this.dialogRef.close(false);
      })
    }
  }

  imagedeleteresult(type: string) {
    var uploadpdf = this.imagevalue?.value
    var id = this.id?.value
    if (confirm("are you  delete ")) {
      this.service.removefile({ id, type }).subscribe(result => {
        if (type == "image") {
          this.books.controls['imagevalue'].setValue('');
        }
        else {
          this.books.controls['pdf'].setValue('');
        }
      })
    }
  }

  uploadpdf(event: any) {
    var files = event.target.files
    this.books.controls['download'].setValue(files[0]);
  }

  image(event: any) {
    var files = event.target.files
    this.books.controls['uploadpdf'].setValue(files[0]);
  }

  CancelDialog() {
    this.dialogRef.close(false);
  }

  get imagevalue() { return this.books.get("imagevalue") }

  get id() { return this.books.get('id') }

  get pdf() { return this.books.get('pdf') }
}