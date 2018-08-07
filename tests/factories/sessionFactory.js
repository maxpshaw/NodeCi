const Buffer = require('safe-buffer').Buffer;
const Keygrip = require('keygrip');
const keys = require('../../config/keys');
const keygrip = new Keygrip([keys.cookieKey]);

module.exports = user => {
  const sessionObject = {
    passport: {
      user: user._id.toString() //b/c it is object
    }
  };
  const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64');
  const sig = keygrip.sign('session=' + session); // they deciede having session= for no reason

  return { session, sig };
};
