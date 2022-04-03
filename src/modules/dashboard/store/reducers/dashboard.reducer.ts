import { NgPlural } from '@angular/common';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as DashboardActions from '../actions/dashboard.actions';

export interface DashboardState extends EntityState<any> {
  isLoading: boolean;
  hasError: boolean | null;
  errorMessage: string | null;
  addUpdateUserSuccess: boolean | null;
  totalPages: number | null;
  perPage: number | null;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: (user) => {
    return user.id;
  },
});
export const initialState: DashboardState = adapter.getInitialState({
  isLoading: true,
  hasError: null,
  errorMessage: null,
  addUpdateUserSuccess: null,
  totalPages: null,
  perPage: null,
});

export const dashboardReducer = createReducer(
  initialState,

  on(DashboardActions.GetUsersList, (state) => {
    return adapter.removeAll({ ...state, hasError: null, isLoading: true });
  }),
  on(DashboardActions.GetUsersListSuccess, (state, { data }) => {
    return adapter.upsertMany(data.data, {
      ...state,
      isLoading: false,
      hasError: false,
      totalPages: data.total_pages,
      perPage: data.per_page,
    });
  }),
  on(DashboardActions.GetUsersListFailure, (state, { errorMessage }) => {
    return { ...state, isLoading: false, hasError: true };
  }),
  on(DashboardActions.AddUser, (state) => {
    return { ...state, isLoading: true, hasError: false };
  }),
  on(DashboardActions.AddUserSuccess, (state, { data }) => {
    return adapter.upsertOne(data, {
      ...state,
      isLoading: false,
      hasError: false,
    });
  }),
  on(DashboardActions.AddUserFailure, (state, { errorMessage }) => {
    return { ...state, isLoading: false, hasError: true, errorMessage };
  }),
  on(DashboardActions.EditUser, (state) => {
    return { ...state, isLoading: true, hasError: false };
  }),
  on(DashboardActions.EditUserSuccess, (state, { data }) => {
    return adapter.upsertOne(data, {
      ...state,
      isLoading: false,
      hasError: false,
    });
  }),
  on(DashboardActions.EditUserFailure, (state, { errorMessage }) => {
    return { ...state, isLoading: false, hasError: true, errorMessage };
  }),
  on(DashboardActions.DeleteUser, (state) => {
    return { ...state, isLoading: true, hasError: false };
  }),
  on(DashboardActions.DeleteUserSuccess, (state, { id }) => {
    return adapter.removeOne(id, {
      ...state,
      isLoading: false,
      hasError: false,
    });
  }),
  on(DashboardActions.DeleteUserFailure, (state, {}) => {
    return { ...state, isLoading: false, hasError: true };
  })
);
export function DashboardReducer(
  state: DashboardState | undefined,
  action: Action
): DashboardState {
  return dashboardReducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
