import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import { AiFillPlusCircle } from "react-icons/ai";
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loading } from "@/components/layout/loading/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Message } from "@/types/message";
import { useQuery } from "react-query";
import { MessageList } from "@/components/chat/MessageList";
import io, { Socket } from "socket.io-client";


export const Chat = () => {
  const navigate = useNavigate();
  const { rid } = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>('');
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { currentUser } = useSelector((state: RootState) => state.user);

  const fetchRoomDetail = async (rid: string) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/${rid}`);
    return data;
  };
  
  const { data: room, isLoading } = useQuery('roomDetails', () => {
    if (rid) {
      return fetchRoomDetail(rid);
    } else {
      throw new Error('Room ID is undefined');
    }
  });


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages]);
  
  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_BASE_URL}`);
    setSocket(newSocket);
    newSocket.emit('joinRoom', rid, currentUser?._id);

    newSocket.on('roomMessages', (existingMessages: Message[]) => {
      setMessages(existingMessages);
    });

    newSocket.on('addNewMessage', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.off('roomMessages');
      newSocket.off('addNewMessage');
      newSocket.off('joinedRoom');
      newSocket.disconnect();
    };
  }, [rid]); 


  const sendMessage = () => {
    if (socket && messageText.trim() !== '' && room) {
      socket.emit('sendMessage', {
        roomId: rid,
        sender: currentUser,
        text: messageText,
      });
      setMessageText('');
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <div className='flex flex-col'>

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
            {room.product ? (
              <>
                <img src={room?.product.images[0]} alt="product image" className='h-24 w-24 object-cover mx-8'></img>
                <div className='relative w-full'>
                  <div className="text-lg font-semibold space-y-1">
                    <h2>{room?.product.product_name}</h2>
                    <h2>${room?.product.price}</h2>
                  </div>
                  <Link to={`/products/${room?.product._id}`}>
                    <div className='flex items-center gap-x-1 absolute right-0 bottom-1'>
                      <h3 className='text-xs hover:underline hover:underline-offset-4'>商品詳細を確認</h3>
                      <IoIosArrowForward />
                  </div>
                </Link>
              </div>
              </>
            ) : (
              <span>この商品は出品者により削除されました</span>
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
        <form className="px-4 z-20 max-w-96 mx-auto">
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
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
            />
            <button 
              className="absolute top-2 right-4 cursor-pointer"
              onClick={(e) => handleSendMessage(e)}
            >
              <VscSend className="text-2xl" />
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}