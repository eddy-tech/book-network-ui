import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-my-return-books',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './my-return-books.component.html',
  styleUrls: ['./my-return-books.component.css']
})
export class MyReturnBooksComponent implements OnInit {

  page = 0;
  size = 5;
  pages: any = [];
  returnedBooks: PageResponseBorrowedBookResponse = {};
  message = '';
  level: 'success' |'error' = 'success';
  constructor(
    private bookService: BookService
  ) {
  }

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  findAllReturnedBooks = () => {
    this.bookService.getAllReturnedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.returnedBooks = resp;
        this.pages = Array(this.returnedBooks.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

  approveBookReturn(book: BorrowedBookResponse) {
    if (!book.returned) {
      return;
    }
    this.bookService.approveReturnBorrowedBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book return approved';
        this.findAllReturnedBooks();
      }
    });
  }
}
