import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  INIT,
  MetaReducer,
} from '@ngrx/store';
import * as fromRegister from './register.reducer';
import * as fromLogin from './login.reducer';
import * as authActions from '../actions/login.actions';

export const productFeatureKey = 'product';

export interface AppState {
  register: fromRegister.RegisterState;
  login: fromLogin.LoginState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  register: fromRegister.RegisterReducer,
  login: fromLogin.LoginReducer,
};

export const selectAppState = createFeatureSelector<AppState>('app');

export function logout(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: any, action: any) => {
    if (action != null && action.type === authActions.authLogout.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<AppState>[] = [logout];
