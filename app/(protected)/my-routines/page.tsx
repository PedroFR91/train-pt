import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const clientRoutines = [
  { id: 1, name: "Rutina de pérdida de peso", trainer: "Juan Pérez", lastUpdated: "2023-06-15" },
  { id: 2, name: "Entrenamiento de fuerza", trainer: "María García", lastUpdated: "2023-06-10" },
]

export default function MyRoutinesPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Mis Rutinas</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clientRoutines.map((routine) => (
          <Card key={routine.id}>
            <CardHeader>
              <CardTitle>{routine.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Entrenador: {routine.trainer}</p>
              <p className="text-sm text-muted-foreground">Última actualización: {routine.lastUpdated}</p>
              <Button className="mt-4 w-full">Ver Rutina</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

