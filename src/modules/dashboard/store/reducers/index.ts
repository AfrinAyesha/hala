import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromDashboard from './dashboard.reducer';

export const productFeatureKey = 'dashboard';

export interface DashboardState {
  dashboard: fromDashboard.DashboardState;
}

export const DashboardReducers: ActionReducerMap<DashboardState> = {
  dashboard: fromDashboard.DashboardReducer,
};

export const selectDashboardState = createFeatureSelector<DashboardState>(productFeatureKey);
