// example.component.spec.ts
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ExampleComponent } from './example.component';
import {
  mockTranslate,
  TranslateService,
  provideMockRootTranslations
} from './translate';

describe('ExampleComponent (with provideMockTranslateService)', () => {
  let fixture: ComponentFixture<ExampleComponent>;
  let component: ExampleComponent;
  let translateService: TranslateService;

  // Stub console log
  jest.spyOn(console, 'log').mockImplementation(() => {});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ExampleComponent,
      ],
      providers: [provideMockRootTranslations()],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render translateServiced title via TranslatePipe', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent?.trim()).toBe(mockTranslate('en', 'example.title'));
  });

  it('getInstantTranslatedValue() should use TranslateService.instant', () => {
    const spy = jest.spyOn(translateService, 'instant');
    const res = component.getInstantTranslatedValue('foo.bar');
    expect(spy).toHaveBeenCalledWith('foo.bar');
    expect(res).toBe(mockTranslate('en', 'foo.bar'));
  });

  it('getTranslatedValue() should use TranslateService.stream', (done) => {
    const spy = jest.spyOn(translateService, 'stream');
    component.getTranslatedValue('foo.baz').subscribe((val) => {
      expect(spy).toHaveBeenCalledWith('foo.baz');
      expect(val).toBe(mockTranslate('en', 'foo.baz'));
      done();
    });
  });
});
