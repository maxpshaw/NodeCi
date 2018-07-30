const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://localhost:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

// dont use arrow b/c it will mess up *this*
mongoose.Query.prototype.exec = async function() {
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  // See if we have a value for 'key' in redis
  // dont forget async keyword
  const cacheValue = await client.get(key);

  // If we do return that
  if (cacheValue) {
    console.log(cacheValue);
  }

  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments);
  console.log(result);
};
