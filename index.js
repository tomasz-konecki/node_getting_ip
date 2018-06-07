const express = require("express");
const fetch = require("fetch");

const app = express();

app.get("/", (req, res) => {
  //reset console
  console.log("\033c");

  let ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  console.log(ip);

  var ipaddress = (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
  ).split(",")[0];

  console.log(ipaddress);

  res.end();
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
