const { resolveToken } = require('../utils/tokenMiddleware.js');
const { getSessionToken } = require('../utils/jwt');

module.exports = (app, db) => {
  const users = db.collection('users');
  app.post('/register', async (req, res) => {
    const { body } = req;
    if (!body.username || !body.password || !body.name) {
      return res.status(400).json({ error: { msg: 'validation error' } });
    }
    const { insertedId } = await users.insertOne(body);
    const token = getSessionToken({ id: insertedId });
    res.json({ id: insertedId, token });
  });

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await users.findOne({
      username: username,
      password: password,
    });
    if (!user)
      return res.status(403).json({ error: { msg: 'user not found' } });
    user.token = getSessionToken({ id: user._id });
    res.json(user);
  });

  app.get('/me', resolveToken(db), async (req, res) => {
    res.json(req.user);
  });
  return app;
};
