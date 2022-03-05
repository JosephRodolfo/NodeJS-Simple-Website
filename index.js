const http = require("http");
const fs = require("fs");

const allFiles = fs.readdirSync("./");
const allHtmlFiles= allFiles.filter((element) => {
    if (element.endsWith('.html')){
        return element;
    } 
const allCssFiles = allFiles.filter((element) =>
{if (element.endsWith('.css') ) 
return element;
})

    
}).map(element => element.slice(0, -5))
const port = process.env.PORT || 3000
const server = http.createServer((req, res) => {
   



    const requestedURL = req.url.slice(1);


    if (requestedURL.endsWith(".css")) {
      const cssFile = fs.readFileSync("./" + requestedURL, "utf8");
      res.setHeader("Content-Type", "text/css");
      res.end(cssFile);
    }


    
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html');

        if (requestedURL == "" ) {
          let readStream =   fs.createReadStream('./index.html');
          readStream.pipe(res);



        } else {

      let readStream =   fs.createReadStream("./" + requestedURL + '.html');

        readStream.on('open', function () {
          readStream.pipe(res);
        });


        readStream.on('error', ()=>{
          res.statusCode = 404;
        const errorFile = fs.readFileSync("./404.html", "utf8");
      
        res.end(errorFile);
        

        });

      }


 
  
})





server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

