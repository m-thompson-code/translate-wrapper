import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { TranslateService } from "../../translate.service";
import { DelegateTranslateService } from "./delegate-translate.service";
import { TranslatePipeService } from "../../translate-pipe.service";
import { DelegateTranslatePipeService } from "./delegate-translate-pipe.service";
import { AVAILABLE_LANGUAGES, AVAILABLE_LANGUAGES_TOKEN } from "../../shared";

export const provideTranslate: () => EnvironmentProviders = () => {
  return makeEnvironmentProviders([
    DelegateTranslateService,
    AsyncPipe,
    { provide: AVAILABLE_LANGUAGES_TOKEN, useValue: AVAILABLE_LANGUAGES },
    { provide: TranslateService, useClass: DelegateTranslateService },
    { provide: TranslatePipeService, useClass: DelegateTranslatePipeService },
  ]);
}
