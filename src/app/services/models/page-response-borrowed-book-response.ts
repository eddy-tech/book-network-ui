/* tslint:disable */
/* eslint-disable */
import { BorrowedBookResponse } from '../models/borrowed-book-response';
export interface PageResponseBorrowedBookResponse {
  content?: Array<BorrowedBookResponse>;
  firstPage?: boolean;
  lastPage?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
