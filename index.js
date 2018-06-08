const https = require("https");
const http = require("http");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

getAPI = () => {
  const url =
    "https://pixabay.com/api/?key=9220972-14c941a191779d5f50bce3cd4&q=yellow+flowers&image_type=photo";

  const myWriteStream = fs.createWriteStream(
    path.join(__dirname, "/writeMe.txt")
  );

  https
    .get(url, res => {
      // It's important to set encoding to utf8 (otherwisre we get data in Buffer format)
      res.setEncoding("utf8");

      console.log("statusCode:", res.statusCode);
      console.log("headers:", res.headers);

      res.on("data", d => {
        let data = "";
        //   console.log(chalk.red("chunk of data received"));
        data = data + d;

        // Lines 23 and 24 do exactly the same thing
        //   myWriteStream.write(d);
        res.pipe(myWriteStream);
        console.log(data);

        return data;
      });

      res.on("end", () => {
        console.log(chalk.rgb(0, 0, 255)("End..."));
      });
    })
    .on("error", e => {
      console.error(e);
    });
};

reset = () => {
  console.log("\033c");
};

const server = http.createServer((req, res) => {
  console.log("request was made", req.url);

  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Main page</h1>");
    case "/api":
      getAPI();
    case "/reset":
      reset();
    case "/page":
      res.writeHead(200, { "Content-Type": "text/html" });
      let file = fs.readFileSync("./index.html");
      console.log(file);

      res.end(file);
    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h3>Not found...</h3>");
  }
});

server.listen(7000, () => {
  console.log("server running...");
});
