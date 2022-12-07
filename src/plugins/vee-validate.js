import { configure, defineRule } from "vee-validate";
import { max, min, required } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json";
import de from "@vee-validate/i18n/dist/locale/de.json";

const veeValidate = {
  install: () => {
    configure({
      generateMessage: localize({
        en: {
          messages: {
            ...en.messages,
            uniqueUsername: "The {field} field exists already",
            uniquePassword: "The {field} field exists already",
            uniqueJmsQueue: "The {field} field exists already",
            minOptional: en.messages.min,
            maxOptional: en.messages.max,
            requiredName: en.messages.required,
          },
        },
        de: {
          messages: {
            ...de.messages,
            uniqueUsername: "{field} existiert bereits",
            uniquePassword: "{field} existiert bereits",
            uniqueJmsQueue: "{field} existiert bereits",
            minOptional: de.messages.min,
            maxOptional: de.messages.max,
            requiredName: de.messages.required,
          },
        },
      }),
    });

    defineRule("required", required);
    defineRule("min", min);
    defineRule("max", max);

    defineRule("uniqueUsername", async (value, [uuid, teamApi]) => {
      try {
        return await teamApi.isUsernameUnique(uuid, value);
      } catch (error) {
        return true;
      }
    });

    defineRule("uniquePassword", async (value, [uuid, teamApi]) => {
      try {
        return await teamApi.isPasswordUnique(uuid, value);
      } catch (error) {
        return true;
      }
    });

    defineRule("uniqueJmsQueue", async (value, [uuid, teamApi]) => {
      try {
        return await teamApi.isJmsQueueUnique(uuid, value);
      } catch (error) {
        return true;
      }
    });

    defineRule("minOptional", (value, [length]) => {
      if (!value) {
        return true;
      }
      return value.length >= length;
    });

    defineRule("maxOptional", (value, [length]) => {
      if (!value) {
        return true;
      }
      return value.length <= length;
    });

    defineRule("requiredName", (value, [otherName]) => {
      return !(!value && otherName);
    });
  },
};

export default veeValidate;
