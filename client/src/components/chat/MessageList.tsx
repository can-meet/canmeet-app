import { Message } from "@/types/message"
import { MessageCard } from "./MessageCard"


type MessageListProps = {
  messages: Message[]
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessageList = ({ messages, messagesEndRef }: MessageListProps) => {
  return (
    <div className="mt-44 mb-14 mx-4 flex flex-col gap-2.5 p-2 bg-white overflow-y-auto">
      {messages.map((message, index) => (
        <MessageCard
          key={message._id}
          message={message}
          isLastMessage={index === messages.length - 1} 
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}