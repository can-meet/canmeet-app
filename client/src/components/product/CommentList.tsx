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
import { useEffect, useState } from 'react';
import { DetailProduct } from '@/pages/product/DetailProduct';
import { CommentForm } from './CommentForm';


type CommentListProps = {
  product: DetailProduct;
}

export const CommentList = ({ product }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const productId = product._id;

  useEffect(() => {
    const getComments = async () => {
      try {
        if (productId) {
          axios.get(`${import.meta.env.VITE_API_URL}/comments/${productId}`)
            .then((res) => {
              setComments(res.data);
            })
        }
      } catch (error) {
        console.log(error);
      }
    }
    getComments();
  }, [productId, comments])

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex gap-1 my-2 text-[#5F5F5F]">
          <img src={CommentIcon} alt="icon" />
          <span className="text-xs">{product.comments.length}件のコメント</span>
        </div>
      </DrawerTrigger>

      <DrawerContent className="bg-white" >
        <DrawerHeader>
          <DrawerTitle><p className="text-xl text-center">コメント</p></DrawerTitle>
        </DrawerHeader>

        <div className='overflow-scroll'>
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
          />
        </DrawerFooter>
      </DrawerContent>

    </Drawer>
  )
}