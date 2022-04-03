import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppSandbox } from './sandbox/app.sandbox';
import * as fromStore from './store';

@Injectable()
export class HttpReqResInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private store: Store<fromStore.AppState>,
    private activatedRoute: ActivatedRoute,
    private authSandbox: AppSandbox
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = window.localStorage.getItem('token');
    if (accessToken != null) {
      request = request.clone({
        setHeaders: { Authorization: 'Bearer ' + accessToken },
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          this.authSandbox.loginFail();
          this.router.navigateByUrl(`/login`);
        } else if (error && error.status === 403) {
          this.router.navigateByUrl('/login');
        }
        return throwError(error);
      })
    );
  }
}
