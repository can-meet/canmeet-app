import { ProductType } from "./product";
import { ReplyType } from "./reply";
import { UserType } from "./user";

export type CommentType = {
	_id: string;
	text: string;
	user: UserType;
	product: ProductType;
	replies: ReplyType[];
};
