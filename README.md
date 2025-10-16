# MultipleJsons

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/m-thompson-code/translate-wrapper)

This project showcases how to wrap ngx-translate and transloco while providing an abstract service to hide the implementation. This means that consumers won't know if they're using ngx-translate or transloco and shouldn't have to.

You can switch between ngx-translate, transloco, and a mock-service through `src/app/app.config.ts`. Just uncomment the `provideTranslate` that you want.

```
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
```
