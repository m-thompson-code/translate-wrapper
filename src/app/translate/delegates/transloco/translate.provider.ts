import {
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  isDevMode,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Translation } from '@ngx-translate/core';
import { provideTransloco, TranslocoLoader, TranslocoService } from '@jsverse/transloco';
import { forkJoin, map, tap } from 'rxjs';
import { TranslateService } from '../../translate.service';
import { DelegateTranslateService } from './delegate-translate.service';
import { TranslatePipeService } from '../../translate-pipe.service';
import { DelegateTranslatePipeService } from './delegate-translate-pipe.service';
import { AVAILABLE_LANGUAGES, AVAILABLE_LANGUAGES_TOKEN, DEFAULT_LANGUAGE } from '../../shared';


function deepMerge(target: any, source: any) {
  // If either isn't an object, return the source
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return target;

  const result = Array.isArray(target) ? [...target] : { ...target };

  for (const key of Object.keys(source)) {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(sourceValue)) {
      // Combine arrays (you could also choose to replace instead)
      result[key] = Array.isArray(targetValue)
        ? [...targetValue, ...sourceValue]
        : [...sourceValue];
    } else if (typeof sourceValue === 'object' && sourceValue !== null) {
      // Deep merge objects
      result[key] = deepMerge(targetValue || {}, sourceValue);
    } else {
      // Primitive values overwrite
      result[key] = sourceValue;
    }
  }

  return result;
}

function deepMergeAll(objects: any[]) {
  return objects.reduce((acc: any, obj: any) => deepMerge(acc, obj), {});
}

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  // getTranslation(lang: string) {
  //   return this.http.get<Translation>(`/i18n/vendors/${lang}.json`);
  // }
  getTranslation(lang: string) {
    const paths = [
      `/i18n/core/${lang}.json`,
      `/i18n/vendors/${lang}.json`
    ] as const;

    const obs$ = [
      this.http.get<Translation>(paths[0]),
      this.http.get<Translation>(paths[1])
    ] as const;

    return forkJoin(paths.map(path => this.http.get<Translation>(path))).pipe(
      map((translations) => {
        return deepMergeAll(translations);
      }),
      tap(console.log)
    );
  }
}

export const provideTranslocoRootTranslations: () => EnvironmentProviders = () => {
  return makeEnvironmentProviders([
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: [...AVAILABLE_LANGUAGES],
        defaultLang: DEFAULT_LANGUAGE,
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    { provide: AVAILABLE_LANGUAGES_TOKEN, useValue: AVAILABLE_LANGUAGES },
    { provide: TranslateService, useClass: DelegateTranslateService },
    { provide: TranslatePipeService, useClass: DelegateTranslatePipeService },
  ]);
};

export const provideTranslocoChildTranslations = (): Provider | EnvironmentProviders[] => TranslocoService;
