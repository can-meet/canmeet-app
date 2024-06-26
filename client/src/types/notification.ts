import { ProductType } from "./product";
import { UserType } from "./user";

export type NotificationType = {
	_id: string;
  receiver: UserType;
	sender: UserType;
  type: string;
  content: string;
	isRead: boolean;
  product: ProductType;
}
