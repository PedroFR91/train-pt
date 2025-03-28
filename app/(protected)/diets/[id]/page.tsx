"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dietService } from "@/services/diet-service"
import { Utensils, Clock, Pencil, Trash2, Users } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function DietDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dietId = params.id
  const [diet, setDiet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchDiet = async () => {
      try {
        setLoading(true)
        const response = await dietService.getDiet(Number(dietId))
        if (response.success) {
          setDiet(response.data)
        } else {
          toast({
            title: "Error",
            description: "No se pudo cargar la dieta",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching diet:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar la dieta",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (dietId) {
      fetchDiet()
    }
  }, [dietId])

  const handleEditDiet = () => {
    router.push(`/diets/${dietId}/edit`)
  }

  const handleDeleteDiet = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar esta dieta?")) {
      try {
        const response = await dietService.deleteDiet(Number(dietId))
        if (response.success) {
          toast({
            title: "Dieta eliminada",
            description: "La dieta se ha eliminado correctamente",
          })
          router.push("/diets")
        } else {
          throw new Error(response.error || "Error al eliminar la dieta")
        }
      } catch (error) {
        console.error("Error deleting diet:", error)
        toast({
          title: "Error",
          description: "No se pudo eliminar la dieta",
          variant: "destructive",
        })
      }
    }
  }

  const handleAssignToClients = () => {
    router.push(`/diets/${dietId}/assign`)
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
        <h1 className="text-3xl font-bold">{diet.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEditDiet}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="outline" onClick={handleDeleteDiet} className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
          <Button onClick={handleAssignToClients}>
            <Users className="mr-2 h-4 w-4" />
            Asignar a Clientes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center">
              <Utensils className="h-5 w-5 mr-2 text-primary" />
              <div>
                <p className="text-sm font-medium">Calorías Diarias</p>
                <p className="text-2xl font-bold">{diet.calories} kcal</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <div>
                <p className="text-sm font-medium">Comidas</p>
                <p className="text-2xl font-bold">{diet.meals?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Descripción</TabsTrigger>
          <TabsTrigger value="meals">Comidas</TabsTrigger>
          <TabsTrigger value="clients">Clientes Asignados</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Descripción de la Dieta</CardTitle>
              <CardDescription>Detalles y objetivo de la dieta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Descripción</h3>
                  <p>{diet.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meals">
          <Card>
            <CardHeader>
              <CardTitle>Comidas</CardTitle>
              <CardDescription>Comidas y alimentos incluidos en esta dieta</CardDescription>
            </CardHeader>
            <CardContent>
              {diet.meals && diet.meals.length > 0 ? (
                <div className="space-y-6">
                  {diet.meals.map((meal, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{meal.meal}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-1">
                          {meal.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No hay comidas en esta dieta</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <CardTitle>Clientes Asignados</CardTitle>
              <CardDescription>Clientes a los que se ha asignado esta dieta</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Aquí iría la lista de clientes asignados */}
              <div className="text-center py-6">
                <p className="text-muted-foreground">No hay clientes asignados a esta dieta</p>
                <Button className="mt-2" onClick={handleAssignToClients}>
                  <Users className="mr-2 h-4 w-4" />
                  Asignar a Clientes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

