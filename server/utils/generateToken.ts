import jwt from "jsonwebtoken";
import type { Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const generateTokenAndSetCookie = (userId: string, res: Response) => {
	const token = jwt.sign({ userId }, JWT_SECRET as string, {
		expiresIn: "1d",
	});

	res.cookie("jwt", token, {
		maxAge: 1 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV !== "development",
	});

};

export default generateTokenAndSetCookie;