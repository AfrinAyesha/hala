import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromStore from '../store';
import * as _ from 'lodash';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromStore.AppState>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(fromStore.isLoggedIn).pipe(
      map((loggedIn) => {
        if (!loggedIn) {
          const accessToken = localStorage.getItem('token');
          if (accessToken != null) {
            // tslint:disable-next-line: no-string-literal
            return true;
          } else {
            this.router.navigateByUrl('/login');
            return false;
          }
        } else {
          // tslint:disable-next-line: no-string-literal
          return true;
        }
      })
    );
  }
}
