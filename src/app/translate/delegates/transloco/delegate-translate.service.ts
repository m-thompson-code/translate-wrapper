import { inject, Injectable } from "@angular/core";
import { TranslocoService } from "@jsverse/transloco";
import { TranslateService } from "../../translate.service";
import { AVAILABLE_LANGUAGES_TOKEN, Params } from "../../shared";

@Injectable()
export class DelegateTranslateService implements TranslateService {
  private readonly translocoService = inject(TranslocoService);

  private readonly availableLanguages = inject(AVAILABLE_LANGUAGES_TOKEN);

  readonly onLangChange = this.translocoService.langChanges$;

  get currentLang(): string {
    return this.translocoService.getActiveLang();
  }

  constructor() {
    console.log('transloco -> DelegateTranslateService.constructor', { translocoService: this.translocoService });
  }

  instant(key: string | Array<string>, params?: Params): string | any {
    console.log('transloco -> instant', { key, params });
    return this.translocoService.translate(key, params);
  }

  stream(key: string | Array<string>, params?: Params) {
    console.log('transloco -> stream', { key, params });
    return this.translocoService.selectTranslate(key, params);
  }

  getCurrentLang(): string {
    return this.translocoService.getActiveLang();
  }

  use(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  getLangs(): readonly string[] {
    return this.availableLanguages;
  }
}
