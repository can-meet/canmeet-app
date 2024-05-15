import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTime } from "@/lib/formatTime";
import { RootState } from "@/redux/store";
import { Message } from "@/types/message";
import { useSelector } from "react-redux";

type MessageCardProps = {
  message: Message;
  isLastMessage: boolean;
}

export const MessageCard = ({ 
  message,
  isLastMessage
}: MessageCardProps) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <>
      {(message.sender._id === currentUser?._id) ? (
        <>
          <div className="flex justify-end items-end gap-x-2">
            <span className="text-xs text-gray-400 mb-0.5">{formatTime(message.createdAt)}</span>
            <span className='text-start max-w-72 rounded-xl bg-gradient-to-r from-chat-blue to-chat-purple py-1 px-3'>{message.text}</span>
          </div>
          {(message.isRead  && isLastMessage ) && 
            <p className='text-sm text-gray-400 text-end'>Seen</p>
          }
        </>
      ) : (
        <div className='flex gap-x-2'>
          <Avatar className="rounded-full h-10 w-10 object-cover cursor-pointer self-center">
            <AvatarImage src={message.sender.profilePicture} />
            <AvatarFallback>PROFILE IMAGE</AvatarFallback>
          </Avatar>
          <div className="flex items-end gap-x-2">
            <span className='text-start max-w-72 rounded-xl bg-chat-gray py-1 px-3'>{message.text}</span>
            <span className="text-xs text-gray-400 mb-0.5">{formatTime(message.createdAt)}</span>
          </div>
        </div>
      )}
    </>
  )
}