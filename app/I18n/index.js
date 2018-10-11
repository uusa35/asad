import {I18nManager} from 'react-native';
import I18n from 'react-native-i18n';
const en = require('./en.json');
const ar = require('./ar.json');
I18n.defaultLocale = I18nManager.isRTL ? 'ar' : 'en';
I18n.fallbacks = true;
I18n.translations = {
  en,
  ar
};
export const isRTL = I18nManager.isRTL;
export function getTitle(element) {
  return I18nManager.isRTL ? element.title_ar : element.title_en;
}
export function getName(element) {
  return I18nManager.isRTL ? element.name_ar : element.name_en;
}

export function getCaption(element) {
  return I18nManager.isRTL ? element.caption_ar : element.caption_en;
}
export function getDescription(element) {
  return I18nManager.isRTL ? element.description_ar : element.description_en;
}

export function getLangForHeader() {
  return I18nManager.isRTL ? 'ar' : 'en';
}

console.log('isRTl from I18t', isRTL);
export default I18n;
