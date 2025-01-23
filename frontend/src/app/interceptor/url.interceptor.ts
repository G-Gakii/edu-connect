import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core/testing';
import { environment } from '../../environments/environment.development';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = environment.APIURL;
  req = req.clone({
    url: `${baseUrl}/${req.url}`,
  });
  return next(req);
};
