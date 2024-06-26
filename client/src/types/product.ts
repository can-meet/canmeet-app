import { CommentType } from "./comment";
import { UserType } from "./user";

export type ProductType = {
	_id: string;
	product_name: string;
	price: number;
	images: string[];
	product_status: string;
	description: string;
	payment_method: string;
	location: string;
	sale_status: string;
	user: UserType;
	comments: CommentType[];
};

export type DetailProductType = {
  _id: string;
  product_name: string,
  price: number,
  images: string[],
  product_status: string,
  description: string,
  payment_method: string,
  location: string,
  sale_status: string,
  user: {
    _id: string;
    username: string, 
    profilePicture: string,
  },
  comments: CommentType[],
  createdAt: string
}
