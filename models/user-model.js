const { Schema, model } = require("mongoose");

const UserScheme = new Schema({
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  isActivated: {
    type: Schema.Types.Boolean,
    required: true,
    default: false,
  },
  activationLink: {
    type: Schema.Types.String,
    required: true,
  },
});

module.exports = model("User", UserScheme);
