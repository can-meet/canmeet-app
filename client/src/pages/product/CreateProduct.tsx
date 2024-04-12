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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductSchema, productResolver } from "@/schema/product";
import { Label } from "@radix-ui/react-label";

const CreateProduct = () => {
  const form = useForm<ProductSchema>({
    defaultValues: {
      image: undefined,
      product_name: '',
      price: 0,
      description: '',
      product_status: '',
      location: '',
      payment_method: '',
    },
    resolver: productResolver,
  })

  const onSubmit: SubmitHandler<ProductSchema> = (values) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="container my-20 space-y-6">
      <FormField
        control={form.control}
        name="image"
        render={() => (
          <FormItem>
            <FormControl>
              <Input type="file" className="" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
          control={form.control}
          name="product_name"
          render={() => (
            <FormItem>
              <FormLabel>商品名</FormLabel>
              <FormControl>
                <Input type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={() => (
            <FormItem>
              <FormLabel>価格</FormLabel>
              <FormControl>
                <Input type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={() => (
            <FormItem>
              <FormLabel>説明</FormLabel>
              <FormControl>
                <Textarea />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="product_status"
          render={() => (
            <FormItem>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger><FormLabel>商品の状態</FormLabel></AccordionTrigger>
                    <FormControl>
                      <AccordionContent className="flex gap-2 overflow-scroll">
                        <Button>新品、未使用</Button>
                        <Button>未使用に近い</Button>
                        <Button>目立った傷や汚れなし</Button>
                        <Button>やや傷や汚れあり</Button>
                        <Button>傷や汚れあり</Button>
                        <Button>全体的に状態が悪い</Button>
                      </AccordionContent>
                    </FormControl>
                </AccordionItem>
              </Accordion>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={() => (
            <FormItem>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger><FormLabel>受け渡し場所</FormLabel></AccordionTrigger>
                      <FormControl>
                        <AccordionContent className="flex gap-2 overflow-scroll">
                          <Button>Vancouver</Button>
                          <Button>Burnaby</Button>
                          <Button>North Vancouver</Button>
                        </AccordionContent>
                      </FormControl>
                </AccordionItem>
              </Accordion>
            </FormItem>
          )}
        />

        <Button variant='blue' type="submit" className="w-full text-white">投稿する</Button>
      </form>
    </Form>
  )
}

export default CreateProduct