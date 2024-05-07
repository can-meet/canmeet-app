import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductSchema, productResolver } from "@/schema/product";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productImagesUpload } from "@/lib/productImagesUpload"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Modal } from "@/components/layout/Modal";
import editCompleteImage from "/edit-product-completed.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

const EditProduct = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [productImages, setProductImages] = useState<string[]>([]);
  const form = useForm<ProductSchema>({
    defaultValues: {
      userId: '',
      images: [''],
      product_name: '',
      price: '',
      description: '',
      product_status: '',
      location: '',
      payment_method: '',
    },
    resolver: productResolver,
  })
  const navigate = useNavigate()
  const { pid } = useParams()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${pid}`)
        const data = res.data;
        const formattedPrice = data.price.toString();
        setProductImages(data.images);
        form.reset({
          userId: currentUser?._id,
          images: data.images,
          product_name: data.product_name,
          price: formattedPrice,
          description: data.description,
          product_status: data.product_status,
          location: data.location,
          payment_method: data.payment_method,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getProduct()
  }, [])

  const onSubmit: SubmitHandler<ProductSchema> = async (value) => {
    setLoading(true);
    try {
      const concatenatedImages = [...productImages, ...value.images]
      const existingImages = concatenatedImages.filter((img: string | File) => typeof img === 'string')
      const newUploadedImages = concatenatedImages.filter((img: string | File) => typeof img === 'object')

      const cloudinaryUrls = await productImagesUpload(newUploadedImages);
      const updatedImages = [...existingImages, ...cloudinaryUrls]
      form.setValue('images', updatedImages);

      if(currentUser) {
        form.setValue('userId', currentUser._id);
      }
      const updatedValues = form.getValues();
      await form.trigger();
      await axios.put(`${import.meta.env.VITE_API_URL}/products/${pid}`, updatedValues);
      toast.success('Successfully updated your product');
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleDeleteImages = (index: number) => {
    const updatedImages = [...productImages];
    updatedImages.splice(index, 1);
    setProductImages(updatedImages);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container pb-20 space-y-5 text-stepbar-black relative"
        >
        <div className="flex justify-between text-center pt-16">
          <button onClick={() => navigate(-1)}><IoIosArrowBack className='text-xl'/></button>
          <h3 className="text-2xl font-medium">投稿の編集</h3>
          <div></div>
        </div>
        <div>
          {/* <Carousel>
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index} className="flex justify-center">
                  <div className="relative">
                    <button>
                      <RiDeleteBin6Line className="absolute top-2 left-2 text-white bg-chat-gray rounded-full p-1 text-xl" />
                    </button>
                    <img src={image} alt="product image" className='max-h-48' />
                  </div>
                </CarouselItem>)
              )}
            </CarouselContent>
            {product.images.length > 1 ? (
              <>
                <CarouselPrevious className="absolute top-1/2 left-2 text-white" />
                <CarouselNext className="absolute top-1/2 right-2 text-white" />
              </>
            ) : null}
          </Carousel> */}
        </div>
        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormControl>
                <>
                  <Carousel>
                    <CarouselContent className="relative">
                      <>
                        {productImages.map((image: string, index: number) => (
                          <CarouselItem key={index} className="flex justify-center">
                            <button type="button" onClick={() => handleDeleteImages(index)} className="relative">
                              <RiDeleteBin6Line className="absolute top-2 left-2 text-white bg-chat-gray rounded-full p-1 text-xl" />
                            </button>
                            <img src={image} alt="product image" className='max-h-48' />
                          </CarouselItem>)
                        )}
                      </>
                    </CarouselContent>
                    <CarouselPrevious type="button" className="absolute top-1/2 left-4 z-50 text-white" />
                    <CarouselNext type="button" className="absolute top-1/2 right-4 z-50 text-white" />
                  </Carousel>
                  <input
                    type="file"
                    multiple
                    accept=".png, .jpg, .jpeg"
                    {...form.register("images")}
                  />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="product_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal my-2">タイトル</FormLabel>
                <FormControl>
                  <Input 
                    type="text" 
                    className="rounded bg-zinc-50 md:visible" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal my-2">値段</FormLabel>
                <FormControl>
                  <Input
                    type="number" 
                    className="rounded bg-zinc-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal my-2">説明</FormLabel>
                <FormControl>
                  <Textarea 
                    className="rounded bg-zinc-50" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4 py-4">
          <FormField
            control={form.control}
            name="product_status"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-40 bg-select-gray border-none">
                      <SelectValue placeholder="商品の状態" />
                    </SelectTrigger>
                    <SelectContent className="bg-select-gray border-none">
                      <SelectItem value="新品、未使用">新品、未使用</SelectItem>
                      <SelectItem value="未使用に近い">未使用に近い</SelectItem>
                      <SelectItem value="目立った傷や汚れなし">目立った傷や汚れなし</SelectItem>
                      <SelectItem value="やや傷や汚れあり">やや傷や汚れあり</SelectItem>
                      <SelectItem value="全体的に状態が悪い">全体的に状態が悪い</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-40 bg-select-gray border-none">
                        <SelectValue placeholder="受け渡し場所" />
                      </SelectTrigger>
                      <SelectContent className="bg-select-gray border-none max-h-32">
                          <SelectItem value="Vancouver">Vancouver</SelectItem>
                          <SelectItem value="North Vancouver">North Vancouver</SelectItem>
                          <SelectItem value="West Vancouver">West Vancouver</SelectItem>
                          <SelectItem value="Richmond">Richmond</SelectItem>
                          <SelectItem value="Surrey">Surrey</SelectItem>
                          <SelectItem value="Coquitlam">Coquitlam</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="payment_method"
            render={({ field }) => (
              <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-40 bg-select-gray border-none">
                        <SelectValue placeholder="支払い方法" />
                      </SelectTrigger>
                      <SelectContent className="bg-select-gray border-none">
                        <SelectItem value="e-transfer">e-transfer</SelectItem>
                        <SelectItem value="現金">現金</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
              </FormItem>
            )}
          />
          </div>

          <Button
            variant='blue'
            type="submit"
            // disabled={form.formState.isValid}
            className="w-full text-white"
          >
            編集を完了する
          </Button>
        </form>
      </Form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => navigate("/")}
        heading={"編集が完了しました！"}
        img={editCompleteImage}
        text={"商品の編集が完了しました！自分の編集した商品を見てみましょう。"}
        link={`/products/${pid}`}
        btnText={"たった今編集した商品を見る"}
      />
    </>
  )
}

export default EditProduct