import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookResponse } from '../../../../services/models';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink, RatingComponent],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit {
  private _book: BookResponse = {};
  private _manage: boolean = false;

  @Output()
  private shareBook: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();
  @Output()
  private archiveBook: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();
  @Output()
  private addToWaitingList: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();
  @Output()
  private borrowBook: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();
  @Output()
  private editBook: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();
  @Output()
  private details: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();

  get book(): BookResponse {
    return this._book;
  }

  @Input()
  set book(value: BookResponse) {
    this._book = value;
  }

  get bookCover(): string | undefined {
    if (this._book.cover) {
      return 'data:image/png;base64,' + this._book.cover;
    }
    return 'https://source.unsplash.com/user/c_v_r/1900x800';
  }

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  constructor() {}

  ngOnInit() {}

  onShowDetails = () => {
    this.details.emit(this._book);
  };

  onBorrow = () => {
    this.borrowBook.emit(this._book);
  };

  onAddToWaitingList = () => {
    this.addToWaitingList.emit(this._book);
  };

  onEdit = () => {
    this.editBook.emit(this._book);
  };

  onShare = () => {
    this.shareBook.emit(this._book);
  };

  onArchive = () => {
    this.archiveBook.emit(this._book);
  };
}
