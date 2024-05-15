import axios from "axios";
import { useQuery } from 'react-query';
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Loading } from "@/components/layout/loading/Loading";
import { RoomCard } from "@/components/chat/RoomCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Room } from "@/types/room";



export const Rooms = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

	const fetchRoomDetail = async (userId: string) => {
		const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/users/${userId}`);
		return data;
	};

	const { data, isLoading } = useQuery(['rooms', currentUser?._id], () => {
		if (currentUser) {
			return fetchRoomDetail(currentUser._id);
		} else {
			throw new Error('User ID is undefined');
		}
	}, {
		enabled: !!currentUser
	});

	const { saleRooms, purchaseRooms } = data || { saleRooms: [], purchaseRooms: [] };


  if (isLoading) {
    return (
      <Loading />
    )
  }


  return (
    <div className='mt-14 mb-28 flex flex-col items-center justify-center'>

			<Tabs defaultValue="sale" className="px-8 w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="sale">売る</TabsTrigger>
					<TabsTrigger value="purchase">買う</TabsTrigger>
				</TabsList>
        <TabsContent value="sale" className="mt-6">
          <div className='flex flex-col gap-y-4 mx-2'>
            {saleRooms.map((saleRoom: Room) => (
              <RoomCard
                key={saleRoom._id}
                room={saleRoom}
                recipientName={saleRoom.buyer.username}
                recipientImage={saleRoom.buyer.profilePicture}
              />
            ))}
          </div>
				</TabsContent>
				
        <TabsContent value="purchase" className="mt-6">
          <div className='flex flex-col gap-y-4 mx-2'>
            {purchaseRooms.map((purchaseRoom: Room) => (
              <RoomCard
                key={purchaseRoom._id}
                room={purchaseRoom}
                recipientName={purchaseRoom.seller.username}
                recipientImage={purchaseRoom.seller.profilePicture}
              />
            ))}
          </div>
				</TabsContent>
			</Tabs>
		</div>
  )
}
