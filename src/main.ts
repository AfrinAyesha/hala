import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

(async () => {
  const response = await fetch('./config/env.json');
  const config = await response.json();

  environment.baseURL = config.baseURL;
  environment.spaURL = config.spaURL;
  environment.production = config.production;

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
})();
