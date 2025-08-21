const express = require("express");
const path = require("path");
const clientRoute = require("./routers/client/index.route");
const adminRoute = require("./routers/admin/index.route");
const database = require("./config/database");
const systemConfig = require("./config/systems");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

require("dotenv").config();

const app = express();
const port = process.env.PORT;
//Config view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//Config static file
app.use(express.static("public"));
//App locals variables
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
//Routes
clientRoute(app);
adminRoute(app);

(async () => {
  await database.connect();
  app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
  });
})();
