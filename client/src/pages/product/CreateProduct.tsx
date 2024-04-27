import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
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

const CreateProduct = () => {
  const form = useForm<ProductSchema>({
    defaultValues: {
      userId: '6624580904e052d3586f145b',
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
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<ProductSchema> = async (value) => {
    console.log('value:',  value)
    const cloudinaryUrls = await productImagesUpload(value.images)
    form.setValue('images', cloudinaryUrls)
    setLoading(true)
    axios.post(`${import.meta.env.VITE_API_URL}/products`, value)
      .then(() => {
        toast.success('Successfully posted your product')
        navigate('/')
      })
      .catch(() => {
        toast.error("Failed to post your product. Try again.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} encType='multipart/form-data' className="container my-20 space-y-6 text-[#464646]">
      <FormField
        control={form.control}
        name="images"
        render={() => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input 
                type="file"
                multiple
                accept=".png, .jpg"
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
        <FormField
          control={form.control}
          name="product_status"
          render={({ field }) => (
            <FormItem>
              <Accordion type="single" collapsible className="px-2 rounded bg-[#f4f4f4]">
                <AccordionItem value="item-1">
                  <AccordionTrigger><FormLabel className="font-normal my-2">商品の状態</FormLabel></AccordionTrigger>
                    <FormControl>
                      <AccordionContent>
                        <ToggleGroup
                          type="single"
                          className="flex flex-wrap justify-start"
                          // {...form.register("product_status")}
                          // {...field}
                          onValueChange={field.onChange}
                          
                        >
                          <ToggleGroupItem value="新品、未使用" aria-label="Toggle 新品、未使用">
                            新品、未使用
                          </ToggleGroupItem>
                          <ToggleGroupItem value="未使用に近い" aria-label="Toggle 未使用に近い">
                            未使用に近い
                          </ToggleGroupItem>
                          <ToggleGroupItem value="目立った傷や汚れなし" aria-label="Toggle 目立った傷や汚れなし">
                            目立った傷や汚れなし
                          </ToggleGroupItem>
                          <ToggleGroupItem value="やや傷や汚れあり" aria-label="Toggle やや傷や汚れあり">
                            やや傷や汚れあり
                          </ToggleGroupItem>
                          <ToggleGroupItem value="全体的に状態が悪い" aria-label="Toggle 全体的に状態が悪い">
                            全体的に状態が悪い
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </AccordionContent>
                    </FormControl>
                </AccordionItem>
              </Accordion>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <Accordion type="single" collapsible className="bg-[#f4f4f4] px-2 rounded">
                <AccordionItem value="item-1">
                  <AccordionTrigger><FormLabel className="font-normal my-2">受け渡し場所</FormLabel></AccordionTrigger>
                      <FormControl>
                        <AccordionContent className="flex gap-2 flex-wrap">
                          <ToggleGroup
                            type="single"
                            className="flex flex-wrap justify-start"
                            onValueChange={field.onChange}
                          >
                            <ToggleGroupItem value="Vancouver" aria-label="Toggle vancouver">
                              Vancouver
                            </ToggleGroupItem>
                            <ToggleGroupItem value="Burnaby" aria-label="Toggle burnaby">
                              Burnaby
                            </ToggleGroupItem>
                            <ToggleGroupItem value="North Vancouver" aria-label="Toggle north-vancouver">
                              North Vancouver
                            </ToggleGroupItem>
                            <ToggleGroupItem value="West Vancouver" aria-label="Toggle west-vancouver">
                              West Vancouver
                            </ToggleGroupItem>
                            <ToggleGroupItem value="Richmond" aria-label="Toggle richmond">
                              Richmond
                            </ToggleGroupItem>
                            <ToggleGroupItem value="Surrey" aria-label="Toggle surrey">
                              Surrey
                            </ToggleGroupItem>
                            <ToggleGroupItem value="Coquitlam" aria-label="Toggle coquitlam">
                              Coquitlam
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </AccordionContent>
                      </FormControl>
                </AccordionItem>
              </Accordion>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payment_method"
          render={({ field }) => (
            <FormItem>
              <Accordion type="single" collapsible className="bg-[#f4f4f4] px-2 rounded">
                <AccordionItem value="item-1">
                  <AccordionTrigger><FormLabel className="font-normal my-2">支払い方法</FormLabel></AccordionTrigger>
                      <FormControl>
                        <AccordionContent className="flex gap-2 flex-wrap">
                          <ToggleGroup
                            type="single"
                            className="flex flex-wrap justify-start"
                            onValueChange={field.onChange}
                          >
                            <ToggleGroupItem value="e-transfer" aria-label="Toggle e-transfer">
                              e-transfer
                            </ToggleGroupItem>
                            <ToggleGroupItem value="現金" aria-label="Toggle cash">
                              現金
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </AccordionContent>
                      </FormControl>
                </AccordionItem>
              </Accordion>
            </FormItem>
          )}
        />

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