import { InjectionToken } from "@angular/core";

export type Params = Record<string, string>;

export const DEFAULT_LANGUAGE = 'en';
export const AVAILABLE_LANGUAGES = ['en', 'de'] as const;
export const AVAILABLE_LANGUAGES_TOKEN = new InjectionToken<typeof AVAILABLE_LANGUAGES>('AVAILABLE_LANGUAGES');
