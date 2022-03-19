const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token-model");

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  async saveTokens(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const tokens = await TokenModel.create({
      user: userId,
      refreshToken,
    });
    return tokens;
  }

  async removeToken(refreshToken) {
    return await TokenModel.findOneAndDelete({ refreshToken });
  }

  async verifyAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  async verifyRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TokenService();
