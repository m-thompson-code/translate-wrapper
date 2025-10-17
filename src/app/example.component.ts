import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService, TranslatePipe } from './translate';

@Component({
  selector: 'app-example',
  template: `{{ 'example.title' | translate }}`,
  standalone: true,
  imports: [TranslatePipe],
})
export class ExampleComponent {
  private translateService = inject(TranslateService);

  getInstantTranslatedValue(key: string): string {
    return this.translateService.instant(key);
  }

  getTranslatedValue(key: string): Observable<string> {
    return this.translateService.stream(key);
  }
}
