import { inject, Injectable } from '@angular/core';
import {
  TranslateService as _TranslateService,
  InterpolationParameters,
} from '@ngx-translate/core';
import { TranslateService } from '../../translate.service';
import { map } from 'rxjs';

@Injectable()
export class DelegateTranslateService implements TranslateService {
  private readonly _translateService = inject(_TranslateService);

  readonly onLangChange = this._translateService.onLangChange.pipe(map(({ lang }) => lang));

  constructor() {
    console.log('ngx-translate -> DelegateTranslateService.constructor', {
      _translateService: this._translateService,
    });
  }

  instant(key: string | Array<string>, interpolateParams?: InterpolationParameters): string | any {
    console.log('ngx-translate -> instant', { key, interpolateParams });
    return this._translateService.instant(key, interpolateParams);
  }

  stream(key: string | Array<string>, interpolateParams?: InterpolationParameters) {
    console.log('ngx-translate -> stream', { key, interpolateParams });
    return this._translateService.stream(key, interpolateParams);
  }

  getCurrentLang(): string {
    return this._translateService.getCurrentLang();
  }

  use(lang: string) {
    this._translateService.use(lang);
  }
}
