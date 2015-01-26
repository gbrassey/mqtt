var mqtt = require('mqtt')
  , client = mqtt.connect('mqtt://enigmatic-plateau-1173.herokuapp.com');

client.publish('presence', 'hello!');
client.end();