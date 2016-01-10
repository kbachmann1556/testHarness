// i need to get some education on xpath

var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var By = webdriver.By;
var until = webdriver.until;
var driver;

before(function(){
    driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
});

after(function(){
    driver.quit();
});

// test invitebig homepage

test.describe('Homepage', function (){
  
    beforeEach(function(){
        driver.get('http://invitebig.com/');
    });

    test.it('find title of invitebig.com', function (done){
        driver.wait(until.elementLocated(By.tagName('title'))).then(function (title){
            title.getInnerHtml().then(function (title){
                assert.equal(title, 'Online Event Booking and Venue Management Software | InviteBIG');
            })
        });
        done();
    });

    test.it('find meta content of invitebig.com', function (done){
        driver.wait(until.elementLocated(By.name('description'))).then(function (metaData){
            metaData.getAttribute('content').then(function (metaData){
                assert.equal(metaData, "Are you planning an event? Do you manage a venue? Our event booking, venue booking and venue management software is here to help.");
            })
        });
        done();
    });
});

// test different URLs

test.describe('URLs', function (){

    test.describe('get /help', function (){
    
        beforeEach(function (){
            driver.get('http://invitebig.com/help');
        });
        
        test.it('find title', function (done){
            driver.wait(until.elementLocated(By.tagName('title'))).then(function (title){
                title.getInnerHtml().then(function (title){
                    assert.equal(title, 'InviteBIG Help and Support');
                })
            });
            done();
        });
        
        test.it('find meta content', function (done){
            driver.wait(until.elementLocated(By.name('description'))).then(function (metaData){
                metaData.getAttribute('content').then(function (metaData){
                    assert.equal(metaData, 'InviteBIG Help and Support');
                })
            });
            done();
        });
    });

    test.describe('get /venues', function (){
    
        beforeEach(function (){
            driver.get('http://invitebig.com/venues/');
        });
    
        test.it('find title', function (done){
            driver.wait(until.elementLocated(By.tagName('title'))).then(function (title){
                title.getInnerHtml().then(function (title){
                    assert.equal(title, 'Search For Venues | InviteBIG');
                })
            });
            done();
        });

        test.it('find meta content', function (done){
            driver.wait(until.elementLocated(By.name('description'))).then(function (metaData){
                metaData.getAttribute('content').then(function (metaData){
                    assert.equal(metaData, 'Search through our directory of venues to discover a facility that is perfect for your event. Book space, amenities and catering for any meeting, celebration, team building event, and much more.');
                })
            });
            done();
        });
    });

    test.describe('get /venues/belltown-billiards-lounge-seattle', function (){
    
        beforeEach(function (){
            driver.get('http://invitebig.com/venues/belltown-billiards-lounge-seattle/');
        });
    
        test.it('find title', function (done){
            driver.wait(until.elementLocated(By.tagName('title'))).then(function (title){
                title.getInnerHtml().then(function (title){
                    assert.equal(title, 'Belltown Billiards Lounge, SEATTLE | Venues | InviteBIG');
                })
            });
            done();
        });

        test.it('find meta content', function (done){
            driver.wait(until.elementLocated(By.name('description'))).then(function (metaData){
                metaData.getAttribute('content').then(function (metaData){
                    assert.equal(metaData, 'The Best Venues in Belltown Billiards Lounge, SEATTLE at InviteBIG.com. Search through our directory of venues to discover a facility that is perfect for your event. Book space, amenities and catering for any meeting, celebration, team building event, and much more.');
                })
            });
            done();
        });
    });

    test.describe('get /venues/book-an-event-at-belltown-billiards-lounge-seattle', function (){
    
        beforeEach(function (){
            driver.get('http://invitebig.com/venues/book-an-event-at-belltown-billiards-lounge-seattle');
        });
    
        test.it('find title', function (done){
            driver.wait(until.elementLocated(By.tagName('title'))).then(function (title){
                title.getInnerHtml().then(function (title){
                    assert.equal(title, 'Book An Event At Belltown Billiards Lounge, SEATTLE | Venues | InviteBIG');
                })
            });
            done();
        });
   
        test.it('find meta content', function (done){
            driver.wait(until.elementLocated(By.name('description'))).then(function (metaData){
                metaData.getAttribute('content').then(function (metaData){
                    assert.equal(metaData, 'The Best Venues in Book An Event At Belltown Billiards Lounge, SEATTLE at InviteBIG.com. Search through our directory of venues to discover a facility that is perfect for your event. Book space, amenities and catering for any meeting, celebration, team building event, and much more.');
                })
            });
            done();
        });
    });
});

// test logins

// 1. need to log out user before testing for failure
// 2. need to find a way to test google and facebook logins
// 3. add functionality for tester to imput their own invitebig login info using process.env.email

// recommend adding an id to the login failed message (or use xpath maybe?)

test.describe('/login', function (){
    beforeEach(function (){
        driver.get('https://www.invitebig.com');
    });

    test.it('login with email - success', function (done){
        driver.findElement(By.className('login')).click();
        driver.findElement(By.id('btnLoginWO')).click();
        driver.findElement(By.id('loginEmail')).sendKeys('kbachmann91@gmail.com');
        driver.findElement(By.id('loginPassword')).sendKeys('coding12');
        driver.findElement(By.id('loginSubmit')).click().then(function (){
            driver.wait(until.elementLocated(By.id('dashboardHeader'))).then(function (){
                driver.getCurrentUrl().then(function (URL){
                    assert.equal(URL, 'https://www.invitebig.com/dashboard');
                }); 
                driver.findElement(By.className('dropdown-toggle')).click();
                driver.findElement(By.LinkText('Logout')).click()    
            });
        });
        done();
    });
    
    test.it('login with email - fail', function (done){
        driver.wait(until.elementLocated(By.id('myCarousel'))).then(function (){
            driver.findElement(By.className('login')).click();
            driver.findElement(By.id('btnLoginWO')).click();
            driver.findElement(By.id('loginEmail')).sendKeys('test@test.com');
            driver.findElement(By.id('loginPassword')).sendKeys('testing');
            driver.findElement(By.id('loginSubmit')).click().then(function (){
                driver.wait(until.elementLocated(By.id('dashboardHeader'))).then(function (){
                    driver.getCurrentUrl().then(function (URL){
                        assert.equal(URL, 'https://www.invitebig.com/dashboard');
                    });     
                });
            }); 
        });
        done();
    })
})

//search for venues

test.describe('/venues', function (){
    beforeEach(function(){
        driver.get('http://invitebig.com/venues/');
    });

    test.it('search for a venue', function (done){
    
        var type = driver.findElement(By.className('btn-group'));
        type.click()
        type.findElement(By.className('multiselect-all')).click()

        var size = driver.findElement(By.id('bookFilterPeople'));
        size.click()
        size.findElement(By.css("option[value = '2']")).click()


    // TypeError: Cannot read property 'getCurrentUrl' of null
    // fixed by making the driver a var instead of using this.driver

        var findButton = driver.findElement(By.id('bookFind'));
        findButton.click().then(function (){
            driver.getCurrentUrl().then(function (currentUrl){
                assert.equal(currentUrl, "https://www.invitebig.com/venues/?types=[%22Any%20Type%22,%22Bowling%20Lane%22,%22Dining%20Table%22,%22Indoor%20Space%22,%22Outdoor%20Space%22,%22Pool%20Table%22,%22Seating%22]&size=2");
            });
        });
        done();
    });
});

// test to reserve a venue

// test breaks at differnt points everytime and I don't know why
// logiclly i am trying to do each step after the previous one but sometimes the browser can't click the buttons or will click the wrong one
// code is far from pretty. there has to be a cleaner way to write this

test.describe('/reserve', function (){
    beforeEach(function (){
        driver.get('https://www.invitebig.com/reserve/book-an-event-at-belltown-billiards-lounge-seattle');
    });

    test.it('reserve a venue', function (done){
        var date = driver.findElement(By.id('bookFilterDate'));
        date.clear().then(function (){
        date.sendKeys('01/01/17').then(function (){
            driver.findElement(By.id('bookFind')).click().then(function (){
                driver.wait(until.elementLocated(By.className('avail_available'))).then(function (){
                driver.findElement(By.className('avail_available')).click().then(function (){
                    driver.wait(until.elementLocated(By.id('popupApply'))).then(function (){
                    driver.findElement(By.id('popupApply')).click().then(function (){
                        driver.wait(until.elementLocated(By.className('reservationMakeRes'))).then(function (){
                        driver.findElement(By.className('reservationMakeRes')).click().then(function (){
                            driver.wait(until.elementLocated(By.id('errGroupSize'))).then(function (){
                            driver.findElement(By.id('errGroupSize')).sendKeys('12').then(function (){
                            driver.findElement(By.id('mainModalAcceptBtn')).click().then(function (){
                                driver.wait(until.elementLocated(By.name('buttonReservationNext'))).then(function (){
                                driver.findElement(By.name('buttonReservationNext')).click().then(function (){
                                    driver.wait(until.elementLocated(By.id('reservationContactName'))).then(function (){
                                        driver.findElement(By.id('reservationContactName')).sendKeys('test');
                                        driver.findElement(By.id('reservationContactPhone')).sendKeys('1234567890');
                                        driver.findElement(By.id('reservationContactEmail')).sendKeys('test@test.com');
                                    driver.findElement(By.id('reservationDescription')).sendKeys('is a test').then(function (){
                                    driver.findElement(By.name('buttonReservationBook')).click(function (){
                                        driver.wait(until.elementLocated(By.id('reservationTitle')), function(){
                                        driver.findElement(By.id('reservationTitle'), function (title){
                                            assert.equal(title, 'Reservation proposal for test@test.com');
                                        });
                                        });
                                    });
                                    });
                                    });
                                });
                                });
                            });
                            });
                            });
                        });
                        });
                    });
                    });
                });
                });   
            });
        });  
        });
    done();
    })
})