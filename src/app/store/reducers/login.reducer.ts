import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { Action, createReducer, on } from '@ngrx/store';
import * as LoginActions from '../actions/login.actions';
import * as RegisterActions from '../actions/register.actions';

export interface LoginState {
  isLoggedIn: boolean;
  isLoading: boolean | null;
  errorMessage: any | null;
}

export const initialState: LoginState = {
  isLoggedIn: false,
  isLoading: null,
  errorMessage: null,
};

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.login, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: null,
  })),
  on(LoginActions.LoginSuccess, (state, { data }) => {
    return {
      ...state,
      isLoggedIn: true,
      isLoading: false,
      errorMessage: null,
    };
  }),
  on(LoginActions.LoginFailure, (state, { errorMessage }) => {
    return { ...state, isLoggedIn: false, isLoading: false, errorMessage };
  }),
  on(RegisterActions.RegisterUserSuccess, (state) => {
    return { ...state, isLoggedIn: true };
  }),
  on(LoginActions.authLogout, (state) => {
    return { ...state, isLoggedIn: false, isLoading: null, errorMessage: null };
  })
);
export function LoginReducer(state: LoginState | undefined, action: Action): LoginState {
  return loginReducer(state, action);
}
