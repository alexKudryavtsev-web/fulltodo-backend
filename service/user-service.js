const bcrypt = require("bcrypt");
const uuid = require("uuid");
const UserDto = require("../dto/user-dto");
const UserModel = require("../models/user-model");
const TokenService = require("./token-service");
const EmailService = require("./email-service");
const ApiError = require("../error/api-error");
const tokenModel = require("../models/token-model");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтой ${email} уже существует`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await EmailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user);

    const tokens = await TokenService.generateTokens({ ...userDto });
    await TokenService.saveTokens(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`Пользователя с почтой ${email} не существует`);
    }

    if (!user.isActivated) {
      throw ApiError.BadRequest(`Аккаунт на ${email} не активирован`);
    }

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      throw ApiError.BadRequest(`Неправильный пароль`);
    }
    const userDto = new UserDto(user);

    const tokens = await TokenService.generateTokens({ ...userDto });
    await TokenService.saveTokens(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async logout(refreshToken) {
    return await TokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.BadRequest("Отсутствует refreshToken");
    }
    const userData = await TokenService.verifyRefreshToken(refreshToken);
    const tokenFromDB = await tokenModel.findOne({ refreshToken });

    if (!userData || !tokenFromDB) {
      throw ApiError.BadRequest("Некорректный refreshToken");
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);

    const tokens = await TokenService.generateTokens({ ...userDto });
    await TokenService.saveTokens(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }
}

module.exports = new UserService();
