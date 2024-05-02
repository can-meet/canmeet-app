import type { Product } from "./product";

export type User = {
	_id: string;
	username: string;
	email: string;
	password: string;
	profilePicture: string;
	isAdmin: boolean;
	postedProducts: Product[];
	purchasedProducts: Product[];
	// comments: Comment[];
	// replies: Reply[];
};
