const express = require('express');
const path = require('path');
const fs = require('fs');
const manifest = require('../dist/server/ssr-manifest.json');

const appPath = path.join(__dirname, '../dist', 'server', manifest['main.js'])
const createApp = require(appPath).default

const app = express();
const port = 3000;

app.use('/js', express.static(path.join(__dirname, '../dist/client', 'js')))

app.get('*', async (req, res) => {
  const { app } = await createApp();

  const appContent = await app;

  fs.readFile(path.join(__dirname, '../dist/client/index.html'), (err, html) => {
    if (err) throw err;
    const stringHtml = html.toString();
    html = stringHtml.replace('<div id="app"></div>', `<div id="app">${appContent}`)
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  })
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
