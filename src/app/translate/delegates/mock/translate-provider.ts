import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { TranslateService } from "../../translate.service";
import { DelegateTranslateService } from "./delegate-translate.service";
import { TranslatePipeService } from "../../translate-pipe.service";
import { DelegateTranslatePipeService } from "./delegate-translate-pipe.service";

export const provideTranslate: () => EnvironmentProviders = () => {
  return makeEnvironmentProviders([
    DelegateTranslateService,
    AsyncPipe,
    { provide: TranslateService, useClass: DelegateTranslateService },
    { provide: TranslatePipeService, useClass: DelegateTranslatePipeService },
  ]);
}
