const ObjectId = require('mongodb').ObjectId;
const { verifyToken } = require('./jwt');

module.exports.resolveToken = db => async (req, res, next) => {
  const { token } = req.headers;
  const users = db.collection('users');
  const tokenResolve = verifyToken(token);
  if (!tokenResolve) return res.status(403).end();
  req.user = await users.findOne({ _id: ObjectId(tokenResolve.id) });
  if (!req.user) return res.status(403).end();
  // req.user.id = tokenResolve.id;
  next();
};
