import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { SearchHistory } from "./SearchHistory";

type SearchBarProps = {
	onSearch(query: string): void;
};

export const SearchBar = ({ onSearch }: SearchBarProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const [searchHistory, setSearchHistory] = useState<string[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("q") || "";

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const product_name = e.target.value;
		if (product_name) {
			setSearchParams({ q: product_name });
		} else {
			setSearchParams({});
		}
	};

	const handleSearch = () => {
		onSearch(query);
		setSearchHistory([query, ...searchHistory]);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className="outline-none">
				<div className="relative w-[300px]">
					<div className="flex items-center">
						<Input className="w-[375px] rounded-xl border-slate-300 px-4 pointer-events-none" />
						<button
							type="submit"
							className="absolute bottom-0 right-2 flex items-center justify-center p-2"
						>
							<IoMdSearch className="h-6 w-6 text-black" />
						</button>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogDescription>
						<div className="mt-12 px-2">
							<h2 className="text-start p-2 text-lg font-medium">検索</h2>
							<div className="relative w-[330px]">
								<div className="flex items-center">
									<Input
										placeholder="商品を検索..."
										className="w-full rounded-xl border-slate-300 px-4"
										value={query}
										onChange={handleInputChange}
										onKeyDown={(e) => e.key === "Enter" && handleSearch()}
									/>
									<button
										type="submit"
										className="absolute bottom-0 right-2 flex items-center justify-center p-2"
										onClick={handleSearch}
									>
										<IoMdSearch className="h-6 w-6 text-black" />
									</button>
								</div>
							</div>

							<SearchHistory searchHistory={searchHistory} />
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
