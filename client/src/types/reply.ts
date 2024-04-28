import type { Comment } from "./comment";
import type { User } from "./user";

export type Reply = {
	_id: string;
	text: string;
	createdAt: string;
	user: User;
	comment: Comment;
};
