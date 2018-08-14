jest.setTimeout(30000);

require('../models/User');

const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise; //by detault, it doesnt use its default implementation
mongoose.connect(
  keys.mongoURI,
  { useMongoClient: true }
); //recording keeping to config momgoose properly to await deprecation warning
