import axios from "axios";
import { useEffect, useState } from "react";
import { Reply } from "@/types/reply";
import { ReplyCard } from "./ReplyCard";
import { ReplyLoading } from "../layout/ReplyLoading";


type ReplyListProps = {
  commentId: string;
}

export const ReplyList = ({ commentId }: ReplyListProps) => {
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
      {loading ? (
        <ReplyLoading />
      ) : (
        <>
          {replies.map((reply) => (
            <ReplyCard
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