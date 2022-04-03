import { createAction, props } from '@ngrx/store';
import { Register } from 'src/app/interfaces/register.interface';

export const RegisterUser = createAction(
  '[Register Users] Register User',
  props<{ data: Register }>()
);

export const RegisterUserSuccess = createAction(
  '[Register Users] Register User Success',
  props<{ data: any }>()
);

export const RegisterUserFailure = createAction(
  '[Register Users] Register User Failure',
  props<{ errorMessage: any }>()
);
