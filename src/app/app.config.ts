import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideMockRootTranslations } from './translate';
// import { provideNgxTranslateRootTranslations } from './translate/delegates/ngx-translate';
// import { provideTranslocoRootTranslations } from './translate/delegates/transloco';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // For testing
    provideMockRootTranslations(),
    // For ngx-translate
    // provideNgxTranslateRootTranslations(),
    // For transloco
    // provideTranslocoRootTranslations(),
  ],
};
