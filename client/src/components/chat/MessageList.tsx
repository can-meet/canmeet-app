import { Message } from "@/types/message"
import { MessageCard } from "./MessageCard"


type MessageListProps = {
  messages: Message[]
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessageList = ({ messages, messagesEndRef }: MessageListProps) => {
  return (
    <>
      {messages.map((message, index) => (
        <MessageCard
          key={message._id}
          message={message}
          isLastMessage={index === messages.length - 1} 
        />
      ))}
      <div ref={messagesEndRef} />
    </>
  )
}