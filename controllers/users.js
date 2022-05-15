const { resolveToken } = require('../utils/tokenMiddleware.js');
const { getSessionToken } = require('../utils/jwt');

module.exports = (app, db) => {
  app.post('/register', async (req, res) => {
    const { name, username, password, birth } = req.body;
    if (!username || !password || !name || !birth) {
      return res.status(400).json({ error: { msg: 'validation error' } });
    }
    const {
      rows: [user],
    } = await db.query(
      `insert into users (name ,username, password, birth) values('${name}', '${username}', '${password}', '${birth}') RETURNING id;`
    );
    const token = getSessionToken({ id: user.id });
    res.json({ id: user.id, token });
  });

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const {
      rows: [user],
    } = await db.query(
      `SELECT * from users where username = '${username}' AND password = '${password}'`
    );
    if (!user)
      return res.status(403).json({ error: { msg: 'user not found' } });
    user.token = getSessionToken({ id: user.id });
    res.json(user);
  });

  app.get('/me', resolveToken(db), async (req, res) => {
    res.json(req.user);
  });
  return app;
};
