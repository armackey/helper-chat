var page, myImage;



exports.pageLoaded = function(args) {
  page = args.object;
  myImage = page.getViewById('my-image');
};