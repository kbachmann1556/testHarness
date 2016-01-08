var express = require('express');
var app = express();

var server = app.listen(7000, function (){
	console.log('app running on port 7000');
});