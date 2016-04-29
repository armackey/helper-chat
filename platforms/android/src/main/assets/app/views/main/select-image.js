var imagePicker = require("nativescript-imagepicker");
var ImageSource = require("image-source");
var fire = require("../shared/fire");
var frame = require('ui/frame');


var imgSrc = new ImageSource.ImageSource();

exports.onSelectSingleImage = function(args) {    
  var context = imagePicker.create({
    mode: "single"
  });
  startSelection(context);
};

function navigateToImage(photo) {
  console.log("navigateToImage");
  var topmost = frame.topmost();
  topmost.navigate({
    moduleName: './views/image/image',
    context:{
      photo: photo
    } 
  });
}

function startSelection(context) {
  context
    .authorize()
    .then(function() {
      return context.present();
    })
    .then(function(selection) {
      selection.forEach(function(selected) {
        navigateToImage(selected);
      });
    }).then(function(b){
      // console.log(b);
    }).catch(function(e) {
      console.log(e);
    });
}