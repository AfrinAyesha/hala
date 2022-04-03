import { createAction, props } from '@ngrx/store';
import { Login } from 'src/app/interfaces/login.interface';

export const authLogout = createAction('[ Login ]  Auth Logout');

export const login = createAction('[Login] Login', props<{ data: Login }>());

export const LoginSuccess = createAction('[Login] Login Success', props<{ data: any }>());

export const LoginFailure = createAction('[Login] Login Failure', props<{ errorMessage: any }>());
