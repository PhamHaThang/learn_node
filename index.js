const express = require("express");
const clientRoute = require("./routers/client/index.route");
const adminRoute = require("./routers/admin/index.route");
const database = require("./config/database");
const systemConfig = require("./config/systems");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const path = require("path");
const moment = require("moment");

const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

//Socket IO
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
//Config view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//Config static file
app.use(express.static(path.join(__dirname, "public")));
//App locals variables
app.locals.moment = moment;
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
//Config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Flash
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
//Routes
clientRoute(app);
adminRoute(app);
app.use((req, res, next) => {
  res.status(404).render("client/pages/errors/404", {
    pageTitle: "404 Not Found",
  });
});

(async () => {
  await database.connect();
  server.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
  });
})();

module.exports = app;
