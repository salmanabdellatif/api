const db = require('./db.js');

module.exports.resolveToken = (req, res, next) => {
  const { token } = req.headers;
  const { users } = db.getData();
  req.user = users[token];
  if (!req.user) return res.status(403).end();
  req.user.id = token;
  next();
};
