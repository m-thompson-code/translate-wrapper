import { ChangeDetectorRef, Injectable, Injector, PipeTransform, runInInjectionContext } from '@angular/core';
import {
  TRANSLOCO_LANG,
  TRANSLOCO_SCOPE,
  TranslocoPipe,
  TranslocoScope,
  TranslocoService,
} from '@jsverse/transloco';

// Not bundled in @jsverse/transloco
// so we can redefine here.
type OrArray<T> = T | T[];

@Injectable({
  providedIn: 'root',
})
export class DelegateTranslatePipeService {
  constructor() {
    console.log('transloco -> DelegateTranslatePipeService.constructor');
  }

  // Create the injectable *in the view context* so its internal `inject(...)` works.
  getPipe(injector: Injector): PipeTransform {
    return runInInjectionContext(injector, () => {
      console.log('transloco -> DelegateTranslatePipeService.getPipe');
      const translocoService = injector.get(TranslocoService);
      const providerScope: OrArray<TranslocoScope> | undefined = injector.get(TRANSLOCO_SCOPE, null) ?? undefined;
      const providerLang: string | undefined = injector.get(TRANSLOCO_LANG, null) ?? undefined;
      const cdr = injector.get(ChangeDetectorRef);
      return new TranslocoPipe(translocoService, providerScope, providerLang, cdr);
    });
  }
}
