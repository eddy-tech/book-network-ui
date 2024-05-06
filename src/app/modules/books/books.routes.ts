import { Routes } from "@angular/router";
import { MainComponent } from "./pages/main/main.component";
import { BookListComponent } from "./pages/book-list/book-list.component";
import { MyBooksComponent } from "./pages/my-books/my-books.component";
import { ManageBookComponent } from "./pages/manage-book/manage-book.component";
import { BorrowedBookListComponent } from "./pages/borrowed-book-list/borrowed-book-list.component";
import { MyReturnBooksComponent } from "./pages/my-return-books/my-return-books.component";
import { BookDetailsComponent } from "./pages/book-details/book-details.component";
import { authGuard } from "../../services/guard/auth.guard";

export const BOOK_ROUTES: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: BookListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-books',
        component: MyBooksComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        component: ManageBookComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-return-books',
        component: MyReturnBooksComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage/:bookId',
        component: ManageBookComponent,
        canActivate: [authGuard]
      },
      {
        path: 'details/:bookId',
        component: BookDetailsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-borrowed-books',
        component: BorrowedBookListComponent,
        canActivate: [authGuard]
      }
    ]
  }
]
