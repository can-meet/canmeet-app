import { MessageType } from "./message";;
import { ProductType } from "./product";
import { UserType } from "./user";

export type RoomType = {
	_id: string;
	product: ProductType;
	buyer: UserType;
  seller: UserType;
	messages: MessageType[];
};