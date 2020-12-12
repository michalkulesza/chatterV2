const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const { UserModel } = require("../models/userModel");

router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		const userExists = await UserModel.exists({ username });

		if (userExists) return res.status(400).send("User already exists");

		const hashedPassword = await bcrypt.hash(password, 15);
		const user = new UserModel({
			username,
			password: hashedPassword,
		});

		user
			.save()
			.then(doc => {
				if (doc) {
					res.sendStatus(200);
				}
			})
			.catch(err => {
				res.status(400).send(err.message);
			});
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
