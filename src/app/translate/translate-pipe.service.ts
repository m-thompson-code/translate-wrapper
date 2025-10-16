import { Injector, PipeTransform } from "@angular/core";

/** Injection token is the abstract class itself. */
export abstract class TranslatePipeService {
  abstract getPipe(injector: Injector): PipeTransform;
}
