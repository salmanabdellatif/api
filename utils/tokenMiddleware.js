const { verifyToken } = require('./jwt');

module.exports.resolveToken = db => async (req, res, next) => {
  const { token } = req.headers;
  const tokenResolve = verifyToken(token);
  if (!tokenResolve) return res.status(403).end();
  const {
    rows: [user],
  } = await db.query(`select * from users where id = ${tokenResolve.id}`);
  req.user = user;
  if (!req.user) return res.status(403).end();
  next();
};
