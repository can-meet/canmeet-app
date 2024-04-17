
import { Input } from "../ui/input";
import { IoMdSearch } from "react-icons/io";
import { useSearchParams } from 'react-router-dom';


type SearchBarProps = {
  onSearch(query: string): void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const product_name = e.target.value;
    if (product_name) {
      setSearchParams({ "q" : product_name });
    } else {
      setSearchParams({});
    }
  }

  const handleSearch = () => {
    onSearch(query)
  }

  return (
    <div className='relative w-[300px]'>
      <div className='flex items-center'>
        <Input
          placeholder="商品を検索..."
          className='w-[375px] rounded-xl border-slate-300 px-4'
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          type='submit' 
          className="absolute bottom-0 right-2 flex items-center justify-center p-2"
          onClick={handleSearch}
        >
          <IoMdSearch className="h-6 w-6 text-black" />
        </button>
      </div>
    </div>


  
  )
}