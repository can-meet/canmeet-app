import { MessageList } from '@/components/chat/MessageList'
import { Loading } from '@/components/layout/loading/Loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { type MessageSchema, messageResolver } from '@/schema/message'
import { useAuthStore } from '@/store/authStore'
import type { MessageType } from '@/types/message'
import type { RoomType } from '@/types/room'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillPlusCircle } from 'react-icons/ai'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { VscSend } from 'react-icons/vsc'
import { Link, useNavigate, useParams } from 'react-router-dom'
import io from 'socket.io-client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IoIosArrowDown } from "react-icons/io"
import { IoEllipsisHorizontal } from 'react-icons/io5'


const socket = io(import.meta.env.VITE_BASE_URL as string)

export const Chat = () => {
  const navigate = useNavigate()
  const { rid } = useParams()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [room, setRoom] = useState<RoomType>()
  const [messages, setMessages] = useState<MessageType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { currentUser } = useAuthStore()

  const form = useForm<MessageSchema>({
    defaultValues: {
      text: '',
    },
    resolver: messageResolver,
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })

    const getMessages = (message: MessageType) => {
      setMessages(prev => [...prev, message])
    }

    socket.on('addNewMessage', getMessages)

    return () => {
      socket.off('addNewMessage')
    }
  }, [messages])

  useEffect(() => {
    if (!socket) return

    socket.emit('joinRoom', rid, currentUser?._id)

    const fetchData = async () => {
      if (!rid) return
      try {
        setLoading(true)
        const data = await axios.get(
          `${import.meta.env.VITE_API_URL}/rooms/${rid}`,
        )
        setRoom(data.data)
        setMessages(data.data.messages)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      socket.emit('leaveRoom', rid)
    }
  }, [rid, currentUser?._id])

  const onSubmit = (data: MessageSchema) => {
    const message = { ...data, senderId: currentUser?._id, roomId: rid }
    if (socket) {
      socket.emit('createMessage', message)
    }
    form.reset()
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className='flex flex-col'>
      {/* message room fixed header */}
      <div className='fixed bg-default-white z-20 top-0 right-0 w-full py-1 px-4'>
        <div className='flex items-center justify-between w-full'>
          <button onClick={() => navigate('/rooms')} type='button'>
            <IoIosArrowBack className='text-xl' />
          </button>

          <Popover>
            {/* header top (back arrow & user info) */}
            <PopoverTrigger>
                {currentUser?._id === room?.seller._id ? (
                  <div className='flex items-center gap-x-2 hover:bg-price-gray rounded-lg py-1.5 p-2.5'>
                    <Avatar className='rounded-full h-9 w-9 object-cover cursor-pointer self-center'>
                      <AvatarImage src={room?.buyer.profilePicture} />
                      <AvatarFallback>PROFILE IMAGE</AvatarFallback>
                    </Avatar>
                    <h3 className='text-lg'>{room?.buyer.username}</h3>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='flex items-center gap-x-2 hover:bg-price-gray rounded-lg py-1.5 p-2.5'>
                    <Avatar className='rounded-full h-9 w-9 object-cover cursor-pointer self-center'>
                      <AvatarImage src={room?.seller.profilePicture} />
                      <AvatarFallback>PROFILE IMAGE</AvatarFallback>
                    </Avatar>
                    <h3 className='text-lg'>{room?.seller.username}</h3>
                    <IoIosArrowDown />
                  </div>
                )}
              {/* </div> */}
            </PopoverTrigger>

            {/* header popup (product info) */}
            <PopoverContent className='bg-default-white flex  px-4 py-8'>
                {room?.product && (
                  <>
                    <img
                      src={room.product.images[0]}
                      alt='product'
                      className='h-24 w-24 rounded-md object-cover mx-8'
                    />
                    <div className='relative w-full'>
                      <div className='text-lg font-medium space-y-1'>
                        <h2>{room.product.product_name}</h2>
                        <h2>${room.product.price}</h2>
                      </div>
                      <Link to={`/products/${room.product._id}`}>
                        <div className='flex items-center gap-x-1 absolute bottom-0'>
                          <h3 className='text-xs hover:underline hover:underline-offset-4'>
                            商品詳細を確認
                          </h3>
                          <IoIosArrowForward />
                        </div>
                      </Link>
                    </div>
                  </>
                )}
              {/* </div> */}
            </PopoverContent>
          </Popover>
          <IoEllipsisHorizontal className='text-xl' />
        </div>
      </div>

      <div className='flex flex-col overscroll-hidden h-screen'>
        <div className='mt-16 mb-16 space-y-2 px-4 first:py-2 flex-grow overflow-y-auto'>
          <MessageList messages={messages} messagesEndRef={messagesEndRef} />
        </div>
      </div>

      <div className='fixed h-16 pb-8 bottom-0 left-0 right-0 w-full bg-default-white'>
        <form
          className='px-4 z-20 max-w-96 mx-auto'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='relative'>
            <Input
              type='file'
              accept='image/*'
              className='hidden'
              ref={fileInputRef}
            />
            <AiFillPlusCircle
              className='h-6 w-6 absolute top-2 left-2 cursor-pointer'
              onClick={() => fileInputRef.current?.click()}
            />
            <Input
              placeholder='メッセージする'
              type='text'
              className='rounded-xl pl-10 pr-12 w-full placeholder:text-sm'
              {...form.register('text', { required: true })}
            />
            <button
              type='submit'
              className='absolute top-2 right-4 cursor-pointer'
            >
              <VscSend className='text-2xl' />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
