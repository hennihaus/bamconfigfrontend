import type { I18nScope } from "vue-i18n";
import { useI18n } from "vue-i18n";
import type { Locales, MessageSchema, NumberSchema } from "@/plugins/i18n";

export const useBaseI18n = (useScope: I18nScope = "global") => {
  const { t, locale } = useI18n<
    { message: MessageSchema; number: NumberSchema },
    Locales
  >({
    useScope,
  });

  return {
    t,
    locale,
  };
};
