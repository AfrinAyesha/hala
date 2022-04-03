import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { Action, createReducer, on } from '@ngrx/store';
import * as RegisterActions from '../actions/register.actions';

export interface RegisterState {
  isLoading: boolean | null;
  errorMessage: any | null;
}

export const initialState: RegisterState = {
  isLoading: null,
  errorMessage: null,
};

export const registerReducer = createReducer(
  initialState,
  on(RegisterActions.RegisterUser, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: null,
  })),
  on(RegisterActions.RegisterUserSuccess, (state, { data }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage: null,
    };
  }),
  on(RegisterActions.RegisterUserFailure, (state, { errorMessage }) => {
    return { ...state, isLoading: false, errorMessage };
  })
);
export function RegisterReducer(state: RegisterState | undefined, action: Action): RegisterState {
  return registerReducer(state, action);
}
