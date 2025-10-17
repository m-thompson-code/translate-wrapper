import { Params } from '../../shared';

const getParamsTranslation = (params: Params | undefined): string => {
  if (!params) {
    return '';
  }

  return Object.entries(params ?? {})
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, val]) => `|${key}:${val}`).join('')
}

export const mockTranslate = (
  lang: string,
  value: string,
  params?: Params
): string => {
  return `${lang}|${value}${getParamsTranslation(params)}`;
};
