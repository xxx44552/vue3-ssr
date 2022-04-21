import { createSSRApp } from "vue";
const { renderToString } = require('@vue/server-renderer');

import App from './App/index.vue'

export default function () {
  const app = createSSRApp(App);
  const html = renderToString(app)
  return {
    app: html,
  }
}
