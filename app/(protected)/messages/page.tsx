"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { userService } from "@/services/user-service"
import { Send, Paperclip } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Simulación de servicio de mensajes
const mockMessages = [
  {
    id: 1,
    senderId: 1,
    receiverId: 2,
    content: "Hola, ¿cómo va tu progreso con la nueva rutina?",
    timestamp: "2023-06-15T10:30:00Z",
  },
  {
    id: 2,
    senderId: 2,
    receiverId: 1,
    content: "¡Hola! Va muy bien, estoy notando mejoras en mi resistencia.",
    timestamp: "2023-06-15T10:35:00Z",
  },
  {
    id: 3,
    senderId: 1,
    receiverId: 2,
    content: "¡Excelente! ¿Has tenido alguna dificultad con algún ejercicio?",
    timestamp: "2023-06-15T10:40:00Z",
  },
  {
    id: 4,
    senderId: 2,
    receiverId: 1,
    content: "Con las sentadillas profundas, me cuesta mantener la postura correcta.",
    timestamp: "2023-06-15T10:45:00Z",
  },
  {
    id: 5,
    senderId: 1,
    receiverId: 2,
    content:
      "Entiendo. Te enviaré un video con la técnica correcta. Mientras tanto, reduce el peso y concéntrate en la forma.",
    timestamp: "2023-06-15T10:50:00Z",
  },
]

export default function MessagesPage() {
  const { user, isTrainer, isClient } = useAuth()
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true)
        // En una implementación real, esto vendría de la API
        const response = isTrainer() ? await userService.getClients() : await userService.getTrainers() // Esto sería un endpoint para obtener el entrenador del cliente

        if (response.success) {
          setContacts(response.data || [])
          if (response.data && response.data.length > 0) {
            setSelectedContact(response.data[0])
          }
        }
      } catch (error) {
        console.error("Error fetching contacts:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los contactos",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [isTrainer])

  useEffect(() => {
    if (selectedContact) {
      // En una implementación real, esto vendría de la API
      // Simulamos la carga de mensajes con el contacto seleccionado
      setMessages(mockMessages)
    }
  }, [selectedContact])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return

    // En una implementación real, esto se enviaría a la API
    const newMsg = {
      id: Date.now(),
      senderId: user.id,
      receiverId: selectedContact.id,
      content: newMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (loading) {
    return <div className="container mx-auto p-6">Cargando...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mensajes</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Lista de contactos */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Contactos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {contacts.length > 0 ? (
                <div>
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-accent ${
                        selectedContact?.id === contact.id ? "bg-accent" : ""
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <Avatar>
                        <AvatarImage src={contact.picture || undefined} alt={contact.firstName} />
                        <AvatarFallback>
                          {contact.firstName?.charAt(0)}
                          {contact.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {contact.firstName} {contact.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">{isTrainer() ? "Cliente" : "Entrenador"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-muted-foreground">No hay contactos disponibles</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Área de mensajes */}
        <Card className="md:col-span-3">
          {selectedContact ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedContact.picture || undefined} alt={selectedContact.firstName} />
                    <AvatarFallback>
                      {selectedContact.firstName?.charAt(0)}
                      {selectedContact.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>
                      {selectedContact.firstName} {selectedContact.lastName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{isTrainer() ? "Cliente" : "Entrenador"}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-[600px]">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const isCurrentUser = message.senderId === user.id
                      return (
                        <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              isCurrentUser
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                            }`}
                          >
                            <p>{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                            >
                              {formatTimestamp(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                <div className="border-t p-4 flex gap-2">
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Selecciona un contacto para comenzar a chatear</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}

