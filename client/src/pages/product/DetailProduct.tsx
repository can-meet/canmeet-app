import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "@/lib/api";
import PopupMenu from "@/components/product/popup-menu/PopupMenu";
import { useQuery, useQueryClient } from "react-query";
import type { DetailProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentList } from "@/components/product/comment/CommentList";
import { Loading } from "@/components/layout/loading/Loading";
import { timeAgo } from "@/lib/timeAgo";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Modal } from "@/components/layout/Modal";
import purchaseCompletedImage from "/purchase-product.png";
import editCompletedImage from "/edit-product-completed.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const DetailProduct = () => {
  const navigate = useNavigate();
  const { pid } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [saleStatus, setSaleStatus] = useState<string>('');
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [dynamicRoomRoute, setDynamicRoomRoute] = useState('/');

  const { currentUser } = useSelector((state: RootState) => state.user);
  const userId = currentUser?._id;

  const queryClient = useQueryClient();
  const products = queryClient.getQueryData<DetailProduct[]>('products') || [];

  const product = products?.find((p) => p._id === pid);
  const productUserId = product?.user._id;

  const { data: productDetail } = useQuery<DetailProduct>(
    ['product', pid],
    () => fetchProductById(pid),
    {
      enabled: !product,
      initialData: product,
    }
  )

  const productData = productDetail || product || {
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
  };

  useEffect(() => {
    setSaleStatus(productData.sale_status);
  }, [productData.sale_status]);

  const handlePurchaseProductAndCreateRoom = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    } 
    try {
      await Promise.all([
        axios.put(`${import.meta.env.VITE_API_URL}/products/purchase/${pid}`, { userId }),
        // 商品を購入した際の通知
        axios.post(`${import.meta.env.VITE_API_URL}/notifications/purchase/${pid}`, {
          receiverId: productUserId,
          senderId: userId
        })
      ])
        
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/rooms`, {
        productId: pid,
        buyerId: userId,
        sellerId: productUserId,
      });

      const roomId = response.data._id;
      setDynamicRoomRoute(`/rooms/${roomId}`);
      setSaleStatus('取引中')
      setIsPurchaseModalOpen(true)
    } catch (error) {
      console.log(error);
    }
  }

  // コンポーネントのマウント時に、ローカルストレージからモーダル開閉の情報を取得する
  useEffect(() => {
    setLoading(true);
    const shouldOpenEditModal = localStorage.getItem('shouldOpenEditModal');

    if(shouldOpenEditModal === 'true') {
      setIsEditModalOpen(true);
      // ローカルストレージから不要な情報を削除する
      localStorage.removeItem('shouldOpenEditModal');
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
      <div className="mt-16 mb-24">
        <div className="max-w-96 my-0 mx-auto">

          <PopupMenu product={productData} />

          <div className='relative'>
            <div>
              <Carousel className="relative">
                <CarouselContent>
                  {productData.images.map((image: string, index: number) => (
                    <CarouselItem key={index} className="">
                      <AspectRatio ratio={9/9} >
                        <img src={image} alt="product image" className='object-cover w-96 h-96 rounded-md' />
                      </AspectRatio>
                    </CarouselItem>)
                  )}
                </CarouselContent>
                {productData.images.length > 1 ? (
                  <>
                    <CarouselPrevious className="absolute top-1/2 left-2 text-default-white" />
                    <CarouselNext className="absolute top-1/2 right-2 text-default-white" />
                  </>
                ) : null}
              </Carousel>
            </div>
            {saleStatus === '売り出し中' ? (
              <div>
                <p className='absolute top-1.5 right-2 z-10 text-lg'>{saleStatus}</p>
                <div className='absolute top-0 right-0 border-sale w-28 h-36 bg-sale opacity-95 clip-path'></div>
              </div>
            ) : saleStatus === '取引中' ? (
              <div>
                <p className='absolute top-1.5 right-2 z-10 text-lg'>{saleStatus}</p>
                <div className='absolute top-0 right-0 border-in-trade w-28 h-36 bg-in-trade opacity-95 clip-path'></div>
              </div>
            ) : (
              <div>
                <p className='absolute top-1.5 right-2 z-10 text-lg'>{saleStatus}</p>
                <div className='absolute top-0 right-0 border-sold-out w-28 h-36 bg-sold-out opacity-95 clip-path'></div>
              </div>
            )}
          </div>
          
        </div>

        <div className="w-11/12 max-w-96 mt-3 mx-auto">
          <div>
            <p className="text-lg font-semibold">{productData.product_name}</p>
          </div>
          <div>
            <p className=" text-lg font-semibold">${productData.price}</p>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
              <Avatar className="mt-2 mb-3 rounded-full object-cover cursor-pointer self-center">
                <AvatarImage src={productData.user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
                <AvatarFallback>USER IMAGE</AvatarFallback>
              </Avatar>
              <div>{productData.user.username}</div>
            </div>
            <div className='text-sm text-secondary-gray'>
              投稿日 : {timeAgo(productData.createdAt)}
            </div>
          </div>
          

          <div className='mb-5'>
            <p className="text-sm">{productData.description}</p>
          </div>

          <CommentList
            product={productData}
          />

          <div className="grid grid-cols-2 mt-4 mb-8">
            <div className="col-span-1  w-80">
              <div className="flex mb-4">
                <span className="text-sm text-start w-24 py-2">商品の状態</span>
                <span className="text-xs font-medium bg-search-history-gray text-center px-3 py-2 rounded-sm">{productData.product_status}</span>
              </div>
              <div className="flex mb-4">
                <p className="text-sm w-24 py-2">受け渡し場所</p>
                <p className="text-xs font-medium bg-search-history-gray text-center px-3 py-2 rounded-sm">{productData.location}</p>
              </div>
              <div className="flex mb-4">
                <div className="text-sm w-24 py-2">支払い方法</div>
                <div className="text-xs font-medium bg-search-history-gray text-center px-3 py-2 rounded-sm">{productData.payment_method}</div>
              </div>
            </div>
          </div>

          {productData.user._id !== currentUser?._id && (
            <div className="my-2 mx-auto w-button">
              {productData.sale_status === '売り出し中' ? (
                <Button 
                  variant="red"
                  onClick={handlePurchaseProductAndCreateRoom}
                >
                  購入手続きに進む
                </Button>
              ) : (
                <Button 
                  variant="disabled" 
                >
                  取引中
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        heading={"購入手続きを申し込みました"}
        img={purchaseCompletedImage}
        text={"投稿者に購入の申し込みを知らせるメッセージが送られました！ひとこと挨拶をしてみましょう。"}
        link={dynamicRoomRoute}
        btnText={"DMへあいさつしに行く"}
      />
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        heading={"販売ステータスの変更が完了しました！"}
        img={editCompletedImage}
        text={"販売ステータスの変更が完了しました！自分の編集した商品を見てみましょう。"}
        link={`/products/${pid}`}
        btnText={"たった今ステータスを変更した商品を見る"}
      />
    </>
  )
}

export default DetailProduct