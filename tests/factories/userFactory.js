const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = () => {
  return new User({}).save(); //b/c we are not using googleid/display so we leave them blank
};
