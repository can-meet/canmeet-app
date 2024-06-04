import axios from "axios";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { RoomCard } from "@/components/chat/RoomCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Room } from "@/types/room";
import io from "socket.io-client";
import { useEffect, useState } from "react";


const socket = io(import.meta.env.VITE_BASE_URL as string);

export const Rooms = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [saleRooms, setSaleRooms] = useState<Room[]>([]);
  const [purchaseRooms, setPurchaseRooms] = useState<Room[]>([]);


  useEffect(() => {
    if (!currentUser) return;
    const fetchUserRooms = async (userId: string) => {
      try {
        const data = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/users/${userId}`);
        const saleRoomsData = data.data.saleRooms;
        const purchaseRoomsData = data.data.purchaseRooms;

        saleRoomsData.sort((a: Room, b: Room) => {
          const latestMessageA = a.messages[0];
          const latestMessageB = b.messages[0];
          return new Date(latestMessageB?.createdAt).getTime() - new Date(latestMessageA?.createdAt).getTime();
        });

        purchaseRoomsData.sort((a: Room, b: Room) => {
          const latestMessageA = a.messages[0];
          const latestMessageB = b.messages[0];
          return new Date(latestMessageB?.createdAt).getTime() - new Date(latestMessageA?.createdAt).getTime();
        });

        setSaleRooms(saleRoomsData);
        setPurchaseRooms(purchaseRoomsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserRooms(currentUser?._id);

    const handleLatestMessage = () => {
      fetchUserRooms(currentUser?._id);
    };

    socket.on('latestMessage', handleLatestMessage);

    return () => {
      socket.off('latestMessage', handleLatestMessage);
    };
  }, []);


  return (
    <div className='mt-14 mb-28 flex flex-col items-center justify-center'>

			<Tabs defaultValue="sale" className="px-8 max-w-96 mx-auto">
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
