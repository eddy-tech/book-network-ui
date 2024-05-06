import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, FeedbackRequest, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService, FeedbackService } from '../../../../services/services';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from '../../components/rating/rating.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-borrowed-book-list',
  standalone: true,
  imports: [FormsModule, RatingComponent, PaginationComponent],
  templateUrl: './borrowed-book-list.component.html',
  styleUrls: ['./borrowed-book-list.component.css']
})
export class BorrowedBookListComponent implements OnInit {
  page = 0;
  size = 5;
  pages: any = [];
  borrowedBooks: PageResponseBorrowedBookResponse = {};
  selectedBook: BorrowedBookResponse | undefined = undefined;
  feedbackRequest: FeedbackRequest = {bookId: 0, comment: '', note: 0};
  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService
  ) {
  }
  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  findAllBorrowedBooks = () => {
    this.bookService.getAllBorrowedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (response) => {
        this.borrowedBooks = response;
        this.pages = Array(this.borrowedBooks.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

  returnBorrowedBook(book: BorrowedBookResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowBook({
      'book-id': this.selectedBook?.id as number
    }).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedBook = undefined;
        this.findAllBorrowedBooks();
      }
    });
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
      }
    });
  }

}
