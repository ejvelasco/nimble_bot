const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
var WebSocketServer = require('websocket').server;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("Nimble");
});

app.listen(port, () => {
  console.log("Web server listening on port " + port);
});

