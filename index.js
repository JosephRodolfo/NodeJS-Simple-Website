const http = require("http");
const fs = require("fs");

const allFiles = fs.readdirSync("./");
const allHtmlFiles = allFiles
  .filter((element) => {
    if (element.endsWith(".html")) {
      return element;
    }
  })
  .map((element) => element.slice(0, -5));

const allCssFiles = allFiles.filter((element) => {
  if (element.endsWith(".css")) {
    return element;
  }
});
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  const requestedURL = req.url.slice(1);

  if (requestedURL.endsWith(".css")) {
    if (allCssFiles.includes(requestedURL)) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/css");
      const cssFile = fs.readFileSync(requestedURL, "utf8");
      res.write(cssFile);
    } else {
      res.statusCode = 404;
    }
  }
  if (requestedURL == "") {
    res.statusCode = 200;
    let readStream = fs.createReadStream("./index.html");
    readStream.pipe(res);
  } else if (allHtmlFiles.includes(requestedURL)) {
    res.statusCode = 200;
    let readStream = fs.createReadStream("./" + requestedURL + ".html");

    readStream.on("open", function () {
      readStream.pipe(res);
    });
  } else {
    res.statusCode = 404;
    const errorFile = fs.readFileSync("./404.html", "utf8");

    res.end(errorFile);
  }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
