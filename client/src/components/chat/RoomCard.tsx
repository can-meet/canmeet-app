import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { timeAgo } from '@/lib/timeAgo'
import type { RoomType } from '@/types/room'
import { Link } from 'react-router-dom'

type RoomCardProps = {
  room: RoomType
  recipientName: string
  recipientImage: string
}

export const RoomCard = ({
  room,
  recipientName,
  recipientImage,
}: RoomCardProps) => {
  return (
    <Link to={`/rooms/${room._id}`} className='cursor-pointer'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-x-3'>
          <Avatar className='rounded-full h-9 w-9 object-cover cursor-pointer self-center'>
            <AvatarImage
              src={
                recipientImage ||
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
              className='h-10'
            />
            <AvatarFallback>PROFILE IMAGE</AvatarFallback>
          </Avatar>
          <div className='mr-1.5'>
            <div className='flex gap-x-2 items-center mb-0.5'>
              <h3 className='text-sm'>{recipientName}</h3>
              <h3 className='text-xs text-gray-400 mt-0.5'>
                {room.messages[0] &&
                  timeAgo(room.messages[0].createdAt.toString())}
              </h3>
            </div>
            <p className='text-xs break-all line-clamp-2'>{room.messages[0]?.text}</p>
          </div>
        </div>
        {room.product?.images && (
          <img
            src={room.product.images[0]}
            alt='transaction product'
            className='w-10 h-13'
          />
        )}
      </div>
    </Link>
  )
}
