"use client"

import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { notificationService } from "@/services/notification-service"
import { toast } from "@/components/ui/use-toast"

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      fetchNotifications()
    }
  }, [open])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await notificationService.getNotifications()
      if (response.success) {
        setNotifications(response.data || [])
        setUnreadCount(response.data?.filter((n) => !n.read).length || 0)
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      const response = await notificationService.markAsRead(id)
      if (response.success) {
        // Actualizar la notificación en el estado local
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
        setUnreadCount(Math.max(0, unreadCount - 1))
      }
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      const response = await notificationService.markAllAsRead()
      if (response.success) {
        // Marcar todas las notificaciones como leídas en el estado local
        setNotifications(notifications.map((n) => ({ ...n, read: true })))
        setUnreadCount(0)
        toast({
          title: "Notificaciones",
          description: "Todas las notificaciones han sido marcadas como leídas",
        })
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return "bg-blue-500"
      case "warning":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      case "success":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notificaciones</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
              Marcar todas como leídas
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-80">
          {loading ? (
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Cargando notificaciones...</p>
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex items-start gap-2 p-3 ${notification.read ? "" : "bg-accent"}`}
                onClick={() => !notification.read && handleMarkAsRead(notification.id)}
              >
                <div className={`h-2 w-2 mt-1.5 rounded-full ${getNotificationIcon(notification.type)}`} />
                <div className="flex-1">
                  <p className={`text-sm ${notification.read ? "" : "font-medium"}`}>{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(notification.createdAt)}</p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center">
              <p className="text-muted-foreground">No hay notificaciones</p>
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

