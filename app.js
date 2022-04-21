const express = require('express');
const mongoClient = require('./utils/db.js');
const { MongoClient } = require('mongodb');

const { resolveToken } = require('./utils/tokenMiddleware.js');

const users = require('./controllers/users.js');
const posts = require('./controllers/posts.js');

const app = express();
const { Router } = express;

app.use(express.json());

async function run() {
  const db = await mongoClient().then(client => client.db('blog'));
  app.use('/users', users(new Router(), db));
  app.use('/posts', resolveToken(db), posts(new Router(), db));
}

run();

module.exports = app;
