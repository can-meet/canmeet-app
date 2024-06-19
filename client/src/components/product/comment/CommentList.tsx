import type { Comment } from "@/types/comment";
import { CommentCard } from './CommentCard';


type CommentListProps = {
  comments: Comment[];
  toggleReplyForComment: (id: string) => void;
}

export const CommentList = ({ comments, toggleReplyForComment }: CommentListProps) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
          toggleReplyForComment={toggleReplyForComment}
        />
      ))}
    </>
  )
}