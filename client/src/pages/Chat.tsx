import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import { AiFillPlusCircle } from "react-icons/ai";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loading } from "@/components/layout/loading/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Message } from "@/types/message";
import { MessageList } from "@/components/chat/MessageList";
import io from "socket.io-client";
import { useForm } from "react-hook-form";
import { MessageSchema, messageResolver } from "@/schema/message";
import { Room } from "@/types/room";


const socket = io(import.meta.env.VITE_BASE_URL as string);

export const Chat = () => {
  const navigate = useNavigate();
  const { rid } = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [room, setRoom] = useState<Room>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const form = useForm<MessageSchema>({
		defaultValues: {
			text: "",
		},
		resolver: messageResolver,
	});

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });

    const getMessages = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on('addNewMessage', getMessages);

    return () => {
      socket.off('addNewMessage');
    };
  }, [messages]);


  useEffect(() => {
    if (!socket) return;

    socket.emit('joinRoom', rid, currentUser?._id);

    const fetchData = async () => {
      if (!rid) return;
      try {
        setLoading(true);
        const data = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/${rid}`);
        setRoom(data.data);
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    socket.on('messages', (messages: Message[]) => {
      setMessages(messages);
    });

    return () => {
      socket.emit('leaveRoom', rid);
    };
  }, [rid]);


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  };


  const onSubmit = (data: MessageSchema) => {
    const message = { ...data, senderId: currentUser?._id, roomId: rid };
    if (socket) {
      socket.emit('createMessage', message);
    }
    form.reset();
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div className='flex flex-col h-screen'>

      {/* message room fixed header */}
      <div className='fixed bg-default-white z-20 top-0 right-0 w-full border-b-[0.5px] border-primary-gray pt-4 pb-6 h-52'>
        <div className="max-w-96 min-w-80 mx-auto">

          {/* header top (back arrow & user info) */}
          <div className='flex items-center gap-x-5 pl-4'>
            <button onClick={() => navigate("/rooms")}>
              <IoIosArrowBack className='text-xl'/>
            </button>

            {currentUser?._id === room?.seller._id ? (
              <div className='flex items-center gap-x-4'>
                <Avatar className="rounded-full h-9 w-9 object-cover cursor-pointer self-center">
                  <AvatarImage src={room?.buyer.profilePicture} />
                  <AvatarFallback>PROFILE IMAGE</AvatarFallback>
                </Avatar>
                <h3 className='text-lg'>{room?.buyer.username}</h3>
              </div>
            ) : (
              <div className='flex items-center gap-x-2'>
                <Avatar className="rounded-full h-9 w-9 object-cover cursor-pointer self-center">
                  <AvatarImage src={room?.seller.profilePicture} />
                  <AvatarFallback>PROFILE IMAGE</AvatarFallback>
                </Avatar>
                <h3 className='text-lg'>{room?.seller.username}</h3>
              </div>
            )}
          </div>

          {/* header bottom (product info) */}
          <div className='flex justify-center mt-7 max-w-96 mx-auto px-4 '>
          {room && room.product && (
            <>
              <img src={room.product.images[0]} alt="product image" className='h-24 w-24 object-cover mx-8' />
              <div className='relative w-full'>
                <div className="text-lg font-semibold space-y-1">
                  <h2>{room.product.product_name}</h2>
                  <h2>${room.product.price}</h2>
                </div>
                <Link to={`/products/${room.product._id}`}>
                  <div className='flex items-center gap-x-1 absolute right-0 bottom-1'>
                    <h3 className='text-xs hover:underline hover:underline-offset-4'>商品詳細を確認</h3>
                    <IoIosArrowForward />
                  </div>
                </Link>
              </div>
            </>
          )}
          </div>
        </div>
      </div>

      <div className='flex flex-col overscroll-hidden h-screen'>
        <div className="mt-52 mb-16 space-y-2 w-11/12 max-w-96 mx-auto first:py-2 last:pb-2 flex-grow overflow-y-auto">
          <MessageList
            messages={messages}
            messagesEndRef={messagesEndRef}
          />
        </div>
      </div>

      <div className='fixed pb-8 bottom-0 left-0 right-0 w-full bg-default-white'>
        <form 
          className="px-4 z-20 max-w-96 mx-auto"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="relative">
            <Input
              type="file" 
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <AiFillPlusCircle 
              className='h-6 w-6 absolute top-2 left-2 cursor-pointer'
              onClick={() => fileInputRef.current?.click()} 
            />
            <Input
              placeholder="コメントする"
              type="text"
              className="rounded-xl pl-10 pr-12 w-full placeholder:text-sm"
              {...form.register('text', { required: true })}
            />
            <button
              type="submit"
              className="absolute top-2 right-4 cursor-pointer"
            >
              <VscSend className="text-2xl" />
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}