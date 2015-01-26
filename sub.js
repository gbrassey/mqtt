var mqtt = require('mqtt')
  , client = mqtt.connect('mqtt://enigmatic-plateau-1173.herokuapp.com');

client.subscribe('presence');
client.on('message', function(topic, message) {
  console.log(topic, message.toString());
});