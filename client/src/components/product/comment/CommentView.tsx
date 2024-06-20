import type { Comment } from "@/types/comment";
import axios from "axios";
import CommentIcon from "/comment.svg"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { IoIosArrowBack } from "react-icons/io";

import { useEffect, useState } from 'react';
import DetailProduct from '@/pages/product/DetailProduct';
import { CommentForm } from './CommentForm';
import { CommentList } from "./CommentList";
import { ReplyForm } from "../reply/ReplyForm";
import { CommentCardForReply } from "./CommentCardForReply";


type CommentListProps = {
  product: DetailProduct;
}

export const CommentView = ({ product }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComments, setSelectedComments] = useState<Comment[]>([]);
  const [commentsUpdated, setCommentsUpdated] = useState<boolean>(false);
  const [repliesUpdated, setRepliesUpdated] = useState<boolean>(false);
  const [commentScrollDown, setCommentScrollDown] = useState<boolean>(false);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [replySelected, setReplySelected] = useState<boolean>(false);
  const productId = product._id;


  const toggleReplyForComment = (id?: string) => {
    setReplySelected(!replySelected);
    if (!replySelected) {
      const filteredComments = comments.filter((comment) => comment._id === id);
      setSelectedComments(filteredComments);
    }
  };

  // 初めのマウント時とcommentがupdateされた時のみレンダリング
  useEffect(() => {
    const getComments = async () => {
      try {
        if (productId) {
          axios.get(`${import.meta.env.VITE_API_URL}/comments/products/${productId}`)
            .then((res) => {
              setComments(res.data);
              setSelectedComments(res.data)
              setCommentScrollDown(!commentScrollDown);
              setIsInitialMount(false);  // 初回マウント時のみtrue,2回目以降false
            })
        }
      } catch (error) {
        console.log(error);
      }
    }
    getComments();
  }, [commentsUpdated, productId])


  return (
    <Drawer onClose={() => setReplySelected(false)}>
      <DrawerTrigger>
        <div className="flex gap-1 text-dark-gray">
          <img src={CommentIcon} alt="icon" />
          <span className="text-xs hover:underline hover:underline-offset-1">
            {isInitialMount ? `${product.comments.length}件のコメント` : `${comments.length}件のコメント`}
          </span>
        </div>
      </DrawerTrigger>

      <DrawerContent className="bg-white" >
        <DrawerHeader className='border-primary-gray border-b relative'>

          <DrawerTitle>
            <p className="text-lg font-semibold text-center">
              コメント
            </p>
          </DrawerTitle>

          {/* 返信するボタンを押したら、コメントというタイトルに上にくる */}
          <DrawerTitle className={`absolute top-4 left-0 w-full bg-white z-20 transform ${replySelected ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500`}>
            <div className='flex items-center justify-between w-80 mx-auto'>
              <button onClick={() => toggleReplyForComment()}>
                <IoIosArrowBack className='text-2xl'/>
              </button>
              <p className="text-lg font-semibold text-center pr-4.5">
                リプライ
              </p>
              <span className='w-6'></span>
            </div>
          </DrawerTitle>
        </DrawerHeader>

        <div className={`relative h-full overflow-x-hidden ${replySelected ? '' : 'overflow-scroll'}`}>
          {!replySelected && (
            <CommentList 
              comments={comments}
              toggleReplyForComment={toggleReplyForComment}
            />
          )}
          {/* 返信するボタンを押したら、コメントリストの上指定されたコメントが表示される */}
          <CommentCardForReply
            comment={selectedComments[0]} 
            replySelected={replySelected}
            repliesUpdated={repliesUpdated}
          />
        </div>

        <DrawerFooter>
          <CommentForm
            productId={productId}
            commentsUpdated={commentsUpdated}
            setCommentsUpdated={setCommentsUpdated}
          />
          {/* 返信するボタンを押したら、コメントフォームの上に表示される */}
          <ReplyForm 
            replySelected={replySelected}
            selectedCommentId={selectedComments[0]?._id}
            repliesUpdated={repliesUpdated}
            setRepliesUpdated={setRepliesUpdated}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}