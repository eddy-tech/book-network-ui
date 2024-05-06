import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../../../../services/services';
import { PageResponseBookResponse } from '../../../../services/models';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookCardComponent, PaginationComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  message: string = '';
  page: number = 0;
  size: number = 5;
  pages: any = [];
  level: string = 'success';

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.findAllBooks();
  }

  findAllBooks = () => {
    this.bookService.getAllBooks({
      page: this.page,
      size: this.size
    })
    .subscribe({
      next: (books) => {
        this.bookResponse = books;
        this.pages = Array(this.bookResponse.totalPages)
        .fill(0)
        .map((x, i) => i);
      }
    })
  }

  borrowBook = (book: any) => {
    this.message = '';
    this.bookService.borrowBook({
      "book-id": book.id as number,
    })
    .subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book sucessfully added to your list';
      },
      error: (err) => {
        this.level = 'error';
        this.message = err.error.error;
      }
    })
  }
}
