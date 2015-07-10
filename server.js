
/// <reference path="typings/tsd.d.ts" />

var express = require("express"),
	app = express();

app.use(express.static(__dirname));

var server = app.listen(2008, function () {
	var host = server.address().address,
		port = server.address().port;
		
		console.log('Server at http://%s:%s', host, port);
});

