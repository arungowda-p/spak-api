require("rootpath")();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const errorHandler = require("_helpers/error-handler");

const app = express();
app.set("trust proxy", 1);
app.use(
  session({
    secret: "hgascasbkhbak",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/users", require("./users/users.controller"));

app.use(errorHandler);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Server listening on port " + port);
});
