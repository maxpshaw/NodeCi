const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://localhost:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

// dont use arrow b/c it will mess up *this*
mongoose.Query.prototype.exec = function() {
  console.log('IM ABOUT TO RUN A QUERY');

  // modifying getQuery will affect the query
  //   console.log(this.getQuery());
  //   console.log(this.mongooseCollection.name);

  // copy properties from one to another
  const key = Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name
  });

  console.log(key);

  return exec.apply(this, arguments);
};
