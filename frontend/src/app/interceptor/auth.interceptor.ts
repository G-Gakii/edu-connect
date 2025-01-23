import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const uri = new URL(req.url);

  if (uri.hostname !== 'localhost' && uri.hostname !== '127.0.0.1') {
    return next(req);
  }
  let auth = inject(AuthService);
  let token = auth.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Token ${token}`,
      },
    });
  }

  return next(req);
};
