import { configure, defineRule } from "vee-validate";
import {
  integer,
  max,
  max_value,
  min,
  min_value,
  required,
  url,
} from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import vee_en from "@vee-validate/i18n/dist/locale/en.json";
import vee_de from "@vee-validate/i18n/dist/locale/de.json";
import bam_en from "../locales/en.json";
import bam_de from "../locales/de.json";

const veeValidate = {
  install: () => {
    configure({
      validateOnInput: true,
      validateOnBlur: true,
      validateOnChange: true,
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
    defineRule("min_value", min_value);
    defineRule("max_value", max_value);
    defineRule("integer", integer);

    defineRule("unique_username", async (value, [uuid, teamApi]) => {
      try {
        return await teamApi.isUsernameUnique(uuid, value);
      } catch (error) {
        return true;
      }
    });

    defineRule("unique_password", async (value, [uuid, teamApi]) => {
      try {
        return await teamApi.isPasswordUnique(uuid, value);
      } catch (error) {
        return true;
      }
    });

    defineRule("unique_jms_queue", async (value, [uuid, teamApi]) => {
      try {
        return await teamApi.isJmsQueueUnique(uuid, value);
      } catch (error) {
        return true;
      }
    });

    defineRule("min_optional", (value, [length]) => {
      if (!value) {
        return true;
      }
      return value.length >= length;
    });

    defineRule("max_optional", (value, [length]) => {
      if (!value) {
        return true;
      }
      return value.length <= length;
    });

    defineRule("required_name", (value, [otherName]) => {
      return !(!value && otherName);
    });

    defineRule("amount_in_euros", (_1, _2, context) => {
      const minAmount = +context.form.creditConfiguration["minAmountInEuros"];
      const maxAmount = +context.form.creditConfiguration["maxAmountInEuros"];

      return !minAmount || !maxAmount || minAmount <= maxAmount;
    });

    defineRule("term_in_months", (_1, _2, context) => {
      const minTerm = +context.form.creditConfiguration["minTermInMonths"];
      const maxTerm = +context.form.creditConfiguration["maxTermInMonths"];

      return !minTerm || !maxTerm || minTerm <= maxTerm;
    });

    defineRule("schufa_rating", (_1, _2, context) => {
      const minRating = context.form.creditConfiguration["minSchufaRating"];
      const maxRating = context.form.creditConfiguration["maxSchufaRating"];

      if (!minRating || !maxRating) {
        return true;
      }
      return minRating.charCodeAt(0) <= maxRating.charCodeAt(0);
    });
  },
};

export default veeValidate;
