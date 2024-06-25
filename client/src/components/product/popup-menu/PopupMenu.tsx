import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer'
import type DetailProduct from '@/pages/product/DetailProduct'
import type { RootState } from '@/redux/store'
import { useState } from 'react'
import { GoPencil } from 'react-icons/go'
import { IoIosArrowBack } from 'react-icons/io'
import { IoMenuOutline } from 'react-icons/io5'
import { IoEllipsisHorizontal } from 'react-icons/io5'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import DeleteForm from './DeleteForm'
import StatusForm from './StatusForm'

type PopupMenuProps = {
  product: DetailProduct
}

const PopupMenu = ({ product }: PopupMenuProps) => {
  const navigate = useNavigate()
  const { pid } = useParams()
  const [isOnChangeStatusStep, setIsOnChangeStatusStep] =
    useState<boolean>(false)
  const [isOnDeleteStep, setIsOnDeleteStep] = useState<boolean>(false)

  const { currentUser } = useSelector((state: RootState) => state.user)

  return (
    <div className='flex justify-between items-center m-3'>
      <button onClick={() => navigate(-1)} type='button'>
        <IoIosArrowBack className='text-2xl' />
      </button>

      {currentUser?._id === product.user._id ? (
        <Drawer onClose={() => setIsOnChangeStatusStep(false)}>
          <DrawerTrigger>
            <IoEllipsisHorizontal className='text-2xl' />
          </DrawerTrigger>
          <DrawerContent className='bg-default-white h-fit'>
            {isOnChangeStatusStep ? (
              <StatusForm productSaleStatus={product.sale_status} />
            ) : isOnDeleteStep ? (
              <DeleteForm
                onDelete={setIsOnDeleteStep}
                onStatusChange={setIsOnChangeStatusStep}
              />
            ) : (
              <div className='max-w-96 mx-auto'>
                <DrawerHeader className='mt-6 space-y-2 p-0'>
                  <Button
                    onClick={() => navigate(`/product/edit/${pid}`)}
                    className='justify-start font-normal w-[358px]'
                  >
                    <GoPencil className='text-2xl mr-8' />
                    投稿内容を編集する
                  </Button>
                  <Button
                    onClick={() => setIsOnChangeStatusStep(true)}
                    className='justify-start font-normal w-[358px]'
                  >
                    <IoMenuOutline className='text-2xl mr-8' />
                    販売ステータスを変更する
                  </Button>
                  <Button
                    onClick={() => setIsOnDeleteStep(true)}
                    className='justify-start font-normal w-[358px]'
                  >
                    <RiDeleteBin6Line className='text-2xl mr-8' />
                    投稿を削除する
                  </Button>
                </DrawerHeader>
                <DrawerFooter className='mt-6 mb-9 p-0 h-10' />
              </div>
            )}
          </DrawerContent>
        </Drawer>
      ) : null}
    </div>
  )
}

export default PopupMenu
