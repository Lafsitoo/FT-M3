var fs = require("fs");
var http = require("http");

// Escribí acá tu servidor

// http.createServer(function(req, res){
//     if(req.url === "/arcoiris_doge") {
//         fs.readFile("./images/arcoiris_doge.jpg", function(err, data) {
//             if(data) {
//                 res.writeHead(200, {"Content-Type" : "image/jpeg"})
//                 res.end(data)
//             } else {
//                 res.writeHead(404, {"Content-Type" : "plain/text"})
//                 res.end("Error 404")
//             }
//         })
//     }
// }).listen(1337, console.log("Ready"))

http
  .createServer(function (req, res) {
    fs.readFile(`./images${req.url}.jpg`, function (err, data) {
      if (data) {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Error 404");
      }
    });
  })
  .listen(1337, console.log("Ready"));
