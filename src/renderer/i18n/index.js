import Vue from 'vue'
import VueI18n from 'vue-i18n'
import dateTimeFormats from './i18n_date.js'
import i18nMessagesEnUS from './i18n_messages_enUS.js'
import i18nMessagesFrFR from './i18n_messages_frFR.js'
import { DEFAULT_LANGUAGE } from '../../constantes.js'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  local: DEFAULT_LANGUAGE,
  fallbackLocale: DEFAULT_LANGUAGE,
  messages: {
    'en-US': i18nMessagesEnUS,
    'fr-FR': i18nMessagesFrFR
  },
  dateTimeFormats
})
