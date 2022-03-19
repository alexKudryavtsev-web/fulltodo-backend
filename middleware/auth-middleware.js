const ApiError = require("../error/api-error");
const TokenService = require("../service/token-service");

async function authMiddleware(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      next(ApiError.UnathorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    const userData = await TokenService.verifyAccessToken(accessToken);
    if (!accessToken || !userData) {
      next(ApiError.UnathorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = authMiddleware;
