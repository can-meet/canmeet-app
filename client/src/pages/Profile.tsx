import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	ProfileSelectTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { IoCreate } from "react-icons/io5";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { useAuthStore } from "@/store/authStore";
import { ProductType } from "@/types/product";
import { ProductList } from "@/components/product/ProductList";


export const Profile = () => {
	const [selectedFilterPosts, setSelectedFilterPosts] =
		useState<string>("すべて");
	const [selectedFilterPurchases, setSelectedFilterPurchases] =
		useState<string>("すべて");
	const { currentUser } = useAuthStore();
	const { form, onSubmit, isEditing, setIsEditing } = useUpdateUser();

	const filterProducts = (products: ProductType[], selectedFilter: string) => {
		return products.filter((product) => {
			if (selectedFilter === "すべて") {
				return true;
			} else if (selectedFilter === "売り出し中") {
				return product.sale_status === "売り出し中";
			} else if (selectedFilter === "取引中") {
				return product.sale_status === "取引中";
			} else if (selectedFilter === "売り切れ") {
				return product.sale_status === "売り切れ";
			}
		});
	};

	const filteredPostedProducts = filterProducts(
		currentUser?.postedProducts ?? [],
		selectedFilterPosts,
	);
	const filteredPurchasedProducts = filterProducts(
		currentUser?.purchasedProducts ?? [],
		selectedFilterPurchases,
	);

  return (
    <div className='mt-20 mb-12 flex flex-col items-center justify-center'>
      
      <div className="relative">
				<Avatar className="object-cover w-20 h-20" >
					<AvatarImage src={currentUser?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
					<AvatarFallback>PROFILE IMAGE</AvatarFallback>
				</Avatar>
			</div>

			{isEditing ? (
				<form className='my-4 flex gap-2 relative' onSubmit={form.handleSubmit(onSubmit)}>
					<input 
						type="text" 
						{...form.register('username', { required: true })}
						className="border px-2 py-1 rounded-md bg-default-white focus:border-2 focus:outline-none focus:border-secondary-gray"
					/>
					<button type="submit" className="absolute top-1 right-0 z-10 px-1.5 py-0.5 rounded">
						<IoCreate onClick={() => setIsEditing(true)} className="text-xl cursor-pointer" />
					</button>
				</form>
      ) : (
        <h2 className="my-4 flex items-center gap-1">
          {currentUser?.username}
          <BsPencilFill onClick={() => setIsEditing(true)} className="cursor-pointer" />
        </h2>
      )}

      <Tabs defaultValue='sale' className='max-w-96 w-80 mx-auto'>
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
          <ProductList products={filteredPostedProducts} />
        </TabsContent>
        <TabsContent value='purchase' className='mt-6'>
          <Select
            onValueChange={value => setSelectedFilterPurchases(value)}
            value={selectedFilterPurchases}
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
          <ProductList products={filteredPurchasedProducts} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
