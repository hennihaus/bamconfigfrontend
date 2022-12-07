import { createApp } from "vue";
import App from "./App.vue";
import dompurify from "vue-dompurify-html";
import router from "@/plugins/router";
import http from "@/plugins/http";
import i18n from "@/plugins/i18n";
import veeValidate from "@/plugins/vee-validate";

import "semantic-ui-css/semantic.css";
import "./assets/main.css";

const app = createApp(App);

app.use(veeValidate);
app.use(i18n);
app.use(router);
app.use(dompurify);
app.use(http);

app.mount("#app");
