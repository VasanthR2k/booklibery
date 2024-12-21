import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BooksService } from '../books.service';
import { BookpopupComponent } from './bookpopup/bookpopup.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any; // Total count of books
  @Input() employee: any; // List of books

  displayedColumns: string[] = [
    'title',
    'description',
    'author',
    'release_year',
    'download',
    'uploadpdf',
    'Actions'
  ];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  dataSource: MatTableDataSource<any> | any;
  constructor(
    private dialog: MatDialog,
    private service: BooksService,
    private route: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadBookCount();
  }

  // Load all books and initialize the table
  loadBooks(): void {
    this.service.GetBooks().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data.books);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
        this.employee = data.books;
      },
      error: (err) => {
        console.error('Error loading books:', err);
      }
    });
  }

  // Get total count of books
  loadBookCount(): void {
    this.service.findcount().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Error fetching book count:', err);
      }
    });
  }

  // Delete a book
  deleteBook(id: any): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.service.Deletebooks(id).subscribe({
        next: () => {
          this.loadBooks();
          this.loadBookCount();
        },
        error: (err) => {
          console.error('Error deleting book:', err);
        }
      });
    }
  }

  // Apply table filter
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue) {
      this.service.filter(filterValue).subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource(data);
        },
        error: (err) => {
          console.error('Error filtering books:', err);
        }
      });
    } else {
      this.loadBooks();
    }
  }

  // Handle selection from dropdown
  getSelectedValue(event: any): void {
    const selectedValue = event.value;
    if (selectedValue && selectedValue !== 'All') {
      this.service.filter(selectedValue).subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource(data);
        },
        error: (err) => {
          console.error('Error filtering by title:', err);
        }
      });
    } else {
      this.loadBooks();
    }
  }

  // Mark evaluation logic
  conditionvalue(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (value >= 45) {
      if (value <= 100) {
        if (value > 90) {
          alert('Grade: A+');
        } else if (value > 80) {
          alert('Grade: A');
        } else if (value > 70) {
          alert('Grade: B');
        } else if (value > 60) {
          alert('Grade: C');
        } else {
          alert('Grade: D');
        }
      } else {
        alert('This is not a valid mark');
      }
    } else {
      alert('Fail');
    }
  }

  // Loop logic for custom functionality
  forLoop(event: Event): void {
    const count = Number((event.target as HTMLInputElement).value);
    for (let i = 0; i < count; i++) {
      console.log('Number:', i);
    }
  }

  // Open the popup dialog
  OpenPopup(row: any, isNew: boolean): void {
    const dialogRef = this.dialog.open(BookpopupComponent, {
      data: { load: row, isNew: isNew },
      disableClose: true,
      height: '600px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadBooks();
      this.loadBookCount();
    });
  }

  // Logout user and clear cookies
  logout(): void {
    this.cookieService.delete('Test');
    this.route.navigate(['pastrologin']);
  }
}
