import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from './translate/translate.pipe';
import { TranslateService } from './translate/translate.service';

@Component({
  selector: 'app-root',
  imports: [
    TranslatePipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('multiple-jsons');
  private readonly translate = inject(TranslateService);
  lang: 'en' | 'de' = this.translate.getCurrentLang() as 'en' | 'de';

  constructor() {
    this.translate.onLangChange.subscribe((langChange) => {
      console.log(langChange);
    });

    // This is expected to be undefined since it fails to beat the race
    // condition of loading the translations
    // console.log(this.translate.instant('constructor.test'));

    // this.translate.stream('constructor.test').subscribe((translation) => {
    //   console.log(translation);
    // });
  }

  toggleLang() {
    this.lang = this.lang === 'en' ? 'de' : 'en';

    this.translate.use(this.lang);
  }
}
