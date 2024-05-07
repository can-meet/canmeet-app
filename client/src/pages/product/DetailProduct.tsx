import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosArrowBack } from "react-icons/io";
import { CommentList } from "@/components/product/CommentList";
import { Loading } from "@/components/layout/Loading";
import { Comment } from "@/types/comment";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { timeAgo } from "@/lib/timeAgo";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { Modal } from "@/components/layout/Modal";
import purchaseCompletedImage from "/purchase-product.png";


export type DetailProduct = {
  _id: string;
  product_name: string,
  price: number,
  images: string[],
  product_status: string,
  description: string,
  payment_method: string,
  location: string,
  sale_status: string,
  user: {
    _id: string;
    username: string, 
    profilePicture: string,
  },
  comments: Comment[],
  createdAt: string
}

const DetailProduct = () => {
  const navigate = useNavigate();
  const { pid } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<DetailProduct>({
    _id: '',
    product_name: '',
    price: 0,
    images: [],
    product_status: '',
    description: '',
    payment_method: '',
    location: '',
    sale_status: "売り出し中",
    user: {
      _id: '',
      username: '', 
      profilePicture: '',
    },
    comments: [],
    createdAt: new Date().toISOString()
  })
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dynamicRoomRoute, setDynamicRoomRoute] = useState('/');

  const { currentUser } = useSelector((state: RootState) => state.user);

  const userId = currentUser?._id;
  const productUserId = product.user._id;

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${pid}`)
        setProduct(response.data)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getProduct()
  }, [])

  
  const handlePurchaseProductAndCreateRoom = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    } 
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/products/purchase/${pid}`, { userId })

      await axios.post(`${import.meta.env.VITE_API_URL}/notifications/purchase/${pid}`, {  // 商品を購入した際の通知
        receiverId: productUserId,
        senderId: userId
      })  
        
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/rooms`, {
        productId: pid,
        buyerId: userId,
        sellerId: productUserId,
      });

      const roomId = response.data._id;
      setDynamicRoomRoute(`/rooms/${roomId}`);   // modalを開く前のリロードがむずい

      // リロード前にローカルストレージに必要な情報を保存する
      localStorage.setItem('shouldOpenModal', 'true');
      localStorage.setItem('roomId', roomId);

      // ページをリロード
      navigate(0)

    } catch (error) {
      console.log(error);
    }
  }

  // コンポーネントのマウント時に、ローカルストレージからモーダル開閉の情報を取得する
  useEffect(() => {
    setLoading(true);
    const shouldOpenModal = localStorage.getItem('shouldOpenModal');
    const roomId = localStorage.getItem('roomId');

    if (shouldOpenModal === 'true') {
      setIsModalOpen(true);
      setDynamicRoomRoute(`/rooms/${roomId}`);

      // ローカルストレージから不要な情報を削除する
      localStorage.removeItem('shouldOpenModal');
      localStorage.removeItem('roomId');
    }
    setLoading(false);
  }, []);


  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <div className="my-20">
        <div className="max-w-96 my-0 mx-auto">
          <div className="flex justify-between items-center mx-3 my-2">
            <button onClick={() => navigate(-1)}><IoIosArrowBack className='text-xl'/></button>
            <div><IoEllipsisHorizontal className='text-xl' /></div>
          </div>
          <div className='relative'>
            <img src={product.images[0]} alt="product image" className='' />
            {product.sale_status === '売り出し中' ? (
              <div>
                <p className='absolute top-1.5 right-2 z-10 text-lg'>売り出し</p>
                <div className='absolute top-0 right-0 border-sale w-28 h-36 bg-sale opacity-95 clip-path'></div>
              </div>
            ) : product.sale_status === '取引中' ? (
              <div>
                <p className='absolute top-1.5 right-2 z-10 text-lg'>取引中</p>
                <div className='absolute top-0 right-0 border-in-trade w-28 h-36 bg-in-trade opacity-95 clip-path'></div>
              </div>
            ) : (
              <div>
                <p className='absolute top-1.5 right-2 z-10 text-lg'>売り切れ</p>
                <div className='absolute top-0 right-0 border-sold-out w-28 h-36 bg-sold-out opacity-95 clip-path'></div>
              </div>
            )}
          </div>
          
        </div>

        <div className="w-11/12 max-w-96 mt-3 mx-auto">
          <div>
            <p className="text-lg font-semibold">{product.product_name}</p>
          </div>
          <div>
            <p className=" text-lg font-semibold">${product.price}</p>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
              <Avatar className="my-2 rounded-full object-cover cursor-pointer self-center">
                <AvatarImage src={product.user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
                <AvatarFallback>USER IMAGE</AvatarFallback>
              </Avatar>
              <div>{product.user.username}</div>
            </div>
            <div className='text-sm text-secondary-gray'>
              投稿日 : {timeAgo(product.createdAt)}
            </div>
          </div>
          

          <div className='mb-2'>
            <p className="text-sm">{product.description}</p>
          </div>

          <CommentList
            product={product}
          />
          
          <div className="flex flex-wrap justify-between gap-y-2 mt-4 mb-8 max-w-60">
            <p className="text-sm">商品の状態</p>
            <p className="min-w-32 bg-label-gray text-center py-1 px-2 rounded-sm text-xs">{product.product_status}</p>
            <p className="text-sm">受け渡し</p>
            <p className="min-w-32 bg-label-gray text-center py-1 px-2 rounded-sm text-xs">{product.location}</p>
            <p className="text-sm">支払い方法</p>
            <p className="min-w-32 bg-label-gray text-center py-1 px-2 rounded-sm text-xs">{product.payment_method}</p>
          </div>

          {product.user._id !== currentUser?._id && (
            <div className="my-2 mx-auto w-fit">
              {product.sale_status === '売り出し中' ? (
                <Button 
                  variant="red" 
                  className="text-white font-medium px-20 rounded"
                  onClick={handlePurchaseProductAndCreateRoom}
                >
                  購入手続きに進む
                </Button>
              ) : (
                <Button 
                  variant="disabled" 
                  className="text-white font-medium px-20 rounded"
                >
                  取引中
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        heading={"購入手続きを申し込みました"}
        img={purchaseCompletedImage}
        text={"投稿者に購入の申し込みを知らせるメッセージが送られました！ひとこと挨拶をしてみましょう。"}
        link={dynamicRoomRoute}
        btnText={"DMへあいさつしに行く"}
      />
    </>
  )
}

export default DetailProduct