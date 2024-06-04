import { Room } from "@/types/room"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { timeAgo } from "@/lib/timeAgo";

type RoomCardProps = {
  room: Room;
  recipientName: string;
  recipientImage: string;
}

export const RoomCard = ({ room, recipientName, recipientImage }: RoomCardProps) => {

  return (
    <Link to={`/rooms/${room._id}`} className='cursor-pointer'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-x-3'>
          <Avatar className="rounded-full h-9 w-9 object-cover cursor-pointer self-center">
            <AvatarImage src={recipientImage} />
            <AvatarFallback>PROFILE IMAGE</AvatarFallback>
          </Avatar>
          <div>
            <div className='flex gap-x-2 items-center mb-0.5'>
              <h3 className='text-sm'>{recipientName}</h3>
              <h3 className="text-xs text-gray-400 mt-0.5">{room.messages[0] && timeAgo(room.messages[0].createdAt.toString())}</h3>
            </div>
            <p className='text-xs break-all'>{room.messages[0] && room.messages[0].text}</p>
          </div>
        </div>
        {room.product && room.product.images && (
          <img src={room.product.images[0]} alt="product image" className='w-10 h-13' />
        )}
      </div>
    </Link>
  )
}