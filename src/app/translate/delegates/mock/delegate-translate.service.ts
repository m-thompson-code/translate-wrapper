import { inject, Injectable } from "@angular/core";
import { defer, map, startWith, Subject } from "rxjs";
import { TranslateService } from "../../translate.service";
import { AVAILABLE_LANGUAGES_TOKEN, Params } from "../../shared";
import { mockTranslate } from "./utility";

@Injectable()
export class DelegateTranslateService implements TranslateService {
  private readonly availableLanguages = inject(AVAILABLE_LANGUAGES_TOKEN);

  private lang = 'en';

  private readonly _onLangChange = new Subject<string>();
  readonly onLangChange = this._onLangChange.asObservable();

  get currentLang(): string {
    return this.lang;
  }

  private _instant(key: string, params?: Params): string {
    console.log('mock -> instant', this, this.lang, { key, params });
    return mockTranslate(this.lang, key, params);
  }

  instant(key: string, params?: Params): string {
    return this._instant(key, params);
  }

  _stream(key: string, params?: Params) {
    console.log('mock -> stream', { key, params });
    return defer(() => this.onLangChange.pipe(
      map(() => this._instant(key, params)),
      startWith(this._instant(key, params)),
    ));
  }

  stream(key: string, params?: Params) {
    return this._stream(key, params);
  }

  getCurrentLang(): string {
    return this.lang;
  }

  use(lang: string) {
    console.log('mock -> use', { lang });
    this.lang = lang;
    this._onLangChange.next(lang);
  }

  getLangs(): readonly string[] {
    return this.availableLanguages;
  }
}
