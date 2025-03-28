"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Paperclip, Send, X } from "lucide-react"
import { ChatMessage } from "./ChatMessage"
import { mockChatData } from "@/mocks/chatData"

interface ChatWindowProps {
  onClose: () => void
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState(mockChatData)
  const [inputMessage, setInputMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { type: "user" as const, content: inputMessage }])
      setInputMessage("")
      // Here you would typically send the message to your backend
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Here you would typically upload the file to your backend
      setMessages([...messages, { type: "user" as const, content: `Archivo adjunto: ${file.name}` }])
    }
  }

  return (
    <Card className="w-96 h-[32rem] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Chat con tu Entrenador</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={20} />
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Input
          placeholder="Escribe un mensaje..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button variant="ghost" size="icon" onClick={() => document.getElementById("file-upload")?.click()}>
          <Paperclip size={20} />
        </Button>
        <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
        <Button size="icon" onClick={handleSendMessage}>
          <Send size={20} />
        </Button>
      </CardFooter>
    </Card>
  )
}

