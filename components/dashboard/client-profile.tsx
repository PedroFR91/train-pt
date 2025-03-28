import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

export function ClientProfile() {
  const clientData = {
    name: "Pedro Antonio Ruiz Pérez",
    email: "clientetres@gmail.com",
    age: 32,
    height: 178,
    weight: 82,
    goal: "Pérdida de peso y tonificación muscular",
    trainer: "Juan Pérez",
    program: "Programa de 12 semanas - Pérdida de peso",
    startDate: "01/02/2025",
    endDate: "25/04/2025",
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Perfil del Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={clientData.name} />
                <AvatarFallback>PP</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Editar Perfil
              </Button>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold">{clientData.name}</h3>
                <p className="text-muted-foreground">{clientData.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Edad</p>
                  <p>{clientData.age} años</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Altura</p>
                  <p>{clientData.height} cm</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Peso Actual</p>
                  <p>{clientData.weight} kg</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Objetivo</p>
                  <p>{clientData.goal}</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm font-medium">Programa Actual</p>
                <p>{clientData.program}</p>
                <p className="text-sm text-muted-foreground">
                  {clientData.startDate} - {clientData.endDate}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Entrenador</p>
                <p>{clientData.trainer}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

