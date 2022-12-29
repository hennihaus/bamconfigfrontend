import { createI18n } from "vue-i18n";
import de from "../locales/de.json";
import en from "../locales/en.json";

export type MessageSchema = typeof de;

export type NumberSchema = {
  currency: {
    style: "currency";
    currency: string;
    notation: "standard";
  };
};

export type DateTimeSchema = {
  long: {
    year: "numeric";
    month: "numeric";
    day: "numeric";
    hour: "2-digit";
    minute: "2-digit";
  };
};

export type Locales = "de" | "en";

const currency: NumberSchema = {
  currency: {
    style: "currency",
    currency: "EUR",
    notation: "standard",
  },
};

const dateTime: DateTimeSchema = {
  long: {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
};

const numberFormats = {
  de: {
    ...currency,
  },
  en: {
    ...currency,
  },
};

const datetimeFormats = {
  de: {
    ...dateTime,
  },
  en: {
    ...dateTime,
  },
};

const i18n = createI18n<[MessageSchema], Locales, false>({
  locale: import.meta.env.VITE_I18N_LOCALE,
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: {
    de,
    en,
  },
  numberFormats,
  datetimeFormats,
});

export default i18n;
