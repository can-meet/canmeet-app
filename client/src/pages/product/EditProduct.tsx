import { Modal } from '@/components/layout/Modal'
import { Loading } from '@/components/layout/loading/Loading'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { productImagesUpload } from '@/lib/productImagesUpload'
import { type ProductSchema, productResolver } from '@/schema/product'
import { useAuthStore } from '@/store/authStore'
import axios from 'axios'
import { type ChangeEvent, useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'
import editCompleteImage from '/edit-product-completed.png'

const EditProduct = () => {
  const { currentUser } = useAuthStore()
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const form = useForm<ProductSchema>({
    defaultValues: {
      userId: '',
      images: [''],
      product_name: '',
      price: 0,
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
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${pid}`,
        )
        const data = res.data
        setPreviewImages(data.images)
        form.reset({
          userId: currentUser?._id,
          images: data.images,
          product_name: data.product_name,
          price: data.price,
          description: data.description,
          product_status: data.product_status,
          location: data.location,
          payment_method: data.payment_method,
        })
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    getProduct()
  }, [currentUser?._id, form.reset, pid])

  const onSubmit: SubmitHandler<ProductSchema> = async value => {
    setLoading(true)
    try {
      const currentImages = [...value.images]
      const existingImages = currentImages.filter(
        (img): img is string => typeof img === 'string',
      )
      const newUploadedImages = currentImages.filter(
        (img): img is File => typeof img === 'object',
      )

      const cloudinaryUrls = await productImagesUpload(newUploadedImages)
      const updatedImages = [...existingImages, ...cloudinaryUrls]
      form.setValue('images', updatedImages)

      if (currentUser) {
        form.setValue('userId', currentUser._id)
      }
      const updatedValues = form.getValues()
      await form.trigger()
      await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${pid}`,
        updatedValues,
      )
      setIsModalOpen(true)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to edit your product. Try again.',
        description: 'Please try again later.',
      })
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const previewUrls = Array.from(files || []).map(file =>
      URL.createObjectURL(file),
    )
    const concatenatedImages = [...previewImages, ...previewUrls]
    setPreviewImages(concatenatedImages)
    form.setValue('images', [
      ...form.getValues('images'),
      ...Array.from(files || []),
    ])
  }

  const handleDeleteImages = (index: number) => {
    const updatedPreviewImages = previewImages.filter((_, i) => i !== index)
    setPreviewImages(updatedPreviewImages)

    const updatedFormImages = form
      .getValues('images')
      .filter((_: File | string, i: number) => i !== index)
    form.setValue('images', updatedFormImages)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className='max-w-96 mx-auto mt-20 mb-24 px-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='images'
            render={() => (
              <FormItem>
                <FormControl>
                  <>
                    <Carousel>
                      <CarouselContent className='relative mb-5'>
                        <>
                          {previewImages.map((image: string, index: number) => (
                            <CarouselItem
                              key={image}
                              className='flex justify-center'
                            >
                              <button
                                onClick={() => handleDeleteImages(index)}
                                type='button'
                                className='relative'
                              >
                                <RiDeleteBin6Line className='absolute top-2 left-2 text-default-black bg-chat-gray rounded-full p-1 text-2xl' />
                              </button>
                              <img
                                src={image}
                                alt='product'
                                className='w-48 h-48 object-cover'
                              />
                            </CarouselItem>
                          ))}
                        </>
                        <CarouselItem className='relative'>
                          <label className='w-1/2 min-h-48 mx-auto h-full cursor-pointer hover:opacity-80 flex justify-center items-center border-dashed border-2 border-slate-400 text-slate-600 overflow-hidden'>
                            <input
                              type='file'
                              multiple
                              accept='image/*'
                              {...form.register('images')}
                              onChange={e => handleAddImage(e)}
                              className='hidden'
                            />
                            <div className='font-light'>画像を追加する</div>
                          </label>
                        </CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious
                        type='button'
                        className='absolute top-1/2 left-4 z-20 text-white'
                      />
                      <CarouselNext
                        type='button'
                        className='absolute top-1/2 right-4 z-20 text-white'
                      />
                    </Carousel>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='product_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-normal my-2'>タイトル</FormLabel>
                <span className='text-primary-red'>*</span>
                <FormControl>
                  <Input type='text' className='rounded' {...field} />
                </FormControl>
                <FormMessage className='w-button text-xs text-primary-red' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-normal my-2'>値段</FormLabel>
                <span className='text-primary-red'>*</span>
                <FormControl>
                  <Input
                    type='number'
                    className='rounded w-52'
                    {...field}
                    onChange={e => {
                      const value = Number.parseInt(e.target.value, 10)
                      form.setValue('price', value)
                    }}
                  />
                </FormControl>
                <FormMessage className='w-button text-xs text-primary-red' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-normal my-2'>説明</FormLabel>
                <span className='text-primary-red'>*</span>
                <FormControl>
                  <Textarea
                    className='rounded h-32 border-0.25 border-secondary-gray'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='space-y-4 pt-2'>
            <FormField
              control={form.control}
              name='product_status'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className='bg-select-gray border-none'>
                        <SelectValue placeholder='商品の状態' />
                        <span className='text-primary-red'>*</span>
                      </SelectTrigger>
                      <SelectContent className='bg-select-gray border-none max-h-32'>
                        <SelectItem value='新品、未使用'>
                          新品、未使用
                        </SelectItem>
                        <SelectItem value='未使用に近い'>
                          未使用に近い
                        </SelectItem>
                        <SelectItem value='目立った傷や汚れなし'>
                          目立った傷や汚れなし
                        </SelectItem>
                        <SelectItem value='やや傷や汚れあり'>
                          やや傷や汚れあり
                        </SelectItem>
                        <SelectItem value='全体的に状態が悪い'>
                          全体的に状態が悪い
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className='w-button text-xs text-primary-red' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className='bg-select-gray border-none'>
                        <SelectValue placeholder='受け渡し場所' />
                        <span className='text-primary-red'>*</span>
                      </SelectTrigger>
                      <SelectContent className='bg-select-gray border-none max-h-32'>
                        <SelectItem value='Vancouver'>Vancouver</SelectItem>
                        <SelectItem value='North Vancouver'>
                          North Vancouver
                        </SelectItem>
                        <SelectItem value='West Vancouver'>
                          West Vancouver
                        </SelectItem>
                        <SelectItem value='Richmond'>Richmond</SelectItem>
                        <SelectItem value='Burnaby'>Burnaby</SelectItem>
                        <SelectItem value='Surrey'>Surrey</SelectItem>
                        <SelectItem value='Coquitlam'>Coquitlam</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className='w-button text-xs text-primary-red' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='payment_method'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className='bg-select-gray border-none'>
                        <SelectValue placeholder='支払い方法' />
                        <span className='text-primary-red'>*</span>
                      </SelectTrigger>
                      <SelectContent className='bg-select-gray border-none'>
                        <SelectItem value='e-transfer'>e-transfer</SelectItem>
                        <SelectItem value='現金'>現金</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className='w-button text-xs text-primary-red' />
                </FormItem>
              )}
            />
          </div>
          <div className='w-72 mx-auto pt-6'>
            <Button variant='blue' type='submit'>
              編集を完了する
            </Button>
          </div>
        </form>
      </Form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => navigate('/')}
        heading={'編集が完了しました！'}
        img={editCompleteImage}
        text={'商品の編集が完了しました！自分の編集した商品を見てみましょう。'}
        link={`/products/${pid}`}
        btnText={'たった今編集した商品を見る'}
      />
    </div>
  )
}

export default EditProduct
