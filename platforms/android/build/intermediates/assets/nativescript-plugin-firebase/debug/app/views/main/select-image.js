var imagePicker = require("nativescript-imagepicker");
var ImageSource = require("image-source");
var fire = require("./fire");
var frame = require('ui/frame');


var imgSrc = new ImageSource.ImageSource();

exports.onSelectSingleImage = function(args) {    
  var context = imagePicker.create({
    mode: "single"
  });
  startSelection(context);
};

function navigateToImage(uri) {
  var topmost = frame.topmost();
  topmost.navigate({
    moduleName: '../image/image'
  });
}

function startSelection(context) {
  context
    .authorize()
    .then(function() {
      return context.present();
    })
    .then(function(selection) {
      //TODO expand photo before Base64!!!! The quality is being destroyed.

      selection.forEach(function(selected) {
        // console.log(selected);
        for (var key in selected) {
          console.log(key);
        }
        console.log(selected.uri);
        navigateToImage();
      //   var img = selected.thumb.toBase64String('data:image/png;base64');
      //   fire.sendFireMessage({photo: img});
      });
    }).then(function(b){
      // console.log(b);
    }).catch(function(e) {
      console.log(e);
    });
}