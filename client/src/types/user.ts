import { ProductType } from "./product";

export type UserType = {
	_id: string;
	username: string;
	email: string;
	password: string;
	profilePicture: string;
	isAdmin: boolean;
	postedProducts: ProductType[];
	purchasedProducts: ProductType[];
};
