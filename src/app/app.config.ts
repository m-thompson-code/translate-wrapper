import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideTranslate } from './translate/delegates/mock/translate-provider';
// import { provideTranslate } from './translate/delegates/ngx-translate/translate-provider';
// import { provideTranslate } from './translate/delegates/transloco/translate-provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideTranslate(),
  ],
};
