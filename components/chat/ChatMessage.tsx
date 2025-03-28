import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ChatMessageProps {
  message: {
    type: "user" | "trainer" | "system"
    content: string
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const getMessageStyle = () => {
    switch (message.type) {
      case "user":
        return "bg-primary text-primary-foreground ml-auto"
      case "trainer":
        return "bg-secondary text-secondary-foreground"
      case "system":
        return "bg-muted text-muted-foreground w-full text-center italic"
      default:
        return ""
    }
  }

  if (message.type === "system") {
    return <div className={`my-2 p-2 rounded-md ${getMessageStyle()}`}>{message.content}</div>
  }

  return (
    <div className={`flex items-start gap-2 my-2 ${message.type === "user" ? "flex-row-reverse" : ""}`}>
      <Avatar>
        <AvatarFallback>{message.type === "user" ? "U" : "T"}</AvatarFallback>
      </Avatar>
      <div className={`p-2 rounded-md max-w-[70%] ${getMessageStyle()}`}>{message.content}</div>
    </div>
  )
}

