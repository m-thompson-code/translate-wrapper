import {
  ChangeDetectorRef,
  Injectable,
  Injector,
  PipeTransform,
  runInInjectionContext,
} from '@angular/core';
import {
  TRANSLOCO_LANG,
  TRANSLOCO_SCOPE,
  TranslocoPipe,
  TranslocoService,
} from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class DelegateTranslatePipeService {
  // Create the pipe *in the view context* so its internal `inject(...)` works.
  getPipe(injector: Injector): PipeTransform {
    return runInInjectionContext(injector, () => {
      console.log('transloco -> DelegateTranslatePipeService.getPipe');
      const translocoService = injector.get(TranslocoService);
      const providerScope = injector.get(TRANSLOCO_SCOPE, null) ?? undefined;
      const providerLang = injector.get(TRANSLOCO_LANG, null) ?? undefined;
      const cdr = injector.get(ChangeDetectorRef);
      return new TranslocoPipe(translocoService, providerScope, providerLang, cdr);
    });
  }
}
