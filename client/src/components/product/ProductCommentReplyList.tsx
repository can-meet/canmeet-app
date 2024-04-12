import axios from "axios";
import { useEffect, useState } from "react";
import { Reply } from "@/types/reply";
import { ProductCommentReplyCard } from "./ProductCommentReplyCard";
import { ReplyLoading } from "../layout/ReplyLoading";


type ProductCommentReplyList = {
  commentId: string;
}

export const ProductCommentReplyList = ({ commentId }: ProductCommentReplyList) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [replies, setReplies] = useState<Reply[]>([])

  useEffect(() => {
    const getReplies = async () => {
      try {
        if (commentId) {
          setLoading(true)
          axios.get(`${import.meta.env.VITE_API_URL}/replies/${commentId}`)
            .then((res) => {
              setReplies(res.data)
              setLoading(false)
            })
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    getReplies();
  }, [commentId])

  return (
    <div>
      {/* <ReplyLoading />
      {replies.map((reply) => (
        <ProductCommentReplyCard
          key={reply._id}
          reply={reply}
          loading={loading}
        />
      ))} */}
      {loading ? (
        <ReplyLoading />
      ) : (
        <>
          {replies.map((reply) => (
            <ProductCommentReplyCard
              key={reply._id}
              reply={reply}
              loading={loading}
            />
          ))}
        </>
      )}
    </div>
  )
}