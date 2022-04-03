import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromStore from '../../store';
import * as dashboardActions from '../actions/dashboard.actions';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<fromStore.DashboardState>
  ) {}

  getUL$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dashboardActions.GetUsersList),
      switchMap(({ pageNumber }) =>
        this.apiService.getUsersList(pageNumber).pipe(
          map((res) => {
            return dashboardActions.GetUsersListSuccess({ data: res });
          }),
          catchError((errorMessage) => {
            return of(dashboardActions.GetUsersListFailure({ errorMessage }));
          })
        )
      )
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dashboardActions.AddUser),
      switchMap(({ data }) =>
        this.apiService.addUser(data).pipe(
          map((res) => {
            return dashboardActions.AddUserSuccess({ data: res });
          }),
          catchError((errorMessage) => {
            return of(
              dashboardActions.AddUserFailure({ errorMessage: errorMessage.error.Message })
            );
          })
        )
      )
    );
  });

  editUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dashboardActions.EditUser),
      switchMap(({ data }) =>
        this.apiService.editUser(data).pipe(
          map((res) => {
            return dashboardActions.EditUserSuccess({ data: res });
          }),
          catchError((errorMessage) => {
            console.log(errorMessage);
            return of(
              dashboardActions.EditUserFailure({ errorMessage: errorMessage.error.Message })
            );
          })
        )
      )
    );
  });

  delUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dashboardActions.DeleteUser),
      switchMap(({ id }) =>
        this.apiService.deleteUser(id).pipe(
          map((res) => {
            return dashboardActions.DeleteUserSuccess({ id });
          }),
          catchError((errorMessage) => {
            return of(dashboardActions.DeleteUserFailure({ errorMessage }));
          })
        )
      )
    );
  });
}
