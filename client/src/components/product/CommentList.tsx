import { Comment } from '../../../../server/models/commentModel';
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
import { CommentCard } from './CommentCard';
import { useRef, useEffect, useState } from 'react';
import { DetailProduct } from '@/pages/product/DetailProduct';
import { CommentForm } from './CommentForm';


type CommentListProps = {
  product: DetailProduct;
}

export const CommentList = ({ product }: CommentListProps) => {
  const commentListRef = useRef<HTMLDivElement>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsUpdated, setCommentsUpdated] = useState<boolean>(false);
  const [commentScrollDown, setCommentScrollDown] = useState<boolean>(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  const productId = product._id;

  // 初めのマウント時とcommentがupdateされた時のみレンダリング
  useEffect(() => {
    const getComments = async () => {
      try {
        if (productId) {
          axios.get(`${import.meta.env.VITE_API_URL}/comments/${productId}`)
            .then((res) => {
              setComments(res.data);
              setCommentScrollDown(!commentScrollDown);
              setIsInitialMount(false);  // 初回マウント時のみtrue,2回目以降false
            })
        }
      } catch (error) {
        console.log(error);
      }
    }
    getComments();
  }, [commentsUpdated])

  // コメントが追加されたら、一番下にスクロールダウン
  useEffect(() => {
    const handleScroll = () => {
      if (commentListRef.current) {
        commentListRef.current.scrollTop = commentListRef.current.scrollHeight;
      }
    };
  
    handleScroll();
  }, [commentScrollDown]);


  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex gap-1 my-2 text-[#5F5F5F]">
          <img src={CommentIcon} alt="icon" />
          <span className="text-xs hover:underline">
            {isInitialMount ? `${product.comments.length}件のコメント` : `${comments.length}件のコメント`}
          </span>
        </div>
      </DrawerTrigger>

      <DrawerContent className="bg-white" >
        <DrawerHeader>
          <DrawerTitle><p className="text-xl text-center">コメント</p></DrawerTitle>
        </DrawerHeader>

        <div className='overflow-scroll' ref={commentListRef}>
          {comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
            />
          ))}
        </div>

        <DrawerFooter>
          <CommentForm
            productId={productId}
            commentsUpdated={commentsUpdated}
            setCommentsUpdated={setCommentsUpdated}

          />
        </DrawerFooter>
      </DrawerContent>

    </Drawer>
  )
}