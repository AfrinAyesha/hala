import { createAction, props } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';

export const GetUsersList = createAction(
  '[Dashboard] Get Users List',
  props<{ pageNumber: number }>()
);

export const GetUsersListSuccess = createAction(
  '[Dashboard] Get Users List Success',
  props<{ data: any }>()
);

export const GetUsersListFailure = createAction(
  '[Dashboard] Get Users List Failure',
  props<{ errorMessage: any }>()
);

export const AddUser = createAction('[Dashboard] Add User', props<{ data: User }>());

export const AddUserSuccess = createAction('[Dashboard] Add User Success', props<{ data: any }>());

export const AddUserFailure = createAction(
  '[Dashboard] Add User Failure',
  props<{ errorMessage: any }>()
);

export const EditUser = createAction('[Dashboard] Edit User', props<{ data: User }>());

export const EditUserSuccess = createAction(
  '[Dashboard] Edit User Success',
  props<{ data: any }>()
);

export const EditUserFailure = createAction(
  '[Dashboard] Edit User Failure',
  props<{ errorMessage: any }>()
);

export const DeleteUser = createAction('[Dashboard] Delete User', props<{ id: number }>());

export const DeleteUserSuccess = createAction(
  '[Dashboard] Delete User Success',
  props<{ id: any }>()
);

export const DeleteUserFailure = createAction(
  '[Dashboard] Delete User Failure',
  props<{ errorMessage: any }>()
);
