/*
'AC79d10ac78fe1769a02f14ad2b264e47f',
'64daba0b0fd1a6d30cd573f55549af97' -- TOKEN
''
*/


// if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
//   dotenv.config({path: '.env'});
// } else {
//   dotenv.config({path: '.env.test', silent: true});
// }

var dotenv = require('dotenv')
var cfg = {}


var TWILIO_ACCOUNT_SID = "AC79d10ac78fe1769a02f14ad2b264e47f"
var TWILIO_AUTH_TOKEN = "64daba0b0fd1a6d30cd573f55549af97"
var TWILIO_NUMBER = "+19098439012"


//find how to load in system invironment
cfg.accountSid = TWILIO_ACCOUNT_SID;
cfg.authToken = TWILIO_AUTH_TOKEN;
cfg.sendingNumber = TWILIO_NUMBER

var requiredConfig = [cfg.accountSid, cfg.authToken, cfg.sendingNumber];
var isConfigured = requiredConfig.every(function(configValue) {
	console.log('here!!')
	console.log(configValue)
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

  throw new Error(errorMessage);
}
module.exports = cfg;