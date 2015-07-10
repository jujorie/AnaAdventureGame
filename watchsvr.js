
/// <reference path="typings/tsd.d.ts" />


var browserSync = require("browser-sync"),
	app;

app = browserSync({
	server: ".",
	files: [
		"*.html",
		"content/js/*.js"
	], 
	port: 2011
});