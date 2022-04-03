import { createSelector } from '@ngrx/store';
import * as fromRegister from '../reducers';
import * as _ from 'lodash';

export const selectRegisterState = createSelector(
  fromRegister.selectAppState,
  // tslint:disable-next-line: no-shadowed-variable
  (state: fromRegister.AppState) => state.register
);

export const selectFeature = (state: fromRegister.AppState) => state.register;

export const getRegisterState = createSelector(selectFeature, (state) => {
  return {
    isLoading: state.isLoading,
    errorMessage: state.errorMessage,
  };
});
