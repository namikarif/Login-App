import {InjectionToken } from '@angular/core';

// import translations
import {LANG_GB_NAME, LANG_GB_TRANS} from './language/GB';
import {LANG_TR_NAME, LANG_TR_TRANS} from './language/TR';
import {LANG_AZ_NAME, LANG_AZ_TRANS} from './language/AZ';
import {LANG_RU_NAME, LANG_RU_TRANS} from './language/RU';
import {LANG_FA_NAME, LANG_FA_TRANS} from './language/FA';

// translation token
export const TRANSLATIONS = new InjectionToken('translations');

// all traslations
export const dictionary = {
  [LANG_GB_NAME]: LANG_GB_TRANS,
  [LANG_TR_NAME]: LANG_TR_TRANS,
  [LANG_AZ_NAME]: LANG_AZ_TRANS,
  [LANG_RU_NAME]: LANG_RU_TRANS,
  [LANG_FA_NAME]: LANG_FA_TRANS
};

// providers
export const TRANSLATION_PROVIDERS = [
  {provide: TRANSLATIONS, useValue: dictionary},
];


