import type React from "react"
import { FloatingChatButton } from "@/components/chat/FloatingChatButton"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
      <FloatingChatButton />
    </div>
  )
}

