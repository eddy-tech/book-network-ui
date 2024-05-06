import { Component, OnInit } from '@angular/core';
import { BookResponse, PageResponseFeedBackResponse } from '../../../../services/models';
import { BookService, FeedbackService } from '../../../../services/services';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RatingComponent } from '../../components/rating/rating.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, RatingComponent, PaginationComponent],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: BookResponse = {};
  feedbacks: PageResponseFeedBackResponse = {};
  page = 0;
  size = 5;
  pages: any = [];

  private bookId = 0;

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.params['bookId'];
    if (this.bookId) {
      this.bookService.getBooksById({
        'book-id': this.bookId
      }).subscribe({
        next: (book) => {
          this.book = book;
          this.findAllFeedbacks();
        }
      });
    }
  }

  findAllFeedbacks = () => {
    this.feedbackService.getAllFeedbackByBook({
      'book-id': this.bookId,
      page: this.page,
      size: this.size
    }).subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.pages = Array(this.feedbacks.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }
}
