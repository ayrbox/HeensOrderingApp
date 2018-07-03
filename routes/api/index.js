const express = require("express");
const router = express.Router();

//Import Routes
const usersRoutes = require("./user");

//Use Routes
router.use("/users", usersRoutes);

module.exports = router;
