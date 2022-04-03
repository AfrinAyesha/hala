import { createSelector } from '@ngrx/store';
import * as fromLogin from '../reducers';
import * as _ from 'lodash';
import { LoginState } from '../reducers/login.reducer';

export const selectLoginState = (state: fromLogin.AppState) => state.login;

export const isLoggedIn = createSelector(selectLoginState, (state: LoginState) => state.isLoggedIn);

export const getLoginState = createSelector(selectLoginState, (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    isLoading: state.isLoading,
    errorMessage: state.errorMessage,
  };
});
