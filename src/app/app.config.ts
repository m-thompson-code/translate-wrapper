import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
// import { provideMockRootTranslations } from './translate';
// import { provideNgxTranslateRootTranslations } from './translate';
import { provideTranslocoRootTranslations } from './translate';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // For testing
    // provideMockRootTranslations(),
    // For ngx-translate
    // provideNgxTranslateRootTranslations(),
    // For transloco
    provideTranslocoRootTranslations(),
  ],
};
