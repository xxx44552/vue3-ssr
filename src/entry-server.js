const { renderToString } = require('@vue/server-renderer');
import app from './main';

export default function () {
  const html = renderToString(app)
  return {
    app: html,
  }
}
