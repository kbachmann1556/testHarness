var page = require('webpage').create();
page.open('http://fluentconf.com', function(status) {
  var title = page.evaluate(function() {
    return document.title;
  });
  console.log('Page title is ' + title);
  phantom.exit();
});