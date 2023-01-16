const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const config = require('../config/app.json');

const expressLayouts = require('express-ejs-layouts');


// Set statics routes
Object.entries( config.statics ).forEach(([ k, v ])=>{
  app.use(`/${ k }`, express.static(`frontend/${ v }`));
});

app.use( express.json() );

// Set the template engine
app.use(expressLayouts);

// app.set('layout', './templateengine/layouts/default');

app.set('view engine', 'ejs');

app.set('views', path.dirname( __dirname ) + config.views_dir);

module.exports = app;