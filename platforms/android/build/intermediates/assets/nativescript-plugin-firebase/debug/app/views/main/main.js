var dialogs = require('ui/dialogs');
var fire = require("./fire");
var firebase = require("nativescript-plugin-firebase");
var ObservableArray = require("data/observable-array").ObservableArray;
var field = require("ui/text-field");
var selectImage = require("./select-image");
var ImageSource = require("image-source");
var imageModule = require("ui/image");
var frame = require('ui/frame');


var messages = new ObservableArray();
var imgSrc = new ImageSource.ImageSource();
var image = new imageModule.Image();

var trackerCounter = null;
var page, text, messageList, addPhoto;

firebase.init({
  url: "https://image-test.firebaseio.com"
});

function onChildEvent(result) {
  if (result.type === 'ChildAdded') {
    if (result.value.photo) {
      var imgObj = {};
      imgObj.img = ImageSource.fromBase64(result.value.photo);

      messages.push(imgObj);
    } else {
      messages.push(result.value);  
    }
    
  }
}

firebase.addChildEventListener(onChildEvent, "/messages");

messages.on('change', trackMessages);


function trackMessages(evt) {
  while (messages.length > 20) {
    messages.shift();
  }
  if (trackerCounter || !messageList) { return; }
  trackerCounter = setTimeout(resetMessageDisplay,1);
}

function resetMessageDisplay() {
  trackerCounter = null;
  var offset = messageList.scrollableHeight;
  messageList.scrollToVerticalOffset(offset, false);
}

exports.sendMessage = function() {
  // if (text.text === "") {
  //   // send alert
  //   dialogs.alert({
  //     title: "Closed mouth doesn't get fed.", 
  //     message:"Feed the box", 
  //     okButtonText: "Got it!"
  //   });
  //   return;
  // }
  var topmost = frame.topmost();
  topmost.navigate('./test');

  var message = {
    message: text.text,
    name: 'allen'
  };

  // text.text = "";
  // firebase.push('/messages', message);
};

exports.growImage = function(args) {
  args.object.stretch = "fill";
};


exports.addImage = function() {
  selectImage.onSelectSingleImage();
};
exports.pageLoaded = function(args) {
  page = args.object;
  text = page.getViewById("input");
  messageList = page.getViewById("message-list");
  addPhoto = page.getViewById("add-photo");
  page.bindingContext = {
    messages: messages
  };
};


