const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
//set view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
//middleware
app.use(express.static(path.join(__dirname, "public")));
//views
app.get("/", (req, res) => {
	res.render("Nimble");
});
//start server
app.listen(port, () => {
  console.log("Web server listening on port " + port);
});

