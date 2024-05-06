/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllFeedbackByBook } from '../fn/feedback/get-all-feedback-by-book';
import { GetAllFeedbackByBook$Params } from '../fn/feedback/get-all-feedback-by-book';
import { PageResponseFeedBackResponse } from '../models/page-response-feed-back-response';
import { saveFeedback } from '../fn/feedback/save-feedback';
import { SaveFeedback$Params } from '../fn/feedback/save-feedback';

@Injectable({ providedIn: 'root' })
export class FeedbackService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveFeedback()` */
  static readonly SaveFeedbackPath = '/feedbacks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveFeedback()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFeedback$Response(params: SaveFeedback$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveFeedback(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveFeedback$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFeedback(params: SaveFeedback$Params, context?: HttpContext): Observable<number> {
    return this.saveFeedback$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getAllFeedbackByBook()` */
  static readonly GetAllFeedbackByBookPath = '/feedbacks/book/{book-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllFeedbackByBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFeedbackByBook$Response(params: GetAllFeedbackByBook$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFeedBackResponse>> {
    return getAllFeedbackByBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllFeedbackByBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFeedbackByBook(params: GetAllFeedbackByBook$Params, context?: HttpContext): Observable<PageResponseFeedBackResponse> {
    return this.getAllFeedbackByBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFeedBackResponse>): PageResponseFeedBackResponse => r.body)
    );
  }

}
