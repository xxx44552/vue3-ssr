import { createSSRApp } from "vue";

import App from './App/index.vue'

const app = createSSRApp(App);

app.mount("#app");
