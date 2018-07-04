const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// const path = require("path");
const app = express();
const db = require("./config/keys").mongoURI;

//importing routes
const userRoutes = require("./routes/api/userRoutes");

//database connection
mongoose
  .connect(db)
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passportjs middleware
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Express running on port ${port}`));
