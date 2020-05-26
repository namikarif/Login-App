import {Inject, Injectable} from '@angular/core';
import {TRANSLATIONS} from './translations'; // import our opaque token

@Injectable()
export class TranslateService {
  private _currentLang: string;

  public get currentLang() {
    return this._currentLang;
  }

  // inject our translations
  constructor(@Inject(TRANSLATIONS) private _translations: any) {
  }

  public use(lang: string): void {
    this._currentLang = lang;
  }

  numberTranslate(translations, key) {
    const chars = key.split('');
    for (let i = 0; i < chars.length; i++) {
      if (/\d/.test(chars[i])) {
        chars[i] = translations[chars[i]];
      }
    }
    return chars.join('');
  }

  private translate(key: any, type?: string) {
    const translation = key;
    if (type) {
      if (type === 'number') {
        if (this._translations[this.currentLang]) {
          return this.numberTranslate(this._translations[this.currentLang], key);
        }
      }
    } else {
      if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
        return this._translations[this.currentLang][key];
      }
    }
    return translation;
  }

  public instant(key: string, type?: string) {
    return this.translate(key, type);
  }
}
