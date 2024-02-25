/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */
import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import { router } from "@/router";

import BadgeDirective from "primevue/badgedirective";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";
import Tooltip from "primevue/tooltip";
import Password from "primevue/password";
import Divider from "primevue/divider";

import "@/assets/styles.scss";

const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.directive("tooltip", Tooltip);
app.directive("badge", BadgeDirective);
app.directive("ripple", Ripple);
app.directive("styleclass", StyleClass);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Checkbox", Checkbox);
app.component("Password", Password);
app.component("Divider", Divider);

app.use(router);

app.mount("#app");
