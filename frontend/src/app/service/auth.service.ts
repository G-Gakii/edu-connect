import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interface/user';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Response } from '../interface/response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  registerError = signal('');
  isLoggedIn = signal(false);

  constructor() {}

  registerUser(user: User): Observable<Response> {
    return this.http
      .post<Response>('account/register/', user)
      .pipe(catchError(this.handleError.bind(this)));
  }
  loginUser(user: User): Observable<{ token: string }> {
    this.isLoggedIn.set(true);
    return this.http.post<{ token: string }>('account/login/', user).pipe(
      tap((res) => {
        let mytoken = localStorage.setItem('token', res.token);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  getToken() {
    const token = localStorage.getItem('token');

    return token;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      this.registerError.set(error.message);
    } else {
      if (error.error.username) {
        this.registerError.set(error.error.username[0]);
      }
      if (error.error.message) {
        this.registerError.set(error.error.message);
        console.log(error.error.message);
      }
    }
    return throwError(error);
  }
}
