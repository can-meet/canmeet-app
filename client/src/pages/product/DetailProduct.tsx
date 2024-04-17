import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { IoIosArrowBack } from "react-icons/io";
import { CommentList } from "@/components/product/CommentList";
import { Loading } from "@/components/layout/Loading";
import { Comment } from "@/types/comment";


export type DetailProduct = {
  _id: string;
  product_name: string,
  price: number,
  image: string,
  product_status: string,
  description: string,
  payment_method: string,
  location: string,
  sale_status: string,
  userId: string,
  comments: Comment[],
}


const DetailProduct = () => {
  const { pid } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<DetailProduct>({
    _id: '',
    product_name: '',
    price: 0,
    image: '',
    product_status: '',
    description: '',
    payment_method: '',
    location: '',
    sale_status: "売り出し中",
    userId : '',
    comments: [],
  })

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/products/${pid}`)
          .then((res) => {
            setProduct(res.data)
            setLoading(false);
          })
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getProduct()
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }

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

        <CommentList
          product={product}
        />

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