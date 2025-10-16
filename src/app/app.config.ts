import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// For testing
// import { provideTranslate } from './translate/delegates/mock/translate-provider';

// For ngx-translate
import { provideTranslate } from './translate/delegates/ngx-translate/translate-provider';

// For transloco
// import { provideTranslate } from './translate/delegates/transloco/translate-provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideTranslate(),
  ],
};
