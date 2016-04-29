var firebase = require("nativescript-plugin-firebase");
var incomingMessages = [];

firebase.init({
  url: "https://image-test.firebaseio.com"
});

function onMessageEvent(result) {
  if (result.type === 'ChildAdded') {
    incomingMessages.push(result.value);
  }
}

// function onValueEvent(result) {
//   console.log("Event type: " + result.type);
//   incomingMessages.push(result.value);
// }

exports.sendFireMessage = function(message) {
  firebase.push('/messages', message);
};

firebase.addChildEventListener(onMessageEvent, "/messages");
// firebase.addValueEventListener(onValueEvent, "/messages");

exports.incomingMessages = incomingMessages;    

