import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const signup = async (req: Request, res: Response) => {
	const { username, email, password, profilePicture } = req.body;

	try {
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			username,
			email,
			password: hashedPassword,
			profilePicture,
		});

		const result = await user.save();

		// create jwt token
		const token = jwt.sign(
			{ userId: result._id, email: result.email },
			JWT_SECRET,
			{ expiresIn: "1h" },
		);

		res
			.status(201)
			.send({ message: "User created", token, userId: result._id });
	} catch (error) {
		res.status(500).send(error);
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).send({ message: "Authentication failed" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).send({ message: "Authentication failed" });
		}

		// create jwt token
		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			JWT_SECRET,
			{ expiresIn: "1h" },
		);

		res.status(200).send({ token, userId: user._id });
	} catch (error) {
		res.status(500).send(error);
	}
};
