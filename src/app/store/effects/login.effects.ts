import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromStore from '../../store';
import * as loginActions from '../actions/login.actions';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<fromStore.AppState>
  ) {}

  addUs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginActions.login),
      switchMap(({ data }) =>
        this.apiService.login(data).pipe(
          map((res) => {
            if (res.code === 0) {
              const token = res.data.Token;
              localStorage.setItem('token', token);
              return loginActions.LoginSuccess({ data: res });
            } else {
              return loginActions.LoginFailure({ errorMessage: res.message });
            }
          }),
          catchError((errorMessage) => {
            return of(loginActions.LoginFailure({ errorMessage }));
          })
        )
      )
    );
  });
}
