var dialogs = require('ui/dialogs');
var fire = require("../shared/fire");
var selectImage = require('./select-image');
var trackerCounter = null;
var page, text, messageList, addPhoto;
var http = require('http');



fire.vm.messages.on('change', trackMessages);

function trackMessages(evt) {
  while (fire.vm.messages.length > 20) {
    fire.vm.messages.shift();
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
  if (text.text === "") {
    // send alert
    dialogs.alert({
      title: "Closed mouth doesn't get fed.", 
      message:"Feed the box.", 
      okButtonText: "YUM!!!"
    });
    return;
  }

  var message = {
    message: text.text,
    name: 'allen'
  };

  
  fire.sendFireMessage(message);
  text.text = "";
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
  page.bindingContext = fire.vm;
};

