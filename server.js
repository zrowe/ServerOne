var fs = require("fs");
var http = require("http");

//80: Hypertext Transfer Protocol (HTTP) used in the World Wide Web
//registered ports are those from 1024 through 49151
var PORT = 8080;

var server = http.createServer(handleRequest);

// Start our server
server.listen(PORT, function() {
    // Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:" + PORT);
});

// Create a function which handles incoming requests and sends responses
function handleRequest(req, res) {

    // Capture the url the request is made to
    var path = req.url;


    // Depending on the URL, display a different HTML file.
    switch (path) {

        case "/":
            var file = "/index.html"
            return serviceRequest(file, req, res);

        case "/foods":
            var file = "/foods.html"
            return serviceRequest(file, req, res);

        case "/movies":
            var file = "/movies.html"
            return serviceRequest(file, req, res);

        case "/frameworks":
            var file = "/frameworks.html"
            return serviceRequest(file, req, res);

        default:
            return display404(path, req, res);
    }
}

// When someone visits any path that is not specifically defined, this function is run.
function display404(url, req, res) {
    var myHTML = "<html>" +
        "<body><h1>404 Not Found </h1>" +
        "<p>The page you were looking for: " + url + " can not be found</p>" +
        "</body></html>";

    // Configure the response to return a status code of 404 (meaning the page/resource asked for couldn't be found), and to be an HTML document
    res.writeHead(404, { "Content-Type": "text/html" });

    // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
    res.end(myHTML);
}

// Create a function for handling the requests and responses coming into our server
function serviceRequest(file, req, res) {

    // Here we use the fs package to read our index.html file
    fs.readFile(__dirname + file, function(err, data) {

        // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
        // an html file.
        res.writeHead(200, { "Content-Type": "text/html" });
        //res.send() will send the HTTP response
        //res.end() will end the response process.
        res.end(data);
    });
}