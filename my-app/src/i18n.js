import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
i18n.use(initReactI18next).use(LanguageDetector).use(Backend).init({
  lng: "0",
  fallbackLng: "en",
  debug: false,
});
