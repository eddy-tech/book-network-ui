import { Component, OnInit } from '@angular/core';
import {  PageResponseBookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { Router, RouterLink } from '@angular/router';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [RouterLink, BookCardComponent, PaginationComponent],
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 5;
  pages: any = [];

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  findAllBooks = () => {
    this.bookService.getAllBooksByOwner({
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
      });
  }

  archiveBook(book: any) {
    this.bookService.updateArchivedStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.archived = !book.archived;
      }
    });
  }

  shareBook(book: any) {
    this.bookService.updateShareableStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.shareable = !book.shareable;
      }
    });
  }

  editBook(book: any) {
    this.router.navigate(['books', 'manage', book.id]);
  }
}
