import { createSelector } from '@ngrx/store';
import * as fromLogin from '../reducers';
import * as _ from 'lodash';

export const selectState = createSelector(
  fromLogin.selectDashboardState,
  // tslint:disable-next-line: no-shadowed-variable
  (state: fromLogin.DashboardState) => state.dashboard
);

// export const selectState = (state: fromLogin.DashboardState) => state.dashboard;

export const getUsersList = createSelector(selectState, (state) => {
  const data: any = [];
  _.forEach(state.entities, (value, key) => {
    data.push(value);
  });
  return {
    isLoading: state.isLoading,
    hasError: state.hasError,
    errorMessage: state.errorMessage,
    totalPages: state.totalPages,
    perPage: state.perPage,
    data,
  };
});
