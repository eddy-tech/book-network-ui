/* tslint:disable */
/* eslint-disable */
import { FeedBackResponse } from '../models/feed-back-response';
export interface PageResponseFeedBackResponse {
  content?: Array<FeedBackResponse>;
  firstPage?: boolean;
  lastPage?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
