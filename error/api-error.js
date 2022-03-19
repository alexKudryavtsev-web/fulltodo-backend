class ApiError extends Error {
  status;
  errors;

  constructor(message, status, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnathorizedError() {
    return new ApiError("Ошибка регистрации", 401);
  }

  static BadRequest(message, errors = []) {
    return new ApiError(message, 400, errors);
  }
}

module.exports = ApiError;
