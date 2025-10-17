import { Injectable, Injector, PipeTransform, runInInjectionContext } from '@angular/core';
import { TranslatePipe as _TranslatePipe } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class DelegateTranslatePipeService {
  // Create the pipe *in the view context* so its internal `inject(...)` works.
  getPipe(injector: Injector): PipeTransform {
    return runInInjectionContext(injector, () => new _TranslatePipe());
  }
}
