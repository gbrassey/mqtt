var mqtt = require('mqtt'), url = require('url');
// Parse
var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
var auth = (mqtt_url.auth || ':').split(':');

// Create a client connection
var client = mqtt.connect(mqtt_url.port, mqtt_url.hostname, {
  username: auth[0],
  password: auth[1]
});

client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe('hello/world', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });

  // publish a message to a topic
  client.publish('hello/world', 'my message', function() {
    console.log("Message is published");
    client.end(); // Close the connection when published
  });
});


// var mqtt = require('mqtt')
//   , _ = require('underscore');

// new mqtt.Server(function(client) {
//   var self = this;

//   if (!self.clients) self.clients = {};

//   client.on('connect', function(packet) {
//     self.clients[packet.clientId] = client;
//     client.id = packet.clientId;
//     console.log("CONNECT: client id: " + client.id);
//     client.subscriptions = [];
//     client.connack({returnCode: 0});
//   });

//   client.on('subscribe', function(packet) {
//     var granted = [];

//     console.log("SUBSCRIBE(%s): %j", client.id, packet);

//     for (var i = 0; i < packet.subscriptions.length; i++) {
//       var qos = packet.subscriptions[i].qos
//         , topic = packet.subscriptions[i].topic
//         , reg = new RegExp(topic.replace('+', '[^\/]+').replace('#', '.+') + '$');

//       granted.push(qos);
//       client.subscriptions.push(reg);
//     }

//     client.suback({messageId: packet.messageId, granted: granted});
//   });

//   client.on('publish', function(packet) {
//     console.log("PUBLISH(%s): %j", client.id, packet);
//     for (var k in self.clients) {
//       var c = self.clients[k];

//       for (var i = 0; i < c.subscriptions.length; i++) {
//         var s = c.subscriptions[i];

//         if (s.test(packet.topic)) {
//           c.publish({topic: packet.topic, payload: packet.payload});
//           break;
//         }
//       }
//     }
//   });

//   client.on('pingreq', function(packet) {
//     console.log('PINGREQ(%s)', client.id);
//     client.pingresp();
//   });

//   client.on('disconnect', function(packet) {
//     client.stream.end();
//   });

//   client.on('close', function(packet) {
//     delete self.clients[client.id];
//   });

//   client.on('error', function(e) {
//     client.stream.end();
//     console.log(e);
//   });
// }).listen(process.argv[2] || 1883);