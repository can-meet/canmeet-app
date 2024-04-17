import { Comment } from "./comment";
import { User } from "./user";


export type Reply = {
  _id: string;
  text: string;
  createdAt: string;
  user: User;
  comment: Comment;
}