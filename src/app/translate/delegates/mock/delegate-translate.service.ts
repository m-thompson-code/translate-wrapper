import { Injectable } from "@angular/core";
import { TranslateService as _TranslateService, InterpolationParameters } from "@ngx-translate/core";
import { TranslateService } from "../../translate.service";
import { defer, map, startWith, Subject } from "rxjs";

@Injectable()
export class DelegateTranslateService implements TranslateService {
  private lang = 'en';

  private readonly _onLangChange = new Subject<string>();
  readonly onLangChange = this._onLangChange.asObservable();

  constructor() {
    console.log('ngx-translate -> DelegateTranslateService.constructor');
  }

  private _instant(key: string | Array<string>, interpolateParams?: InterpolationParameters): string | any {
    console.log('mock -> instant', this, this.lang, { key, interpolateParams });
    // TODO: deal with interpolateParams
    return `MOCK(${this.lang}): ${key}`;
  }

  instant(key: string | Array<string>, interpolateParams?: InterpolationParameters): string | any {
    return this._instant(key, interpolateParams);
  }

  _stream(key: string | Array<string>, interpolateParams?: InterpolationParameters) {
    console.log('mock -> stream', { key, interpolateParams });
    return defer(() => this.onLangChange.pipe(
      map(() => this._instant(key, interpolateParams)),
      startWith(this._instant(key, interpolateParams)),
    ));
  }

  stream(key: string | Array<string>, interpolateParams?: InterpolationParameters) {
    return this._stream(key, interpolateParams);
  }

  getCurrentLang(): string {
    return this.lang;
  }

  use(lang: string) {
    console.log('mock -> use', { lang });
    this.lang = lang;
    this._onLangChange.next(lang);
  }
}
