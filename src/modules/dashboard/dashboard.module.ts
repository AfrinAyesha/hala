import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApiService, ModuleConfig } from './services/api.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardSandbox } from './sandbox/dashboard.sandbox';
import { DashboardReducers, Effects, productFeatureKey } from './store';
import { MaterialModule } from 'src/app/material.module';
import { AddUpdateComponent } from './components/add-update/add-update.component';

export { ModuleConfig };
export interface ModuleOptions {
  baseURL?: string;
  spaURL?: string;
}

export const FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<ModuleOptions>(
  'forRoot() Module configuration'
);

@NgModule({
  declarations: [DashboardComponent, AddUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DashboardRoutingModule,
    MaterialModule,
    StoreModule.forFeature(productFeatureKey, DashboardReducers),
    EffectsModule.forFeature(Effects),
  ],
  entryComponents: [],
})
export class DashboardModule {
  static forRoot(options?: ModuleOptions): ModuleWithProviders<DashboardModule> {
    return {
      ngModule: DashboardModule,
      providers: [
        ApiService,
        DashboardSandbox,
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: options,
        },
        {
          provide: ModuleConfig,
          useFactory: provideMyServiceOptions,
          deps: [FOR_ROOT_OPTIONS_TOKEN],
        },
      ],
    };
  }
}

export function provideMyServiceOptions(options?: ModuleOptions): ModuleConfig {
  const myServiceOptions = new ModuleConfig();
  if (options) {
    if (typeof options.baseURL === 'string') {
      myServiceOptions.baseURL = options.baseURL;
    }
    if (typeof options.spaURL === 'string') {
      myServiceOptions.spaURL = options.spaURL;
    }
  }
  return myServiceOptions;
}
