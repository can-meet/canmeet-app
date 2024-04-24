import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
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

export const Profile = () => {
	const [loading, setLoading] = useState<boolean>(false);
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
					setLoading(true);
					const response = await axios.get(
						`${import.meta.env.VITE_API_URL}/users/${currentUser?.userId}`,
					);
					setUser(response.data);
					setLoading(false);
				}
			} catch (error) {
				console.error("Error fetching products:", error);
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

	return (
		<div className="my-20 flex flex-col items-center justify-center">
			<Avatar className="rounded-full h-20 w-20 object-cover cursor-pointer self-center">
				<AvatarImage src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
				<AvatarFallback>PROFILE IMAGE</AvatarFallback>
			</Avatar>

			<h2 className="my-3 text-lg">{user.username}</h2>

			<Tabs defaultValue="post" className="px-4 w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="post" className="border-b-secondary-gray">
						投稿した商品
					</TabsTrigger>
					<TabsTrigger value="buy">購入した商品</TabsTrigger>
				</TabsList>
				<TabsContent value="post" className="mt-6">
					<Select
						onValueChange={(value) => setSelectedFilterPosts(value)}
						value={selectedFilterPosts}
					>
						<SelectTrigger className="w-[100px] h-[35px] bg-product-status-gray text-white mb-4">
							<SelectValue placeholder="すべて" className="font-normal" />
						</SelectTrigger>
						<SelectContent className="w-[80px] z-20 bg-white">
							<SelectItem value="すべて">すべて</SelectItem>
							<SelectItem value="売り出し中">売り出し</SelectItem>
							<SelectItem value="取引中">取引中</SelectItem>
							<SelectItem value="売り切れ">売り切れ</SelectItem>
						</SelectContent>
					</Select>
					<ProductList products={filteredPostedProducts} />
				</TabsContent>
				<TabsContent value="buy" className="mt-6">
					<Select
						onValueChange={(value) => setSelectedFilterPurchases(value)}
						value={selectedFilterPurchases}
					>
						<SelectTrigger className="w-[100px] h-[35px] bg-product-status-gray text-white mb-4">
							<SelectValue placeholder="すべて" className="font-normal" />
						</SelectTrigger>
						<SelectContent className="w-[80px] z-20 bg-white">
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
