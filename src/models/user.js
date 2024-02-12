const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add the user email address"],
    unique: [true, "Email address already taken"], 
  },
  password: {
    type: String,
    required: [true, "Please add the user password"],
  },
  name: String,
  phone_number: String,
  roles: [String],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
