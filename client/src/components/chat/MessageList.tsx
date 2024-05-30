import { Message } from "@/types/message"
import { MessageCard } from "./MessageCard"


type MessageListProps = {
  messages: Message[]
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessageList = ({ messages, messagesEndRef }: MessageListProps) => {
  return (
    <div className="px-4 space-y-2 max-w-96 mx-auto h-full first:py-2">
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