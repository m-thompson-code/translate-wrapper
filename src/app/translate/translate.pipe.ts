import { inject, Injector, Pipe, PipeTransform } from '@angular/core';
import { TranslatePipeService } from './translate-pipe.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly translatePipeService = inject(TranslatePipeService);
  private readonly pipe = this.translatePipeService.getPipe(inject(Injector));

  constructor() {
    console.log('TranslatePipe.constructor', { pipe: this.pipe });
  }

  transform(query: string, params?: Record<string, any>/* TODO: only transloco does: , inlineLang?: string */): string | undefined {
    return this.pipe.transform(query, params);
  }
}
