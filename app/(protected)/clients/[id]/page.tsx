"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { userService } from "@/services/user-service"
import { ClientMeasurements } from "@/components/dashboard/client-measurements"
import { ClientDiet } from "@/components/dashboard/client-diet"
import { ClientForms } from "@/components/dashboard/client-forms"
import { ClientPhotos } from "@/components/dashboard/client-photos"

export default function ClientDetailPage() {
  const params = useParams()
  const clientId = params.id
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true)
        const response = await userService.getUserById(clientId)
        if (response.success) {
          setClient(response.data)
        }
      } catch (error) {
        console.error("Error fetching client:", error)
      } finally {
        setLoading(false)
      }
    }

    if (clientId) {
      fetchClient()
    }
  }, [clientId])

  if (loading) {
    return <div className="container mx-auto p-6">Cargando...</div>
  }

  if (!client) {
    return <div className="container mx-auto p-6">Cliente no encontrado</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Perfil del Cliente</h1>
        <div className="flex gap-2">
          <Button variant="outline">Enviar Mensaje</Button>
          <Button>Asignar Rutina</Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32">
                <AvatarImage src={client.picture || undefined} alt={client.firstName} />
                <AvatarFallback>
                  {client.firstName.charAt(0)}
                  {client.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-grow space-y-4">
              <h2 className="text-2xl font-bold">
                {client.firstName} {client.lastName}
              </h2>
              <p className="text-muted-foreground">{client.email}</p>
              <p>{client.bio}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Teléfono</p>
                  <p>{client.phoneNumber || "No disponible"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Estado de Suscripción</p>
                  <p>{client.subscription?.status === "active" ? "Activo" : "Inactivo"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Plan</p>
                  <p>{client.subscription?.plan || "No disponible"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Fecha de Inicio</p>
                  <p>{client.subscription?.startDate || "No disponible"}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="measurements">Medidas</TabsTrigger>
          <TabsTrigger value="diet">Dieta</TabsTrigger>
          <TabsTrigger value="forms">Formularios</TabsTrigger>
          <TabsTrigger value="photos">Fotos</TabsTrigger>
        </TabsList>

        <TabsContent value="measurements" className="mt-6">
          <ClientMeasurements clientId={clientId} />
        </TabsContent>

        <TabsContent value="diet" className="mt-6">
          <ClientDiet clientId={clientId} />
        </TabsContent>

        <TabsContent value="forms" className="mt-6">
          <ClientForms clientId={clientId} />
        </TabsContent>

        <TabsContent value="photos" className="mt-6">
          <ClientPhotos clientId={clientId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

