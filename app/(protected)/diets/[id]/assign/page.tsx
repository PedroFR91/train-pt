"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Check } from "lucide-react"
import { userService } from "@/services/user-service"
import { dietService } from "@/services/diet-service"
import { toast } from "@/components/ui/use-toast"

export default function AssignDietPage() {
  const params = useParams()
  const router = useRouter()
  const dietId = params.id
  const [diet, setDiet] = useState(null)
  const [clients, setClients] = useState([])
  const [selectedClients, setSelectedClients] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch diet
        const dietResponse = await dietService.getDiet(Number(dietId))

        // Fetch clients
        const clientsResponse = await userService.getClients()

        if (dietResponse.success && clientsResponse.success) {
          setDiet(dietResponse.data)
          setClients(clientsResponse.data || [])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (dietId) {
      fetchData()
    }
  }, [dietId])

  const filteredClients = clients.filter(
    (client) =>
      client.firstName.toLowerCase().includes(search.toLowerCase()) ||
      client.lastName.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase()),
  )

  const handleToggleClient = (clientId) => {
    if (selectedClients.includes(clientId)) {
      setSelectedClients(selectedClients.filter((id) => id !== clientId))
    } else {
      setSelectedClients([...selectedClients, clientId])
    }
  }

  const handleAssignDiet = async () => {
    if (selectedClients.length === 0) {
      toast({
        title: "Error",
        description: "Selecciona al menos un cliente para asignar la dieta",
        variant: "destructive",
      })
      return
    }

    try {
      setSubmitting(true)

      // Assign diet to each selected client
      for (const clientId of selectedClients) {
        await dietService.assignDiet(Number(dietId), clientId)
      }

      toast({
        title: "Éxito",
        description: `Dieta asignada correctamente a ${selectedClients.length} clientes`,
      })

      // Redirect back to diet detail
      router.push(`/diets/${dietId}`)
    } catch (error) {
      console.error("Error assigning diet:", error)
      toast({
        title: "Error",
        description: "No se pudo asignar la dieta",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="container mx-auto p-6">Cargando...</div>
  }

  if (!diet) {
    return <div className="container mx-auto p-6">Dieta no encontrada</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Asignar Dieta</h1>
        <Button onClick={() => router.back()} variant="outline">
          Volver
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Dieta: {diet.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Selecciona los clientes a los que deseas asignar esta dieta.</p>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => router.push("/clients/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {filteredClients.map((client) => (
          <Card
            key={client.id}
            className={`cursor-pointer ${selectedClients.includes(client.id) ? "border-primary" : ""}`}
            onClick={() => handleToggleClient(client.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={client.picture || "/placeholder.svg?height=40&width=40"}
                    alt={client.firstName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  {selectedClients.includes(client.id) && (
                    <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {client.firstName} {client.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleAssignDiet} disabled={selectedClients.length === 0 || submitting}>
          {submitting ? "Asignando..." : `Asignar a ${selectedClients.length} clientes`}
        </Button>
      </div>
    </div>
  )
}

