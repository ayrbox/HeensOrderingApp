const userRoutes = require("express").Router();

//@route        POST api/users/login
//@desc         Login User
//@access       Public
//@return       JWT Token
userRoutes.post("/login", require("./login"));

module.exports = userRoutes;
