const redis = require('redis');
const Redisclient = redis.createClient();

export default () => {

  Redisclient.on('ready', (err) => console.log('Ready'));

  Redisclient.on('error', (err) => console.log('Error' + err));

}

exports.Redisclient = Redisclient;