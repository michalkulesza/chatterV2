const express = require("express");
const router = express.Router();

const { UserModel } = require("../models/userModel");

router.post("/register", async (_req, res) => {
	res.status(200).send("Hello");
});

module.exports = router;
