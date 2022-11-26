import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import dompurify from "vue-dompurify-html";
import http from "@/plugins/http";

import "semantic-ui-css/semantic.css";
import "./assets/main.css";
import { defineRule } from "vee-validate";
import { max, min, required } from "@vee-validate/rules";

const app = createApp(App);

app.use(router);
app.use(dompurify);
app.use(http);

app.mount("#app");

defineRule("required", required);
defineRule("min", min);
defineRule("max", max);

defineRule("uniqueUsername", async (value, [uuid, teamApi]) => {
  try {
    const isUsernameUnique = await teamApi.isUsernameUnique(uuid, value);

    return isUsernameUnique ? true : "Benutzername existiert bereits.";
  } catch (error) {
    return true;
  }
});

defineRule("uniquePassword", async (value, [uuid, teamApi]) => {
  try {
    const isPasswordUnique = await teamApi.isPasswordUnique(uuid, value);

    return isPasswordUnique ? true : "Password existiert bereits.";
  } catch (error) {
    return true;
  }
});

defineRule("uniqueJmsQueue", async (value, [uuid, teamApi]) => {
  try {
    const isJmsQueueUnique = await teamApi.isJmsQueueUnique(uuid, value);

    return isJmsQueueUnique ? true : "JMS-Queue existiert bereits.";
  } catch (error) {
    return true;
  }
});

defineRule("minOptional", (value, [limit]) => {
  if (!value) {
    return true;
  }
  if (value.length >= limit) {
    return true;
  }
  return `Feld muss mindestens ${limit} Zeichen haben`;
});

defineRule("maxOptional", (value, [limit]) => {
  if (!value) {
    return true;
  }
  if (value.length <= limit) {
    return true;
  }
  return `Feld darf maximal ${limit} Zeichen haben`;
});

defineRule("requiredName", (value, [otherName, fieldName]) => {
  if (!value && otherName) {
    return `${fieldName} muss angegeben werden`;
  }
  return true;
});
