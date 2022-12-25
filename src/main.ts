import { createApp } from "vue";
import App from "./App.vue";
import i18n from "@/plugins/i18n";
import router from "@/plugins/router";
import http from "@/plugins/http";
import veeValidate from "@/plugins/vee-validate";
import VueDOMPurifyHTML from "vue-dompurify-html";
import CKEditor from "@ckeditor/ckeditor5-vue";
import baseImageError from "@/modules/base/directives/base-image-error";

import "@ckeditor/ckeditor5-build-classic/build/translations/de";
import "semantic-ui-css/semantic.css";
import "./assets/main.css";

const app = createApp(App);

app.use(veeValidate);
app.use(i18n);
app.use(router);
app.use(http);
app.use(VueDOMPurifyHTML);
app.use(CKEditor);

app.directive("base-image-error", baseImageError);

app.mount("#app");
