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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productImagesUpload } from "@/lib/productImagesUpload"
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

const CreateProduct = () => {
  const form = useForm<ProductSchema>({
    defaultValues: {
      userId: '663044a8737c2c27e30c20cb',
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
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<ProductSchema> = async (value) => {
    setLoading(true);
    try {
      const imageFiles = value.images;
      const cloudinaryUrls = await productImagesUpload(imageFiles);
      form.setValue('images', cloudinaryUrls);
      const updatedValue = form.getValues();
  
      await form.trigger();
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, updatedValue);
      toast.success('Successfully posted your product');
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Failed to post your product: ${error.response.data.message}`);
      } else {
        toast.error("Failed to post your product. Try again.");
      }
      console.error("Submission errors:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="container my-20 space-y-5 text-stepbar-black">
      <FormField
        control={form.control}
        name="images"
        render={() => (
          <FormItem>
            <FormControl>
              <Input 
                type="file"
                multiple
                accept=".png, .jpg, .jpeg"
                className="rounded bg-zinc-50"
                {...form.register("images")}
              />
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
                <Select onValueChange={field.onChange}>
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
                  <Select onValueChange={field.onChange}>
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
                  <Select onValueChange={field.onChange}>
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
          className="w-full text-white"
        >
          投稿する
        </Button>
      </form>
    </Form>
  )
}

export default CreateProduct