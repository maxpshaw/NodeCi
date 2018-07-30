const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
  // wait route hanlder to rund first
  await next();

  clearHash(req.user.id);
};
