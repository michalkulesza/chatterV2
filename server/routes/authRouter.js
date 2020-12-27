const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const { UserModel } = require("../models/userModel");

const { userExists, updateProfileImage } = require("../functions/user");
const { findGlobalUser } = require("../functions/globalUsers");
const { isUsernameReserved } = require("../functions/reservedNames");

router.post("/register", async (req, res) => {
	try {
		const { username, password, profileImage } = req.body;

		const usernameRegistered = await userExists(username);
		const usernameConnected = findGlobalUser(username);
		const usernameReserved = isUsernameReserved(username);

		if (usernameRegistered || usernameConnected || usernameReserved) return res.status(400).send("User already exists");

		const hashedPassword = await bcrypt.hash(password, 15);
		const user = new UserModel({
			name: username,
			password: hashedPassword,
			rooms: [
				{
					_id: "Main",
					type: "room",
					locked: false,
				},
			],
			profileImage,
			reactions: [],
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

		const usernameRegistered = await userExists(username);
		const usernameConnected = findGlobalUser(username);
		const usernameReserved = isUsernameReserved(username);

		if (usernameRegistered || usernameConnected || usernameReserved) {
			const user = await UserModel.findOne({ name: username });
			const passwordCorrect = await bcrypt.compare(password, user.password);

			if (passwordCorrect) {
				res.status(200).send(user.profileImage);
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

		const usernameRegistered = await userExists(username);
		const usernameConnected = findGlobalUser(username);
		const usernameReserved = isUsernameReserved(username);

		if (usernameRegistered || usernameConnected || usernameReserved)
			return res.status(401).send("Username is taken. Please Login.");

		res.sendStatus(200);
	} catch (error) {
		res.status(400).send("Something went wrong.");
	}
});

router.post("/updateProfileImage", async (req, res) => {
	try {
		const { username, password, image } = req.body;

		const usernameRegistered = await userExists(username);

		if (usernameRegistered) {
			const user = await UserModel.findOne({ name: username });
			const passwordCorrect = await bcrypt.compare(password, user.password);

			if (passwordCorrect) {
				await updateProfileImage(username, image);
				res.status(200).send(image);
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

module.exports = router;
