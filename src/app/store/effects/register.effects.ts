import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromStore from '../../store';
import * as registerActions from '../actions/register.actions';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';

@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<fromStore.AppState>
  ) {}

  addUs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerActions.RegisterUser),
      switchMap(({ data }) =>
        this.apiService.register(data).pipe(
          map((res) => {
            if (res.code === 0) {
              const token = res.data.Token;
              localStorage.setItem('token', token);
              return registerActions.RegisterUserSuccess({ data: res });
            } else {
              return registerActions.RegisterUserFailure({ errorMessage: res.message });
            }
          }),
          catchError((errorMessage) => {
            return of(registerActions.RegisterUserFailure({ errorMessage }));
          })
        )
      )
    );
  });
}
