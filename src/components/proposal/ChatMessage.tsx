
import { FC } from "react";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Message } from "@/store/proposalStore";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "flex gap-3 max-w-[80%]",
        isUser ? "ml-auto" : "mr-auto"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-blue-600 text-white">AI</AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "rounded-lg p-3 text-sm",
          isUser 
            ? "bg-blue-600 text-white" 
            : "bg-gray-100 text-gray-800"
        )}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        <div 
          className={cn(
            "text-xs mt-1 text-right",
            isUser ? "text-blue-200" : "text-gray-500"
          )}
        >
          {formattedTime}
        </div>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gray-500 text-white">ME</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
