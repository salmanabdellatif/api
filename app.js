const express = require('express');
const fs = require('fs');
const db = require('./utils/db');

const { resolveToken } = require('./utils/tokenMiddleware.js');

db.set();

const users = require('./controllers/users.js');
const posts = require('./controllers/posts.js');

const app = express();
const { Router } = express;

app.use(express.json());
app.use('/users', users(new Router()));
app.use('/posts', resolveToken, posts(new Router()));

module.exports = app;
