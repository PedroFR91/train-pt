import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { FloatingChatButton } from "@/components/chat/FloatingChatButton"
import { AuthProvider } from "@/contexts/auth-context"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto">
            {children}
            <FloatingChatButton />
          </main>
        </div>
      </SidebarProvider>
    </AuthProvider>
  )
}

