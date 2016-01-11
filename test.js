
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var By = webdriver.By;
var until = webdriver.until;
var invitebigUsername = process.env.INVITE_USERNAME
var invitebigPassword = process.env.INVITE_PASSWORD
var driver;

before(function(){
    driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
});

after(function(){
    driver.quit();
});

function testURL (url, title, meta){
    beforeEach(function (){
        driver.get(url);
    });

    test.it('find title and metaData', function (done){
        driver.wait(until.elementLocated(By.tagName('title'))).then(function (titleTag){
            titleTag.getInnerHtml().then(function (titleTag){
                assert.equal(titleTag, title);
            })
        })
        driver.wait(until.elementLocated(By.xpath("/html/head/meta[@name='description']"))).then(function (metaData){
            metaData.getAttribute('content').then(function (metaData){
                assert.equal(metaData, meta)
            })
        })
        done();
    });
};

// test invitebig homepage

test.describe('Homepage', function (){
    testURL('http://invitebig.com/',
        'Online Event Booking and Venue Management Software | InviteBIG',
        "Are you planning an event? Do you manage a venue? Our event booking, venue booking and venue management software is here to help."
    );  
});

// test different URLs

test.describe('URLs', function (){

    test.describe('get /help', function (){
        testURL('http://invitebig.com/help',
            'InviteBIG Help and Support',
            'InviteBIG Help and Support'
        );
    });

    test.describe('get /venues', function (){
        testURL('http://invitebig.com/venues/',
            'Search For Venues | InviteBIG',
            'Search through our directory of venues to discover a facility that is perfect for your event. Book space, amenities and catering for any meeting, celebration, team building event, and much more.'
        );
    });

    test.describe('get /venues/belltown-billiards-lounge-seattle', function (){
        testURL('http://invitebig.com/venues/belltown-billiards-lounge-seattle/',
            'Belltown Billiards Lounge, SEATTLE | Venues | InviteBIG',
            'The Best Venues in Belltown Billiards Lounge, SEATTLE at InviteBIG.com. Search through our directory of venues to discover a facility that is perfect for your event. Book space, amenities and catering for any meeting, celebration, team building event, and much more.'
        );
    });

    test.describe('get /venues/book-an-event-at-belltown-billiards-lounge-seattle', function (){
        testURL('http://invitebig.com/venues/book-an-event-at-belltown-billiards-lounge-seattle',
            'Book An Event At Belltown Billiards Lounge, SEATTLE | Venues | InviteBIG',
            'The Best Venues in Book An Event At Belltown Billiards Lounge, SEATTLE at InviteBIG.com. Search through our directory of venues to discover a facility that is perfect for your event. Book space, amenities and catering for any meeting, celebration, team building event, and much more.'
        );
    });
});

// test logins

// 1. need to find a way to test google and facebook logins

test.describe('/login', function (){
    beforeEach(function (){
        driver.get('https://www.invitebig.com');
    });
    
    //trying to intitalize facebook and google apis to login but I don't understand how to initalize google api

    // test.it('login with facebook', function (done){
    //     gapi.auth.signIn({'callback':'googleLoginCallback',
    //         'clientid':'227544064140-dt97tnuqbv13unkhu29u1rsaq94n5srr.apps.googleusercontent.com',
    //         'cookiepolicy':'single_host_origin',
    //         'scope':'profile email',
    //         //'approvalprompt':'force',
    //         'width':'iconOnly'
    //     });

    //// says that driver.window is undefined?

    //     driver.window.fbAsyncInit = function() {
    //         FB.init({
    //             appId: '231999503608351',
    //             channelUrl: '//www.invitebig.com/channel.html',
    //             status: true, // check login status
    //             cookie: false, // enable cookies to allow the server to access the session
    //             xfbml: true // parse XFBML
    //         });
            // FB.login(function(response) 
    //             {
    //                 if (response.authResponse && response.authResponse.accessToken) 
    //                 {   
    //                     FB.api('/me', function(me)
    //                     {       
    //                         if (me.id)
    //                         {
    //                             var data = {method:'fFBLogin',token:response.authResponse.accessToken};
    //                             Post(data).then(function($data)
    //                             {
    //                                 loginDone($data)
    //                             });
    //                         }
    //                     });
    //                 } else {
    //                         // cancelled
    //                 }
    //             });
    //     // }

    // });
    
    // need to set user and password using export INVITE_USERNAME=<username> and export INVITE_PASSWORD=<password> in terminal

    test.it('login with email', function (done){
        driver.findElement(By.className('login')).click();
        driver.findElement(By.id('btnLoginWO')).click();
        driver.findElement(By.id('loginEmail')).sendKeys(invitebigUsername);
        driver.findElement(By.id('loginPassword')).sendKeys(invitebigPassword);
        driver.findElement(By.id('loginSubmit')).click().then(function (){
            driver.wait(until.elementLocated(By.id('dashboardHeader'))).then(function (){
                driver.getCurrentUrl().then(function (URL){
                    assert.equal(URL, 'https://www.invitebig.com/dashboard');
                }); 
                driver.findElement(By.className('dropdown-toggle')).click();
                driver.findElement(By.xpath("//ul[@id='headerUser']/li[3]/a")).click()    
                driver.wait(until.elementLocated(By.className('login'))).then(function (login){
                    login.click();
                    driver.findElement(By.id('btnLoginWO')).click();
                    driver.findElement(By.id('loginEmail')).sendKeys('testing@testing.com');
                    driver.findElement(By.id('loginPassword')).sendKeys('testing');
                    driver.findElement(By.id('loginSubmit')).click().then(function (){

                //         // can't get to work properly with .wait or .implicitlyWait

                //         driver.manage().timeouts().implicitlyWait(50000).then(function (){
                //             driver.findElement(By.xpath("//div[@id='loginFailed']/div")).then(function (fail){
                //                 fail.getText().then(function (text){
                //                     assert.equal(text, 'Login failed, invalid credentials');
                //                 });
                //             });  
                //         });
                        driver.wait(until.elementLocated(By.xpath("//div[@id='loginFailed']/div"))).then(function (fail){
                            fail.getText().then(function (text){
                                assert.equal(text, 'Login failed, invalid credentials');
                            });
                        });
                    });
                });
            });
        });
        done();
    });
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