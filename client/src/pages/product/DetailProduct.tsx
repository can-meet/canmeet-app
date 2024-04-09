import { Product } from "@/types/product";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import CommentIcon from "/comment.svg"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import user1Pic from "/alex-unsplash.jpg"
import user2Pic from "/emma-unsplash.jpg"
import { IoIosArrowBack } from "react-icons/io";
import { VscSend } from "react-icons/vsc";

const DetailProduct = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState<Product>({
    _id: '',
    user: '',
    product_name: '',
    price: 0,
    image: '',
    product_status: '',
    description: '',
    payment_method: '',
    location: '',
    sale_status: '',
  })

  useEffect(() => {
    const getProduct = async () => {
      try {
        axios.get(`${import.meta.env.VITE_API_URL}/products/${pid}`)
          .then((res) => {
            setProduct(res.data)
          })
      } catch (error) {
        
      }
    }

    getProduct()
  }, [])

  return (
    <div className="my-20">
      <div className="max-w-96 relative my-0 mx-auto">
        <div className="absolute top-2 left-3">
          <Link to='/'><IoIosArrowBack /></Link>
        </div>
        <img src={product.image} alt="product image" />
      </div>

      <div className="w-11/12 max-w-96 mt-3 mx-auto">
        <div>
          <p className="text-lg font-semibold">{product.product_name}</p>
        </div>
        <div>
          <p className=" text-lg font-semibold">${product.price}</p>
        </div>

        <Drawer>
          <DrawerTrigger>
            <div className="flex gap-1 my-2 text-[#5F5F5F]">
              <img src={CommentIcon} alt="icon" />
              <span className="text-xs">2件のコメント</span>
            </div>
          </DrawerTrigger>

          <DrawerContent className="bg-white" >
            <DrawerHeader>
              <DrawerTitle><p className="text-xl text-center">コメント</p></DrawerTitle>
            </DrawerHeader>
            <div className="w-80 my-0 mx-auto">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user2Pic} className="h-10" />
                </Avatar>
                <p>あお</p>
              </div>
              <div className="mt-2">
                <p>シミや汚れはありますか？</p>
                <div className="flex">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <span className="text-xs">1件の返信を表示</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="ml-5">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src={user1Pic} />
                            </Avatar>
                            <p>みどり</p>
                          </div>
                          <div className="mt-2">
                            <p>全くありません！未使用です。</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
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

        <div>
          <p className="text-sm">{product.description}</p>
        </div>
          
        <div className="flex flex-wrap justify-between gap-y-2 my-8 max-w-60">
          <p className="text-sm">商品の状態</p>
          <p className="min-w-32 bg-label-gray text-center py-1 px-2 rounded-sm text-xs">{product.product_status}</p>
          <p className="text-sm">受け渡し</p>
          <p className="min-w-32 bg-label-gray text-center py-1 px-2 rounded-sm text-xs">{product.location}</p>
          <p className="text-sm">支払い方法</p>
          <p className="min-w-32 bg-label-gray text-center py-1 px-2 rounded-sm text-xs">{product.payment_method}</p>
        </div>

        <div className="my-2 mx-auto w-fit">
          <Button variant="red" className="text-white font-medium px-20 rounded">購入手続きに進む</Button>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct