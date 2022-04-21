const db = require('./db.js');
const { verifyToken } = require('./jwt');

module.exports.resolveToken = (req, res, next) => {
  const { token } = req.headers;
  const { users } = db.getData();
  const tokenResolve = verifyToken(token);
  if (!tokenResolve) return res.status(403).end();
  req.user = users[tokenResolve.id];
  if (!req.user) return res.status(403).end();
  req.user.id = tokenResolve.id;
  next();
};
