var page, myImage;



function pageLoaded(args) {
  page = args.object;
  myImage = page.getViewById('my-image');
}

exports.pageLoaded = pageLoaded;