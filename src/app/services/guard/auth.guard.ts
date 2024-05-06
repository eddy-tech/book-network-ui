import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { TokenService } from '../token/token.service';

export const authGuard: CanActivateFn = () => {
  const token = inject(TokenService).token;
  const router = inject(Router);

  return token !== null || router.parseUrl('/')
};
