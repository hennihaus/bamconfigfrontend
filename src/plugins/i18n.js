import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import de from "../locales/de.json";

const numberFormats = {
  "de-DE": {
    currency: {
      style: "currency",
      currency: "EUR",
      notation: "standard",
    },
  },
};

const i18n = createI18n({
  locale: import.meta.env.VITE_I18N_LOCALE,
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE,
  legacy: true,
  messages: {
    en,
    de,
  },
  numberFormats,
});

export default i18n;
