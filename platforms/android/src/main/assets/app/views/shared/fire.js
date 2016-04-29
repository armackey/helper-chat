var firebase = require("nativescript-plugin-firebase");
var ObservableArray = require("data/observable-array");
var Observable = require("data/observable");
var imageSource = require("image-source");
var ImageModule = require("ui/image");
var imgObj = {};

var vm = new Observable.Observable({
  isLoading: true,
  messages: new ObservableArray.ObservableArray([]),
  noMessages: ''
});

firebase.init({
  url: "https://image-test.firebaseio.com"
});

function onMessageEvent(result) {
  if (result.type === 'ChildAdded') {
    vm.noMessages = '';
    if (result.value.photo) {
      imgObj.img = imageSource.fromBase64(result.value.photo);
      vm.messages.push(imgObj);
    } else if (result.value.message) {
      vm.messages.push(result.value);
    }
    vm.isLoading = false;
  }
}

exports.sendFirePhoto = function(photo) {
  firebase.push('/messages', {photo: photo});
};

function onValueEvent(result) {
  if (result.type === 'ValueChanged') {
    if (!result.value) {
      vm.isLoading = false;
      vm.noMessages = 'No messages :/';
      return;
    }

    if (result.value.photo) {
      imgObj.img = imageSource.fromBase64(result.value.photo);
      vm.messages.push(imgObj);
    } else if (result.value.message) {
      vm.messages.push(result.value);  
    }
  }
  vm.isLoading = false;
}


exports.sendFireMessage = function(message) {
  firebase.push('/messages', message);
};

firebase.addChildEventListener(onMessageEvent, "/messages");
firebase.addValueEventListener(onValueEvent, "/messages");

exports.vm = vm;    

