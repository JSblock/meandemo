var express = require("express");
var http = require("http");
var app =  express();


console.log("Server started and listening to port 1337") ;

app.all("*",function(request,response,next){
    response.writeHead(200,{"Content-Type":"text/plain"});
    next();
});

app.get("/",function(request,response){
    response.end("Welcome to the homepage!");
});

app.get("/about", function(request, response) {
    response.end("Welcome to the about page!");
});

app.get("/hello/:who", function(req, res) {
    res.end("Hello, " + req.params.who + ".");
    // Fun fact: this has security issues
});

app.get("*", function(request, response) {
    response.end("404!");
});


http.createServer(app).listen(1337)  ;
