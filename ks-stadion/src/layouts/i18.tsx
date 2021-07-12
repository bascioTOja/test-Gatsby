import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

import translationEnglish from '../locales/en/translation.json'
import translationPolish from '../locales/pl/translation.json'
import translationRussian from '../locales/ru/translation.json'

const resources = {
  en: {
    translation: translationEnglish
  },
  pl: {
    translation: translationPolish
  },
  ru: {
    translation: translationRussian
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pl',
    fallbackLng: 'en',
    debug: false,
    react: {
      useSuspense: false
    }
  })
export default i18n
