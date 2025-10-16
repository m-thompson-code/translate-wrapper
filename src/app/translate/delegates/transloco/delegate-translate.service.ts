import { inject, Injectable } from "@angular/core";
import { InterpolationParameters } from "@ngx-translate/core";
import { TranslocoService } from "@jsverse/transloco";
import { TranslateService } from "../../translate.service";

@Injectable()
export class DelegateTranslateService implements TranslateService {
  private readonly translocoService = inject(TranslocoService);

  readonly onLangChange = this.translocoService.langChanges$;

  constructor() {
    console.log('transloco -> DelegateTranslateService.constructor', { translocoService: this.translocoService });
  }

  instant(key: string | Array<string>, interpolateParams?: InterpolationParameters): string | any {
    console.log('transloco -> instant', { key, interpolateParams });
    return this.translocoService.translate(key, interpolateParams);
  }

  stream(key: string | Array<string>, interpolateParams?: InterpolationParameters) {
    console.log('transloco -> stream', { key, interpolateParams });
    return this.translocoService.selectTranslate(key, interpolateParams);
  }

  getCurrentLang(): string {
    return this.translocoService.getActiveLang();
  }

  use(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
