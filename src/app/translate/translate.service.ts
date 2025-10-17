import { Observable } from "rxjs";
import { Params } from "./shared";

/** Injection token is the abstract class itself. */
export abstract class TranslateService {
  abstract readonly onLangChange: Observable<string>;

  abstract instant(
    key: string,
    params?: Params
  ): string | any;

  abstract stream(
    key: string,
    params?: Params
  ): Observable<string | any>;

  /**
   * deprecated - use `getCurrentLang()` instead
   */
  abstract currentLang: string;

  // TODO: addLangs
  // TODO: setDefaultLang
  // TODO: setFallbackLang

  abstract getLangs(): readonly string[];

  abstract getCurrentLang(): string;

  abstract use(lang: string): void;

  // TODO: https://jsverse.gitbook.io/transloco/migration-guides/migrate-from-ngx-translate
}
