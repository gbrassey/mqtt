var mqtt = require('mqtt')
  , client = mqtt.connect('mqtt://localhost:1883');

client.subscribe('presence');
client.on('message', function(topic, message) {
  console.log(topic, message.toString());
});