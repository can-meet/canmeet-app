import { Button } from '@/components/ui/button'
import { DrawerClose, DrawerFooter, DrawerHeader } from '@/components/ui/drawer'
import { useAuthStore } from '@/store/authStore'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdCheckmark } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'

type StatusFormProps = {
  productSaleStatus: string
}

const StatusForm = ({ productSaleStatus }: StatusFormProps) => {
  const { pid } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<string>(productSaleStatus)
  const { currentUser } = useAuthStore()

  const handleSubmit = async (status: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/products/status/${pid}`,
        {
          userId: currentUser?._id,
          sale_status: status,
        },
      )

      localStorage.setItem('shouldOpenEditModal', 'true')

      navigate(0)
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('ステータスの変更に失敗しました。')
    }
  }

  return (
    <>
      <div className='max-w-sm mx-auto'>
        <DrawerHeader className='mt-6 p-0'>
          <div className='space-y-4 text-default-black'>
            <div className='relative'>
              {status === '売り出し中' && (
                <IoMdCheckmark className='absolute top-2.5 left-6 text-xl' />
              )}
              <Button
                type='button'
                className='w-[358px] font-normal justify-start pl-20'
                onClick={() => setStatus('売り出し中')}
              >
                売り出し
              </Button>
            </div>
            <div className='relative'>
              {status === '取引中' && (
                <IoMdCheckmark className='absolute top-2.5 left-6 text-xl' />
              )}
              <Button
                type='button'
                className='w-[358px] font-normal justify-start pl-20'
                onClick={() => setStatus('取引中')}
              >
                取引中
              </Button>
            </div>
            <div className='relative'>
              {status === '売り切れ' && (
                <IoMdCheckmark className='absolute top-2.5 left-6 text-xl' />
              )}
              <Button
                type='button'
                className='w-[358px] font-normal justify-start pl-20'
                onClick={() => setStatus('売り切れ')}
              >
                売り切れ
              </Button>
            </div>
          </div>
        </DrawerHeader>
        <DrawerFooter className='mt-6 mb-9 p-0'>
          <DrawerClose>
            <Button variant='blue' onClick={() => handleSubmit(status)}>
              変更する
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </>
  )
}

export default StatusForm
