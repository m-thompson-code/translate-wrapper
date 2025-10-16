import {
  inject,
  Injectable,
  Injector,
  OnDestroy,
  Pipe,
  PipeTransform,
  runInInjectionContext,
} from '@angular/core';
import { DelegateTranslateService } from './delegate-translate.service';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TranslateService } from '../../translate.service';

/**
 * Deep comparison of two objects to determine if they have changed. Only
 * handles simple JSON-like objects: no functions, no circular references, no
 * special types like Date, Map, Set, etc
 */
const isDifferent = (
  a: Record<string, any> | null | undefined,
  b: Record<string, any> | null | undefined
): boolean => {
  if (!a && !b) return false;
  if (!a && b) return true;
  if (a && !b) return true;
  if (a === b) return false;

  if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') return a !== b;

  const stack: Array<[any, any]> = [[a, b]];

  while (stack.length) {
    const [x, y] = stack.pop()!;

    // Fast check for primitive mismatch
    if (x === y) continue;
    if (x == null || y == null || typeof x !== 'object' || typeof y !== 'object') {
      if (x !== y) return true;
      continue;
    }

    const keysX = Object.keys(x);
    const keysY = Object.keys(y);
    if (keysX.length !== keysY.length) return true;

    // Key sets must match (ignores order)
    keysX.sort();
    keysY.sort();
    for (let i = 0; i < keysX.length; i++) {
      if (keysX[i] !== keysY[i]) return true;
    }

    for (const k of keysX) {
      const vx = x[k];
      const vy = y[k];

      // Push objects/arrays to compare later
      if (vx && vy && typeof vx === 'object' && typeof vy === 'object') {
        stack.push([vx, vy]);
      } else if (vx !== vy) {
        return true;
      }
    }
  }

  return false;
};

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
class MockTranslatePipe implements PipeTransform, OnDestroy {
  private readonly translateService = inject(TranslateService) as DelegateTranslateService;
  private readonly asyncPipe = inject(AsyncPipe);

  cachedValue: string | null = null;
  cachedParams: Record<string, any> | null = null;
  stream$: Observable<any> | null = null;

  getStream(value: string | string[]): Observable<any> {
    return this.translateService._stream(value);
  }

  transform(value: string, params?: Record<string, any>): string | any {
    if (value === this.cachedValue && !isDifferent(params, this.cachedParams)) {
      return this.asyncPipe.transform(this.stream$);
    }

    this.cachedValue = value;
    this.cachedParams = params ?? null;

    this.stream$ = this.getStream(value);

    return this.asyncPipe.transform(this.stream$);
  }

  ngOnDestroy(): void {
    // Forward cleanup so subscriptions are disposed
    this.asyncPipe.ngOnDestroy();
  }
}

@Injectable({
  providedIn: 'root',
})
export class DelegateTranslatePipeService {
  constructor() {
    console.log('mocks -> DelegateTranslatePipeService.constructor');
  }

  // Create the service *in the view context* so its internal `inject(...)` works.
  getPipe(injector: Injector): PipeTransform {
    return runInInjectionContext(injector, () => new MockTranslatePipe());
  }
}
