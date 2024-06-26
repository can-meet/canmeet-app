import { CommentType } from "./comment";
import { UserType } from "./user";

export type ReplyType = {
	_id: string;
	text: string;
	createdAt: string;
	user: UserType;
	comment: CommentType;
};
