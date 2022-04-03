import { NgModule } from '@angular/core';

import { environment } from 'src/environments/environment';
import { DashboardModule, ModuleConfig } from 'src/modules/dashboard/dashboard.module';

export function ModuleConfigFactory(): ModuleConfig {
  return {
    baseURL: environment.baseURL,
    spaURL: environment.spaURL,
  };
}

@NgModule({
  imports: [DashboardModule.forRoot()],
  providers: [
    {
      provide: ModuleConfig,
      useFactory: ModuleConfigFactory,
    },
  ],
})
export class DashboardWrapperModule {}
