
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var By = webdriver.By;
var until = webdriver.until;

beforeEach(function(){
  this.driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.phantomjs())
    .build();
});

afterEach(function(){
  this.driver.quit();
});

// function findTitle(driver){
//   return driver.findElement(By.tagName('title')).then(function (title){
//       return title === 'Online Event Booking and Venue Management Software | InviteBIG';
//   });
// }

// function findMetaData(driver){
//   return driver.findElement(By.name('description')).then(function (metaData){
//     return metaData === 'Google';
//   });
// }

test.describe('Homepage', function (){
  before(function(){
    this.driver.get('http://google.com/');
    // this.driver.manage().timeouts().implicitlyWait(10000);
  });

  test.it('find title of invitebig.com', function (done){
    this.driver.wait(until.elementLocated(By.tagName('title'))).then(function (title){
      title.getInnerHtml().then(function (title){
        assert.equal(title, 'Google');
      })
    });
    // title.getInnerHtml().then(function (title){
    //   assert.equal(title, 'Google');
    // })
    // this.driver.getTitle().then(function (title){
    //   assert.equal(title, 'Online Event Booking and Venue Management Software | InviteBIG');
    // });
    // this.driver.wait(findTitle);
    // this.driver.wait(function (){
    //   return this.driver.getTitle().then(function (title){
    //     assert.equal(title, 'Google');
    //   });
    // });
    // this.driver.getTitle().then(function (title){
    //   assert.equal(title, 'Google');
    // });
    
    //   assert.equal(value, 'Google');
    // });
    done();
  });
  // test.it('find meta content of invitebig.com', function (done){
  //   this.driver.wait(findMetaData);
  // //   // var metaData = this.driver.findElement(By.name('description'));
  // //   // metaData.getAttribute('content').then(function (value){
  // //   //   assert.equal(value, 'Google');
  // //   // });
  //   done();
  // });

  // done();
});

test.describe('URLs', function (){

  test.describe('get /help', function (){
    // var testWindow = window.open('', 'slave');

    before(function (){
      // this.driver.openWindow('http://facebook.com');
      this.driver.get('http://facebook.com');
    });
    
    test.it('find title', function (){
      var title = this.driver.findElement(By.tagName('title'));
      title.getInnerHtml().then(function (value){
        assert.equal(value, 'Google');
      });
    });
    // test.it('find meta content', function (){
    //   var metaData = this.driver.findElement(By.name('description'));
    //   metaData.getAttribute('content').then(function (value){
    //     assert.equal(value, 'Google');
    //   });
    // });
  });

  test.describe('get /venues', function (){
    beforeEach(function (){
      this.driver.get('http://invitebig.com/venues/');
    });
    
    test.it('find title', function (){
      var title = this.driver.findElement(By.tagName('title'));
      title.getInnerHtml().then(function (value){
        assert.equal(value, 'Google');
      });
    });
    // test.it('find meta content', function (){
    //   var metaData = this.driver.findElement(By.name('description'));
    //   metaData.getAttribute('content').then(function (value){
    //     assert.equal(value, 'Google');
    //   });
    // });
  });

  test.describe('get /venues/belltown-billiards-lounge-seattle', function (){
    beforeEach(function (){
      this.driver.get('http://invitebig.com/venues/belltown-billiards-lounge-seattle/');
    });
    
    test.it('find title', function (){
      var title = this.driver.findElement(By.tagName('title'));
      title.getInnerHtml().then(function (value){
        assert.equal(value, 'Google');
      });
    });
    // test.it('find meta content', function (done){
    //   var metaData = this.driver.findElement(By.name('description'));
    //   metaData.getAttribute('content').then(function (value){
    //     assert.equal(value, 'Google');
    //   });
    //   done();
    // });
  });

  test.describe('get /venues/book-an-event-at-belltown-billiards-lounge-seattle', function (){
    before(function (){
      this.driver.get('http://invitebig.com/venues/book-an-event-at-belltown-billiards-lounge-seattle');
    });
    
    test.it('find title', function (){
      var title = this.driver.findElement(By.tagName('title'));
      title.getInnerHtml().then(function (value){
        assert.equal(value, 'Google');
      });
    });
    // test.it('find meta content', function (){
    //   var metaData = this.driver.findElement(By.name('description'));
    //   metaData.getAttribute('content').then(function (value){
    //     assert.equal(value, 'Google');
    //   });
    // });
  });

});