/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */
import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@/router';

import PrimeVue from 'primevue/config';

import BadgeDirective from 'primevue/badgedirective';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import Tooltip from 'primevue/tooltip';
import Password from 'primevue/password';
import Divider from 'primevue/divider';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Dropdown from 'primevue/dropdown';
import ProgressSpinner from 'primevue/progressspinner';
import Chip from 'primevue/chip';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';

import { VueQueryPlugin } from '@tanstack/vue-query';
import { createStore } from 'vuex';
import axios from 'axios';

import '@/assets/styles.scss';
import { jwtDecode } from 'jwt-decode';

const store = createStore({
  state: {
    token: localStorage.getItem('token') || null,
    roles: [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        const decoded = jwtDecode(token);
        state.roles = decoded.roles || []; // Assuming 'roles' is an array of roles
      } else {
        state.roles = [];
      }
      localStorage.setItem('token', token); // Ensure token is updated in localStorage
    },
    clearToken(state) {
      state.token = null;
      state.roles = [];
      localStorage.removeItem('token');
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    isAdmin(state) {
      return state.roles.includes('ADMIN');
    },
    isAuthor(state) {
      return state.roles.includes('AUTHOR');
    },
  },
});
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.use(VueQueryPlugin);
app.use(ToastService);
app.use(store);
app.directive('tooltip', Tooltip);
app.directive('badge', BadgeDirective);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Checkbox', Checkbox);
app.component('Password', Password);
app.component('Divider', Divider);
app.component('Toast', Toast);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Dropdown', Dropdown);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Chip', Chip);
app.component('DataView', DataView);
app.component('Dialog', Dialog);
app.component('Tag', Tag);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);

app.use(router);

app.mount('#app');
