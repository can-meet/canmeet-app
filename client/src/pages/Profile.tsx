import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from "@/components/ui/avatar";
import {
	ProfileSelectTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProductList } from "@/components/product/ProductList";
import type { RootState } from "@/redux/store";
import type { Product } from "@/types/product";
import type { User } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loading } from "@/components/layout/loading/Loading";

export const Profile = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [selectedFilterPosts, setSelectedFilterPosts] =
		useState<string>("すべて");
	const [selectedFilterPurchases, setSelectedFilterPurchases] =
		useState<string>("すべて");
	const [user, setUser] = useState<User>({
		_id: "",
		username: "",
		email: "",
		password: "",
		profilePicture: "",
		isAdmin: false,
		postedProducts: [],
		purchasedProducts: [],
	});
	const { currentUser } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				if (currentUser) {
					const response = await axios.get(
						`${import.meta.env.VITE_API_URL}/users/${currentUser?._id}`,
					);
					setUser(response.data);
				}
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchUserData();
	}, []);

	const filterProducts = (products: Product[], selectedFilter: string) => {
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
		user.postedProducts,
		selectedFilterPosts,
	);
	const filteredPurchasedProducts = filterProducts(
		user.purchasedProducts,
		selectedFilterPurchases,
	);

	if (loading) {
		return <Loading />;
	}

  return (
    <div className='mt-20 mb-12 flex flex-col items-center justify-center'>
      
      <div className="relative">
				<Avatar className="object-cover w-20 h-20" >
					<AvatarImage src={user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
					<AvatarFallback>PROFILE IMAGE</AvatarFallback>
				</Avatar>
			</div>
      
			<h2 className="my-4">{user.username}</h2>

			<Tabs defaultValue="sale" className="max-w-96 w-80 mx-auto">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="sale" className="border-b-secondary-gray">
						投稿した商品
					</TabsTrigger>
					<TabsTrigger value="purchase">購入した商品</TabsTrigger>
				</TabsList>
				<TabsContent value="sale" className="mt-6 w-full mx-auto">
					<Select
						onValueChange={(value) => setSelectedFilterPosts(value)}
						value={selectedFilterPosts}
					>
						<ProfileSelectTrigger className="py-1 px-2 w-fit bg-dark-gray text-default-white mb-4">
							<SelectValue placeholder="すべて" className="font-normal" />
						</ProfileSelectTrigger>
						<SelectContent className="w-16 z-50 bg-default-white">
							<SelectItem value="すべて">すべて</SelectItem>
							<SelectItem value="売り出し中">売り出し</SelectItem>
							<SelectItem value="取引中">取引中</SelectItem>
							<SelectItem value="売り切れ">売り切れ</SelectItem>
						</SelectContent>
					</Select>
					<ProductList products={filteredPostedProducts} />
				</TabsContent>
				<TabsContent value="purchase" className="mt-6">
					<Select
						onValueChange={(value) => setSelectedFilterPurchases(value)}
						value={selectedFilterPurchases}
					>
						<ProfileSelectTrigger className="py-1 px-2 w-fit bg-dark-gray text-default-white mb-4">
							<SelectValue placeholder="すべて" className="font-normal" />
						</ProfileSelectTrigger>
						<SelectContent className="w-20 z-50 bg-white">
							<SelectItem value="すべて">すべて</SelectItem>
							<SelectItem value="売り出し中">売り出し</SelectItem>
							<SelectItem value="取引中">取引中</SelectItem>
							<SelectItem value="売り切れ">売り切れ</SelectItem>
						</SelectContent>
					</Select>
					<ProductList products={filteredPurchasedProducts} />
				</TabsContent>
			</Tabs>
		</div>
	);
};
