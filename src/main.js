/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "@/router";

import PrimeVue from "primevue/config";

import BadgeDirective from "primevue/badgedirective";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";
import Tooltip from "primevue/tooltip";
import Password from "primevue/password";
import Divider from "primevue/divider";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

import { VueQueryPlugin } from "@tanstack/vue-query";
import { createStore } from "vuex";
import axios from "axios";

import "@/assets/styles.scss";

const store = createStore({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null; // Clear the token, effectively logging out the user
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
});
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.use(VueQueryPlugin);
app.use(ToastService);
app.use(store);
app.directive("tooltip", Tooltip);
app.directive("badge", BadgeDirective);
app.directive("ripple", Ripple);
app.directive("styleclass", StyleClass);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Checkbox", Checkbox);
app.component("Password", Password);
app.component("Divider", Divider);
app.component("Toast", Toast);

app.use(router);

app.mount("#app");
