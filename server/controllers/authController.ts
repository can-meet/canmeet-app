import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import User from "../models/userModel";
import generateTokenAndSetCookie from "../utils/generateToken";


export const signup = async (req: Request, res: Response) => {
	const { username, email, password, profilePicture } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture: profilePicture
    });

		if(newUser) {
			// create jwt token
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();
			res.status(201).json(newUser);
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}

	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
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

		generateTokenAndSetCookie(user._id, res);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};
