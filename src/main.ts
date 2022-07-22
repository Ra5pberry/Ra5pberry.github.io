import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";

VueAxios.arguments(VueAxios, axios);

createApp(App).mount("#app");
