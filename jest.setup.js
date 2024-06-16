// jest.setup.js
import { config } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import DataView from 'primevue/dataview';

// Install PrimeVue
config.global.plugins = [PrimeVue];

// Register global components
config.global.components = {
  Button,
  Dropdown,
  DataView,
};

// Mock PrimeVue config object if used in the components
global.PrimeVue = {
  config: {
    ripple: true,
  },
};
