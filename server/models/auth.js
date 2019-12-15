const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  username:{type: String, required: true, unique: true},
  password:{type: String, required: true},
  hash:{type: String, required: false},
  is_active: {type: String, required: false, default: true},
  is_admin:{type: String, required: false, default: false}
});

module.exports = mongoose.model('Users', UserSchema);
