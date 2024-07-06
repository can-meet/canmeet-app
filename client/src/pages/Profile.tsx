import { Loading } from '@/components/layout/loading/Loading'
import { ProductList } from '@/components/product/ProductList'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  ProfileSelectTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetUser } from '@/hooks/user/useGetUser'
import { useUpdateUser } from '@/hooks/user/useUpdateUser'
import { useAuthStore } from '@/store/authStore'
import type { ProductType } from '@/types/product'
import { useState } from 'react'
import { FiEdit3 } from "react-icons/fi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export const Profile = () => {
  const [selectedFilterPosts, setSelectedFilterPosts] =
    useState<string>('すべて')
  const [selectedFilterPurchases, setSelectedFilterPurchases] =
    useState<string>('すべて')
  const { currentUser } = useAuthStore()
  const { form, onSubmit, isEditing, setIsEditing } = useUpdateUser()
  const { user, isLoading } = useGetUser()
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const filterProducts = (products: ProductType[], selectedFilter: string) => {
    return products.filter(product => {
      if (selectedFilter === 'すべて') {
        return true
      }
      if (selectedFilter === '売り出し中') {
        return product.sale_status === '売り出し中'
      }
      if (selectedFilter === '取引中') {
        return product.sale_status === '取引中'
      }
      if (selectedFilter === '売り切れ') {
        return product.sale_status === '売り切れ'
      }
    })
  }

  const filteredPostedProducts = filterProducts(
    user?.postedProducts ?? [],
    selectedFilterPosts,
  )
  const filteredPurchasedProducts = filterProducts(
    user?.purchasedProducts ?? [],
    selectedFilterPurchases,
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='mt-20 mb-12 flex flex-col items-center justify-center'>
      <div className='relative'>
        <Avatar className='object-cover w-20 h-20'>
          <AvatarImage
            src={
              currentUser?.profilePicture ||
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
          />
          <AvatarFallback>PROFILE IMAGE</AvatarFallback>
        </Avatar>
      </div>

      {isEditing ? (
        <form
          className='my-4 flex gap-2 relative'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <input
            type='text'
            {...form.register('username', { required: true })}
            className='border px-2 py-1 rounded-md bg-default-white focus:border-2 focus:outline-none focus:border-secondary-gray'
          />
          <button
            type='submit'
            className='absolute top-1 right-0 z-10 px-1.5 py-0.5 rounded'
          >
            <IoCheckmarkCircleOutline
              onClick={() => setIsEditing(true)}
              className='text-xl cursor-pointer'
            />
          </button>
        </form>
      ) : (
        <h2 className='my-4 flex items-center gap-1.5'>
          {currentUser?.username}
          <FiEdit3
            onClick={() => setIsEditing(true)}
            className='cursor-pointer'
          />
        </h2>
      )}

      <Tabs defaultValue='sale' className='max-w-96 w-11/12 mx-auto'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='sale' className='border-b-secondary-gray'>
            投稿した商品
          </TabsTrigger>
          <TabsTrigger value='purchase'>購入した商品</TabsTrigger>
        </TabsList>
        <TabsContent value='sale' className='mt-6 w-full mx-auto'>
          <Select
            onValueChange={value => setSelectedFilterPosts(value)}
            value={selectedFilterPosts}
            onOpenChange={(open) => setIsSelectOpen(open)}
          >
            <ProfileSelectTrigger className='py-1 px-2 w-fit bg-dark-gray text-default-white mb-4'>
              <SelectValue placeholder='すべて' className='font-normal' />
            </ProfileSelectTrigger>
            <SelectContent className='w-16 z-50 bg-default-white'>
              <SelectItem value='すべて'>すべて</SelectItem>
              <SelectItem value='売り出し中'>売り出し</SelectItem>
              <SelectItem value='取引中'>取引中</SelectItem>
              <SelectItem value='売り切れ'>売り切れ</SelectItem>
            </SelectContent>
          </Select>
          <div className={isSelectOpen ? 'pointer-events-none' : ''}>
            <ProductList products={filteredPostedProducts} />
          </div>
        </TabsContent>
        <TabsContent value='purchase' className='mt-6'>
          <Select
            onValueChange={value => setSelectedFilterPurchases(value)}
            value={selectedFilterPurchases}
            onOpenChange={(open) => setIsSelectOpen(open)}
          >
            <ProfileSelectTrigger className='py-1 px-2 w-fit bg-dark-gray text-default-white mb-4'>
              <SelectValue placeholder='すべて' className='font-normal' />
            </ProfileSelectTrigger>
            <SelectContent className='w-20 z-50 bg-white'>
              <SelectItem value='すべて'>すべて</SelectItem>
              <SelectItem value='売り出し中'>売り出し</SelectItem>
              <SelectItem value='取引中'>取引中</SelectItem>
              <SelectItem value='売り切れ'>売り切れ</SelectItem>
            </SelectContent>
          </Select>
          <div className={isSelectOpen ? 'pointer-events-none' : ''}>
            <ProductList products={filteredPurchasedProducts} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
