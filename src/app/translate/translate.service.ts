import { InterpolationParameters } from "@ngx-translate/core";
import { Observable } from "rxjs";

/** Injection token is the abstract class itself. */
export abstract class TranslateService {
  abstract readonly onLangChange: Observable<string>;

  abstract instant(
    key: string | string[],
    interpolateParams?: InterpolationParameters
  ): string | any;

  abstract stream(
    key: string | string[],
    interpolateParams?: InterpolationParameters
  ): Observable<string | any>;

  abstract getCurrentLang(): string;

  abstract use(lang: string): void;

  // TODO: https://jsverse.gitbook.io/transloco/migration-guides/migrate-from-ngx-translate
}
