import { Routes } from '@angular/router';
import { authGuard } from './services/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./modules/authentication/auth.routes').then((m) => m.AUTH_ROUTES)
  },
  {
    path: 'books',
    loadChildren: () => import('./modules/books/books.routes').then((m) => m.BOOK_ROUTES),
    canActivate: [authGuard]
  }
];
