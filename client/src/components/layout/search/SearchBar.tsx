import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState, KeyboardEvent } from "react";
import { IoMdSearch } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { Input } from "../../ui/input";
import { SearchHistory } from "./SearchHistory";
import { DialogTitle } from "@radix-ui/react-dialog";

type SearchBarProps = {
	onSearch(query: string): void;
};

export const SearchBar = ({ onSearch }: SearchBarProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const [searchHistory, setSearchHistory] = useState<string[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const [isComposing, setIsComposing] = useState<boolean>(false);
	const query = searchParams.get("q") || "";

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const product_name = e.target.value;
		if (product_name) {
			setSearchParams({ q: product_name });
		} else {
			setSearchParams({});
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSearch()
    }
  };

	const handleSearch = () => {
		onSearch(query);
		if (query.trim().length > 0) {
			setSearchHistory([query, ...searchHistory]);
		}
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className="outline-none">
				<div className="relative w-[300px]">
					<div className="flex items-center">
						<Input className="w-96 rounded-xl px-4 pointer-events-none" />
						<div className="absolute bottom-0 right-2 flex items-center justify-center p-2">
							<IoMdSearch className="h-6 w-6 text-default-black" />
						</div>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="p-2 text-lg font-semibold">検索</DialogTitle>
						<DialogDescription>
							<div className="flex items-center relative w-72">
								<Input
									placeholder="商品を検索..."
									className="rounded-xl px-4"
									value={query}
									onChange={handleInputChange}
									onCompositionStart={() => setIsComposing(true)}
									onCompositionEnd={() => setIsComposing(false)}
									onKeyDown={(e) => handleKeyDown(e)}
								/>
								<button
									type="submit"
									className="absolute bottom-0 right-2 flex items-center justify-center p-2"
									onClick={handleSearch}
								>
									<IoMdSearch className="h-6 w-6 text-default-black" />
								</button>
							</div>
						<SearchHistory searchHistory={searchHistory} />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
