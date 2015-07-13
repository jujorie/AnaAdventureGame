
var browserSync = require("browser-sync"),
	app;

app = browserSync({
	server: ".",
	files: [
		"*.html",
		"src/*.js",
		"content/css/*.css"
	], 
	port: 2008
});