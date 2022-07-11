const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
