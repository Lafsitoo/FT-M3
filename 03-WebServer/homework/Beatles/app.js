var http = require("http");
var fs = require("fs");

var beatles = [
  {
    name: "John Lennon",
    birthdate: "09/10/1940",
    profilePic:
      "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg",
  },
  {
    name: "Paul McCartney",
    birthdate: "18/06/1942",
    profilePic:
      "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg",
  },
  {
    name: "George Harrison",
    birthdate: "25/02/1946",
    profilePic:
      "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg",
  },
  {
    name: "Richard Starkey",
    birthdate: "07/08/1940",
    profilePic:
      "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg",
  },
];

http
  .createServer(function (req, res) {
    if (req.url === "/api") {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(beatles));
    }
    if (req.url.slice(0, 5) === "/api/") {
      // /api/John%20Lennon
      const b = req.url.split("/").pop(); // ["api", "John%20Lennon"]
      const beatle = beatles.find(
        (beatle) => beatle.name.replace(" ", "%20") === b
      );
      if (beatle) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(beatle));
      }
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Error 404");
    }
    if (res.url === "/") {
      return fs.readFile("./index.html", function (err, data) {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Error 404");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
    }
    if(req.url.length > 1){ // localhost:1337/api/John%20Lennon
      const b = req.url.split("/").pop(); // ["api", "John%20Lennon"]
      const beatle = beatles.find(
        (beatle) => beatle.name.replace(" ", "%20") === b
      );
      if(beatle) {
        return fs.readFile("./beatle.html", "utf-8",function (err, data) {
          if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Error 404");
          } else {
            data = data.replace("{name}", beatle.name)
            data = data.replace("{birthdate}", beatle.birthdate)
            data = data.replace("{profilePic}", beatle.profilePic)
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
          }
        });
      }
    }
  })
  .listen(1337);
