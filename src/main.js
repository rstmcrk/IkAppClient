import { createApp } from 'vue'

import App from './App.vue'
import router from "./router";
import VueApexCharts from "vue3-apexcharts";
import vClickOutside from "click-outside-vue3";
import { registerScrollSpy } from 'vue3-scroll-spy';
import {appAxios} from './utils/appAxios';
import Maska from 'maska'



import BootstrapVueNext from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'


import 'sweetalert2/dist/sweetalert2.min.css';
import '@vueform/slider/themes/default.css';

import store from "./store";

import "../src/design/app.scss";
import AuthService from './utils/AuthService';


const app = createApp(App);
  app.use(store)
  app.use(router)
  app.use(require('vue-chartist'))
  app.use(BootstrapVueNext)
  app.use(VueApexCharts)
  app.use(vClickOutside)
  app.use(registerScrollSpy)
  app.use(Maska)
  app.config.globalProperties.$appAxios =appAxios;
  app.config.globalProperties.$auth = AuthService;
  app.mount('#app')
