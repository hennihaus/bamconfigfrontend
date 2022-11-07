import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import dompurify from "vue-dompurify-html";
import http from "@/plugins/http";

import "semantic-ui-css/semantic.css";
import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(dompurify);
app.use(http);

app.mount("#app");
