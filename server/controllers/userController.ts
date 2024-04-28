import type { Request, Response } from "express";
import User from "../models/userModel";

export const getUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId;

		const user = await User.findById(userId)
			.select("-password")
			.populate("postedProducts")
			.populate("purchasedProducts");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};
