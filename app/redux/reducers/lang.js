import {CHANGE_LANG} from '../actions/types';
import I18n from './../../I18n';

export default function(lang = I18n.locale, action) {
  switch (action.type) {
    case CHANGE_LANG:
      return action.payload;
    default:
      return lang;
  }
}
