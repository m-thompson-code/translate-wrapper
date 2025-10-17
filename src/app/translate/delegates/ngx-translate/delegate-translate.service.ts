import { inject, Injectable } from '@angular/core';
import {
  TranslateService as _TranslateService,
} from '@ngx-translate/core';
import { map } from 'rxjs';
import { TranslateService } from '../../translate.service';
import { Params } from '../../shared';

@Injectable()
export class DelegateTranslateService implements TranslateService {
  private readonly _translateService = inject(_TranslateService);

  readonly onLangChange = this._translateService.onLangChange.pipe(map(({ lang }) => lang));

  get currentLang(): string {
    return this._translateService.getCurrentLang();
  }

  constructor() {
    console.log('ngx-translate -> DelegateTranslateService.constructor', {
      _translateService: this._translateService,
    });
  }

  instant(key: string | Array<string>, params?: Params): string | any {
    console.log('ngx-translate -> instant', { key, params });
    return this._translateService.instant(key, params);
  }

  stream(key: string | Array<string>, params?: Params) {
    console.log('ngx-translate -> stream', { key, params });
    return this._translateService.stream(key, params);
  }

  getCurrentLang(): string {
    return this._translateService.getCurrentLang();
  }

  use(lang: string) {
    this._translateService.use(lang);
  }

  getLangs(): readonly string[] {
    return this._translateService.getLangs();
  }
}
