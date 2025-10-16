import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { HttpBackend, provideHttpClient } from "@angular/common/http";
import { provideTranslateService, TranslateLoader } from "@ngx-translate/core";
// import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import{ TranslateService as _TranslateService } from "@ngx-translate/core"
import { TranslateService } from "../../translate.service";
import { DelegateTranslateService } from "./delegate-translate.service";
import { TranslatePipeService } from "../../translate-pipe.service";
import { DelegateTranslatePipeService } from "./delegate-translate-pipe.service";

function HttpLoaderFactory(httpBackend: HttpBackend) {
  return new MultiTranslateHttpLoader(httpBackend, [
    { prefix: './i18n/core/', suffix: '.json' },
    { prefix: './i18n/vendors/' }, // , "suffix: '.json'" being the default value
    // { prefix: './i18n/non-existent/', optional: true }, // Wont create any log
  ]);
}

export const provideTranslate: () => EnvironmentProviders = () => {
  return makeEnvironmentProviders([
    provideHttpClient(),
    provideTranslateService({
      // loader: provideTranslateHttpLoader({prefix:'./i18n/core/', suffix:'.json'}),
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
      lang: 'en',
      fallbackLang: 'en',
    }),
    _TranslateService,
    { provide: TranslateService, useClass: DelegateTranslateService },
    { provide: TranslatePipeService, useClass: DelegateTranslatePipeService },
  ]);
}
