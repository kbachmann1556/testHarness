# testHarness

## About

This is a node.js project for selenium testing of invitebig.com.  

## How to use

1. Clone this repro
2. cd into the testHarness directory
3. 'npm install'
4. 'node server.js'
5. 'export INVITE_USERNAME=<invitebig email login>'
6. 'export IVITE_PASSWORD=<invitebig password>'
7. 'npm test'

This will launch the server on `http://localhost:7000`, and the node console will confirm the listening socket.

## Testing

This project users mocha and selenium-webdriver to perform end-to-end testing.
'export INVITE_USERNAME=<invitebig email login>' and 'export IVITE_PASSWORD=<invitebig password>' will allow the test to login to invitebig using your credentials
To launch the tests just run 'npm test' from the testHarness directory while the 'node server.js' is running.
