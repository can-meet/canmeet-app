import { UserType } from "./user";

export type MessageType = {
	_id: string;
	sender: UserType;
	text: string;
	isRead: boolean;
	createdAt: Date;
}
