import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { type KeyboardEvent, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { useSearchParams } from 'react-router-dom'
import { Input } from '../../ui/input'
import { SearchHistory } from './SearchHistory'

export const SearchBar = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [isComposing, setIsComposing] = useState<boolean>(false)
  const [_, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState<string>('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      const product_name = (e.target as HTMLInputElement).value
      handleSearch()
      if (product_name) {
        setSearchParams({ q: product_name })
      } else {
        setSearchParams({})
      }
    }
  }

  const handleSearch = () => {
    if (query.trim().length > 0) {
      setSearchHistory([query, ...searchHistory])
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='outline-none'>
        <div className='relative w-[300px]'>
          <div className='flex items-center'>
            <Input className='w-96 rounded-xl px-4 pointer-events-none' />
            <div className='absolute bottom-0 right-2 flex items-center justify-center p-2'>
              <IoMdSearch className='h-6 w-6 text-default-black' />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='p-2 text-lg font-semibold'>検索</DialogTitle>
          <DialogDescription>
            <div className='flex items-center relative w-72'>
              <Input
                placeholder='商品を検索...'
                className='rounded-xl px-4'
                value={query}
                onChange={e => setQuery(e.target.value)}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                onKeyDown={e => handleKeyDown(e)}
              />
              <button
                type='submit'
                className='absolute bottom-0 right-2 flex items-center justify-center p-2'
                onClick={handleSearch}
              >
                <IoMdSearch className='h-6 w-6 text-default-black' />
              </button>
            </div>
            <SearchHistory searchHistory={searchHistory} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
