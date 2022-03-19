class UserDto {
  email;
  isActivated;
  id;

  constructor(model) {
    this.email = model.email;
    this.isActivated = model.isActivated;
    this.id = model._id;
  }
}

module.exports = UserDto;
