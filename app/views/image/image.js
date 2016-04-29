var frame = require('ui/frame');
var ImageSource = require("image-source");
var fire = require("../shared/fire");
var page, myImage, photo;


exports.goBack = function() {
  frame.topmost().goBack();
};

exports.sharePhoto = function() {
  var img = photo.thumb.toBase64String(photo);
  fire.sendFirePhoto(img);
  frame.topmost().goBack();
};

function displayPhoto(photo) {
  var img = photo.thumb;
  page.bindingContext = {
    photo: img
  };

}
exports.pageLoaded = function(args) {
  page = args.object;
  photo = page.navigationContext.photo;
  displayPhoto(photo);
  myImage = page.getViewById('my-image');
};