const db = require('../utils/db');
const { resolveToken } = require('../utils/tokenMiddleware.js');
const { getSessionToken } = require('../utils/jwt');

module.exports = app => {
  app.post('/register', (req, res) => {
    const { body } = req;
    const data = db.getData();
    if (body.username && body.password && body.name) {
      data.users.push(body);
      db.savaData(data);
    }
    body.token = getSessionToken({
      id: data.users.findIndex(u => u.username === body.username),
    });
    res.json(body);
  });

  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const { users } = db.getData();
    const user = users.find(
      u => u.username === username && u.password === password
    );
    if (!user) return res.status(403).end();
    user.token = getSessionToken({
      id: users.findIndex(u => u.username === username),
    });
    res.json(user);
  });

  app.get('/me', resolveToken, (req, res) => {
    res.json(req.user);
  });
  return app;
};
