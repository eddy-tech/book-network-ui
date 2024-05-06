import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageResponseBookResponse, PageResponseBorrowedBookResponse, PageResponseFeedBackResponse } from '../../../../services/models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input()
  feedbacks: PageResponseFeedBackResponse | PageResponseBookResponse | PageResponseBorrowedBookResponse = {};
  @Input()
  page = 0;
  @Input()
  size = 5;
  @Input()
  pages: any = [];

  @Output()
  allFeedback: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  findAllFeedbacks = () => {
    this.allFeedback.emit();
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllFeedbacks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllFeedbacks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllFeedbacks();
  }

  goToLastPage() {
    this.page = this.feedbacks.totalPages as number - 1;
    this.findAllFeedbacks();
  }

  goToNextPage() {
    this.page++;
    this.findAllFeedbacks();
  }

  get isLastPage() {
    return this.page === this.feedbacks.totalPages as number - 1;
  }

}
