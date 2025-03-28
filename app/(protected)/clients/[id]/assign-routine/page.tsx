"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Check } from "lucide-react"
import { userService } from "@/services/user-service"
import { routineService } from "@/services/routine-service"
import { toast } from "@/components/ui/use-toast"

export default function AssignRoutinePage() {
  const params = useParams()
  const router = useRouter()
  const clientId = params.id
  const [client, setClient] = useState(null)
  const [routines, setRoutines] = useState([])
  const [selectedRoutines, setSelectedRoutines] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch client
        const clientResponse = await userService.getUserById(clientId)

        // Fetch routines
        const routinesResponse = await routineService.getRoutines()

        if (clientResponse.success && routinesResponse.success) {
          setClient(clientResponse.data)
          setRoutines(routinesResponse.data || [])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (clientId) {
      fetchData()
    }
  }, [clientId])

  const filteredRoutines = routines.filter((routine) => routine.name.toLowerCase().includes(search.toLowerCase()))

  const handleToggleRoutine = (routineId) => {
    if (selectedRoutines.includes(routineId)) {
      setSelectedRoutines(selectedRoutines.filter((id) => id !== routineId))
    } else {
      setSelectedRoutines([...selectedRoutines, routineId])
    }
  }

  const handleAssignRoutines = async () => {
    if (selectedRoutines.length === 0) {
      toast({
        title: "Error",
        description: "Selecciona al menos una rutina para asignar",
        variant: "destructive",
      })
      return
    }

    try {
      setSubmitting(true)

      // Assign each selected routine
      for (const routineId of selectedRoutines) {
        await routineService.assignRoutine(routineId, clientId)
      }

      toast({
        title: "Éxito",
        description: `${selectedRoutines.length} rutinas asignadas correctamente`,
      })

      // Redirect back to client profile
      router.push(`/clients/${clientId}`)
    } catch (error) {
      console.error("Error assigning routines:", error)
      toast({
        title: "Error",
        description: "No se pudieron asignar las rutinas",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="container mx-auto p-6">Cargando...</div>
  }

  if (!client) {
    return <div className="container mx-auto p-6">Cliente no encontrado</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Asignar Rutinas</h1>
        <Button onClick={() => router.back()} variant="outline">
          Volver
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Cliente: {client.firstName} {client.lastName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Selecciona las rutinas que deseas asignar a este cliente.</p>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar rutinas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => router.push("/routines/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Rutina
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {filteredRoutines.map((routine) => (
          <Card
            key={routine.id}
            className={`cursor-pointer ${selectedRoutines.includes(routine.id) ? "border-primary" : ""}`}
            onClick={() => handleToggleRoutine(routine.id)}
          >
            <CardHeader className="relative">
              <CardTitle>{routine.name}</CardTitle>
              {selectedRoutines.includes(routine.id) && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{routine.description}</p>
              <div className="mt-2">
                <p className="text-sm">
                  <strong>Duración:</strong> {routine.duration} días
                </p>
                {routine.goal && (
                  <p className="text-sm">
                    <strong>Objetivo:</strong> {routine.goal}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleAssignRoutines} disabled={selectedRoutines.length === 0 || submitting}>
          {submitting ? "Asignando..." : "Asignar Rutinas Seleccionadas"}
        </Button>
      </div>
    </div>
  )
}

