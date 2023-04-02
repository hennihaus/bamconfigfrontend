import { configure, defineRule } from "vee-validate";
import vee_en from "@vee-validate/i18n/dist/locale/en.json";
import vee_de from "@vee-validate/i18n/dist/locale/de.json";
import bam_en from "../locales/en.json";
import bam_de from "../locales/de.json";
import { localize } from "@vee-validate/i18n";
import {
  email,
  integer,
  max,
  max_value,
  min,
  min_value,
  required,
  url,
} from "@vee-validate/rules";
import type { CreditConfiguration } from "@hennihaus/bamconfigbackend";

const veeValidate = {
  install: () => {
    configure({
      validateOnInput: true,
      validateOnBlur: false,
      validateOnChange: false,
      validateOnModelUpdate: true,
      generateMessage: localize({
        en: {
          messages: {
            ...vee_en.messages,
            ...bam_en.messages,
            min_optional: vee_en.messages.min,
            max_optional: vee_en.messages.max,
            required_name: vee_en.messages.required,
          },
        },
        de: {
          messages: {
            ...vee_de.messages,
            ...bam_de.messages,
            min_optional: vee_de.messages.min,
            max_optional: vee_de.messages.max,
            required_name: vee_de.messages.required,
          },
        },
      }),
    });

    defineRule("required", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("url", url);
    defineRule("email", email);
    defineRule("min_value", min_value);
    defineRule("max_value", max_value);
    defineRule("integer", integer);

    defineRule(
      "unique_username",
      async (value: string, params: Record<string, any>) => {
        try {
          return await params.teamApi.isUsernameUnique(params.uuid, value);
        } catch (error) {
          return true;
        }
      }
    );

    defineRule(
      "unique_password",
      async (value: string, params: Record<string, any>) => {
        try {
          return await params.teamApi.isPasswordUnique(params.uuid, value);
        } catch (error) {
          return true;
        }
      }
    );

    defineRule(
      "unique_jms_queue",
      async (value: string, params: Record<string, any>) => {
        try {
          return await params.teamApi.isJmsQueueUnique(params.uuid, value);
        } catch (error) {
          return true;
        }
      }
    );

    defineRule(
      "unique_title",
      async (value: string, params: Record<string, any>) => {
        try {
          return await params.taskApi.isTitleUnique(params.uuid, value);
        } catch (error) {
          return true;
        }
      }
    );

    defineRule("min_optional", (value: string, [length]: number[]) => {
      if (!value) {
        return true;
      }
      return value.length >= length;
    });

    defineRule("max_optional", (value: string, [length]: number[]) => {
      if (!value) {
        return true;
      }
      return value.length <= length;
    });

    defineRule("required_name", (value: string, [otherName]: string[]) => {
      return !(!value && otherName);
    });

    defineRule("json", (value: string) => {
      try {
        JSON.parse(value);
        return true;
      } catch (error) {
        return false;
      }
    });

    defineRule("not_empty_json", (value: string) => {
      if (value.replace(/\s/g, "") === "{}") {
        return false;
      }
      return value.replace(/\s/g, "") !== "[]";
    });

    defineRule("amount_in_euros", (_1, _2, context) => {
      if (!context.form.creditConfiguration) {
        return true;
      }

      const config = context.form.creditConfiguration as CreditConfiguration;
      const minAmount = config.minAmountInEuros;
      const maxAmount = config.maxAmountInEuros;

      return (
        !isRegularNumber(minAmount) ||
        !isRegularNumber(maxAmount) ||
        +minAmount <= +maxAmount
      );
    });

    defineRule("term_in_months", (_1, _2, context) => {
      if (!context.form.creditConfiguration) {
        return true;
      }

      const config = context.form.creditConfiguration as CreditConfiguration;
      const minTerm = config.minTermInMonths;
      const maxTerm = config.maxTermInMonths;

      return (
        !isRegularNumber(minTerm) ||
        !isRegularNumber(maxTerm) ||
        +minTerm <= +maxTerm
      );
    });

    defineRule("schufa_rating", (_1, _2, context) => {
      if (!context.form.creditConfiguration) {
        return true;
      }

      const config = context.form.creditConfiguration as CreditConfiguration;
      const minRating = config.minSchufaRating;
      const maxRating = config.maxSchufaRating;

      if (!minRating || !maxRating) {
        return true;
      }
      return minRating.charCodeAt(0) <= maxRating.charCodeAt(0);
    });
  },
};

const isRegularNumber = (number: number): boolean => {
  if (!number) {
    return false;
  }
  if (!Number.isSafeInteger(+number)) {
    return false;
  }
  return +number >= 0;
};

export default veeValidate;
