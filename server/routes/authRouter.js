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

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const userExists = await UserModel.exists({ username });

		if (userExists) {
			const user = await UserModel.findOne({ username });
			const passwordCorrect = await bcrypt.compare(password, user.password);

			if (passwordCorrect) {
				res.sendStatus(200);
				//USER JOINED
			} else {
				res.status(401).send("Incorrect password");
			}
		} else {
			res.status(404).send("User does not exist.");
		}
	} catch (error) {
		res.status(400).send("Something went wrong.");
	}
});

router.post("/join", async (req, res) => {
	try {
		const { username } = req.body;
		const userExists = await UserModel.exists({ username });

		if (userExists) return res.status(401).send("Username is taken. Please Login.");

		res.sendStatus(200);
	} catch (error) {
		res.status(400).send("Something went wrong.");
	}
});

module.exports = router;
