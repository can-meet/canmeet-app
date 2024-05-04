import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import { AiFillPlusCircle } from "react-icons/ai";
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Room } from "@/types/room";
import { Loading } from "@/components/layout/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MessageCard } from "@/components/chat/MessageCard";
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
    <div className='my-4 mb-16 flex flex-col gap-y-4'>
      <div className='fixed bg-white w-full z-10 top-0 p-4 pb-2 mr-24'>
        <div className='flex items-center gap-x-4'>
          <button 
            onClick={() => navigate("/rooms")}
          >
            <IoIosArrowBack className='text-xl'/>
          </button>

          {currentUser?._id === room?.seller._id ? (
            <div className='flex items-center gap-x-2'>
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

        <div className='flex justify-center gap-x-4 my-4'>
          <img src={room?.product.images[0]} alt="product image" className='w-28 h-24' ></img>
          <div className='relative w-[150px]'>
            <h2>{room?.product.product_name}</h2>
            <h2>${room?.product.price}</h2>
            <Link to={`/products/${room?.product._id}`}>
              <div className='flex items-center gap-x-1 absolute right-0 bottom-1'>
                <h3 className='text-sm hover:underline hover:underline-offset-2'>商品詳細を確認</h3>
                <IoIosArrowForward />
              </div>
            </Link>
          </div>
        </div>

        <Separator className=" bg-gray-200" />
      </div>

      <MessageList
        messages={messages}
        messagesEndRef={messagesEndRef}
      />

      <div className='fixed bottom-10 pb-6 px-4 w-full z-10 bg-white'>
        <form className="relative w-full">
          <Input
            type="file" 
            accept="image/*"
            className='hidden'
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
            className="rounded-xl border-secondary-gray pl-10 pr-12"
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
        </form>
      </div>
    </div>
  )
}