var mqtt = require('mqtt')
  , client = mqtt.connect('mqtt://localhost:1883');

client.publish('presence', 'hello!');
client.end();