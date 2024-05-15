import type { Comment } from "@/types/comment";
import axios from "axios";
import CommentIcon from "/comment.svg"
import {
  CommentDrawerContent,
  Drawer,
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
          axios.get(`${import.meta.env.VITE_API_URL}/comments/products/${productId}`)
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
        <div className="flex gap-1 text-dark-gray">
          <img src={CommentIcon} alt="icon" />
          <span className="text-xs hover:underline hover:underline-offset-1">
            {isInitialMount ? `${product.comments.length}件のコメント` : `${comments.length}件のコメント`}
          </span>
        </div>
      </DrawerTrigger>

      <CommentDrawerContent className="bg-white" >
        <DrawerHeader className='border-primary-gray border-b relative'>
          {/* absolute bottom-3 right-40 */}
          <DrawerTitle className=''>
            <p className="text-lg font-semibold text-center">
              コメント
            </p>
          </DrawerTitle>
        </DrawerHeader>

        <div className='overflow-scroll z-50' ref={commentListRef}>
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
      </CommentDrawerContent>

    </Drawer>
  )
}