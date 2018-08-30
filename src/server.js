const path = require('path');
const express = require('express');

module.exports = {
  app() {
    const app = express();
    // define the folder that will be used for static assets
    app.use(express.static(path.join(__dirname, '../public')));

    // handle every other route with index.html, which will contain
    // a script tag to your application's JavaScript file(s).
    app.get('*', (request, response) => {
      response.sendFile(path.resolve(__dirname, '../public', 'index.html'));
    });

    return app;
  }
};
