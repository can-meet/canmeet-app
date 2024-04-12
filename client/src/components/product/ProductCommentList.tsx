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
import { Input } from "@/components/ui/input";
import { VscSend } from "react-icons/vsc";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import user1Pic from "/alex-unsplash.jpg"
import { ProductCommentCard } from './ProductCommentCard';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { DetailProduct } from '@/pages/product/DetailProduct';


type ProductCommentListProps = {
  product: DetailProduct;
}

export const ProductCommentList = ({ product }: ProductCommentListProps) => {
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
  }, [productId])

  console.log(product)

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

        {comments.map((comment) => (
          <ProductCommentCard
            key={comment._id}
            comment={comment}
          />
        ))}

        <DrawerFooter>
          <div className="flex items-center gap-2 w-80 my-0 mx-auto">
            <Avatar>
              <AvatarImage src={user1Pic} />
            </Avatar>
            <div className="relative w-full">
              <Input placeholder="コメントする" type="text" className="rounded-xl border-secondary-gray text-secondary-gray" />
              <button className="absolute top-2 right-4 cursor-pointer"><VscSend className="text-2xl" /></button>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
      
    </Drawer>
  )
}