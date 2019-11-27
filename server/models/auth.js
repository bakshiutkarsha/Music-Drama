const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  username:{type: String, required: true, unique: true},
  email:{type: String, required: true},
  password:{type: String, required: true},
  hash:{type: String, required: false},
  is_active: {type: String, required: false, default: true},
});

module.exports = mongoose.model('Users', UserSchema);
