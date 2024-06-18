import type { Comment } from "@/types/comment";
import { CommentCard } from './CommentCard';
import { useRef, useEffect } from 'react';


type CommentListProps = {
  comments: Comment[];
  toggleReplyForComment: (id: string) => void;
}

export const CommentList = ({ comments, toggleReplyForComment }: CommentListProps) => {
  const commentsEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [comments]);

  return (
    <div>
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
          toggleReplyForComment={toggleReplyForComment}
        />
      ))}
      <div ref={commentsEndRef} />
    </div>
  )
}