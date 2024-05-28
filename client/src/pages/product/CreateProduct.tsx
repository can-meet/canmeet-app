import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productImagesUpload } from "@/lib/productImagesUpload"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Modal } from "@/components/layout/Modal";
import postCompleteImage from "/post-product-completed.png";
import { useToast } from "@/components/ui/use-toast";
import { Loading } from "@/components/layout/loading/Loading";
import { RiDeleteBin6Line } from "react-icons/ri";

const CreateProduct = () => {
	const { currentUser } = useSelector((state: RootState) => state.user);
  const form = useForm<ProductSchema>({
    mode: "onChange",
    defaultValues: {
      userId: '',
      images: [],
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
	const { toast } = useToast()
  const [pid, setPid] = useState<string>('');
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const onSubmit: SubmitHandler<ProductSchema> = async (value) => {
    setLoading(true);
    try {
      const imageFiles = value.images;
      const cloudinaryUrls = await productImagesUpload(imageFiles);
      form.setValue('images', cloudinaryUrls);
      if(currentUser) {
        form.setValue('userId', currentUser._id);
      }
      
      const updatedValue = form.getValues();
  
      await form.trigger();
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/products`, updatedValue);
      setPid(res.data._id);
      setIsModalOpen(true)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast({
          variant: "destructive",
          description: `${error.response.data.message}`,
        })
      } else {
        toast({
					variant: "destructive",
          title: `Failed to post your product. Try again.`,
          description: "Please try again later.",
        })
      }
      console.error("Submission errors:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const previewUrls = Array.from(files || []).map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...previewUrls]);

    const updatedImages = [...(form.getValues('images') || []), ...Array.from(files || [])];
    form.setValue('images', updatedImages);
  };
  
  const handleDeleteImages = (index: number) => {
    const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedPreviewImages);

    const updatedFormImages = form.getValues('images').filter((_: File | string, i: number) => i !== index);
    form.setValue('images', updatedFormImages);
  };

  if (loading) {
		return <Loading />;
	}

  return (
    <div className="max-w-96 mx-auto mt-20 mb-32 px-4">
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6 relative">
        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormControl>
              <Carousel>
                <CarouselContent className="relative">
                  <>
                    {previewImages.map((url, index) => (
                      <CarouselItem key={index} className="flex justify-center">
                        <div className="relative">
                          <div onClick={() => handleDeleteImages(index)}>
                            <RiDeleteBin6Line className="absolute top-2 left-2 text-default-black bg-chat-gray rounded-full p-1 text-2xl" />
                          </div>
                          <img src={url} alt={`Preview ${index}`} className='w-48 h-48 object-cover' />
                        </div>
                      </CarouselItem>
                    ))}
                    <CarouselItem>
                      <label className="w-1/2 min-h-48 mx-auto h-full cursor-pointer hover:opacity-80 flex justify-center items-center border-dashed border-2 border-slate-400 text-slate-600 overflow-hidden">
                        <Input 
                          type="file"
                          multiple
                          accept=".png, .jpg, .jpeg"
                          className="hidden"
                          {...form.register("images")}
                          onChange={(e) => handleAddImages(e)}
                        />
                        <div className="text-sm font-light">画像を追加する</div>
                      </label>
                    </CarouselItem>
                  </>
                </CarouselContent>
                <CarouselPrevious type="button" className="absolute top-1/2 left-4 z-20 text-white" />
                <CarouselNext type="button" className="absolute top-1/2 right-4 z-20 text-white" />
              </Carousel>
              </FormControl>
              <FormMessage className="w-button text-xs text-primary-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="product_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal my-2">タイトル</FormLabel>
              <span className="text-primary-red">*</span>
              <FormControl>
                <Input 
                  type="text" 
                  className="rounded" 
                  {...field}
                />
              </FormControl>
              <FormMessage className="w-button text-xs text-primary-red" />
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal my-2">値段</FormLabel>
                <span className="text-primary-red">*</span>
                <FormControl>
                  <Input
                    type="number" 
                    className="rounded w-52"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="w-button text-xs text-primary-red" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal my-2">説明</FormLabel>
                <span className="text-primary-red">*</span>
                <FormControl>
                  <Textarea 
                    className="rounded h-32 border-0.25 border-secondary-gray" 
                    {...field}
                  />
                </FormControl>
                <FormMessage className="w-button text-xs text-primary-red" />
              </FormItem>
            )}
          />
          <div className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="product_status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="bg-select-gray border-none">
                        <SelectValue placeholder="商品の状態" />
                        <span className="text-primary-red">*</span>
                      </SelectTrigger>
                      <SelectContent className="bg-select-gray border-none max-h-32">
                        <SelectItem value="新品、未使用">新品、未使用</SelectItem>
                        <SelectItem value="未使用に近い">未使用に近い</SelectItem>
                        <SelectItem value="目立った傷や汚れなし">目立った傷や汚れなし</SelectItem>
                        <SelectItem value="やや傷や汚れあり">やや傷や汚れあり</SelectItem>
                        <SelectItem value="全体的に状態が悪い">全体的に状態が悪い</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="w-button text-xs text-primary-red" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="bg-select-gray border-none">
                          <SelectValue placeholder="受け渡し場所" />
                          <span className="text-primary-red">*</span>
                        </SelectTrigger>
                        <SelectContent className="bg-select-gray border-none max-h-32">
                            <SelectItem value="Vancouver">Vancouver</SelectItem>
                            <SelectItem value="North Vancouver">North Vancouver</SelectItem>
                            <SelectItem value="West Vancouver">West Vancouver</SelectItem>
                            <SelectItem value="Richmond">Richmond</SelectItem>
                            <SelectItem value="Burnaby">Burnaby</SelectItem>
                            <SelectItem value="Surrey">Surrey</SelectItem>
                            <SelectItem value="Coquitlam">Coquitlam</SelectItem>
                            <SelectItem value="その他">その他</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="w-button text-xs text-primary-red" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="bg-select-gray border-none">
                          <SelectValue placeholder="支払い方法" />
                          <span className="text-primary-red">*</span>
                        </SelectTrigger>
                        <SelectContent className="bg-select-gray border-none">
                          <SelectItem value="e-transfer">e-transfer</SelectItem>
                          <SelectItem value="現金">現金</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="w-button text-xs text-primary-red" />
                </FormItem>
              )}
            />
          </div>
          <div className="w-72 mx-auto pt-6">
            <Button
              variant='blue'
              type="submit"
            >
              投稿する
            </Button>
          </div>
        </form>
      </Form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => navigate("/")}
        heading={"投稿が完了しました！"}
        img={postCompleteImage}
        text={"あなたの商品が投稿されました！自分の投稿した商品を見てみましょう。"}
        link={`/products/${pid}`}
        btnText={"自分が投稿した商品を見る"}
      />
    </div>
  )
}

export default CreateProduct