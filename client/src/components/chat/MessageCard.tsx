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
        <div className='flex flex-col gap-y-1 items-end'>
          <div className='flex flex-col gap-y-0.5'>
            <div className='flex items-end flex-row gap-x-1.5 max-w-sm'>
              <div className="text-xs text-gray-400 mb-0.5">{formatTime(message.createdAt)}</div>
              <div className="mr-0 py-1 px-3 max-w-72 break-words border rounded-xl bg-gradient-to-r from-chat-blue to-chat-purple">
                <p className='text-start'>{message.text}</p>
              </div>
            </div>
            {(message.isRead  && isLastMessage ) && <p className='text-sm text-gray-400 text-end'>Seen</p>}
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-y-1'>
          <div className='flex'>
            <Avatar className="rounded-full h-10 w-10 object-cover cursor-pointer self-center">
              <AvatarImage src={message.sender.profilePicture} />
              <AvatarFallback>PROFILE IMAGE</AvatarFallback>
            </Avatar>
            <div className="ml-2 flex items-end gap-x-1.5">
              <div className="mt-2 py-1 px-3 max-w-72 break-words border rounded-xl bg-chat-gray border-chat-gray">
                <p>{message.text}</p>
              </div>
              <div className="text-xs text-gray-400 mb-0.5">{formatTime(message.createdAt)}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}