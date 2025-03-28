"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { ChatWindow } from "./ChatWindow"

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <ChatWindow onClose={() => setIsOpen(false)} />
      ) : (
        <Button onClick={() => setIsOpen(true)} className="rounded-full w-16 h-16 shadow-lg">
          <MessageCircle size={24} />
        </Button>
      )}
    </div>
  )
}

