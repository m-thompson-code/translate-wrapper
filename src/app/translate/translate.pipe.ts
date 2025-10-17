import { inject, Injector, Pipe, PipeTransform } from '@angular/core';
import { TranslatePipeService } from './translate-pipe.service';
import { Params } from './shared';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly translatePipeService = inject(TranslatePipeService);
  private readonly pipe = this.translatePipeService.getPipe(inject(Injector));

  transform(
    query: string,
    params?: Params,
    /* TODO: only transloco does: , inlineLang?: string */
  ): string {
    return this.pipe.transform(query, params);
  }
}
