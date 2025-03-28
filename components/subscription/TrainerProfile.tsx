import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Este es un ejemplo. En una aplicación real, obtendrías estos datos de una API o base de datos.
const trainerData = {
  id: "1",
  name: "Juan Pérez",
  specialty: "Pérdida de peso",
  bio: "Entrenador certificado con 10 años de experiencia...",
  plans: [
    { id: "basic", name: "Plan Básico", price: 50, description: "1 rutina personalizada al mes" },
    {
      id: "premium",
      name: "Plan Premium",
      price: 100,
      description: "2 rutinas personalizadas al mes + plan nutricional",
    },
  ],
}

export function TrainerProfile({ trainerId }: { trainerId: string }) {
  // En una aplicación real, usarías el trainerId para obtener los datos del entrenador

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{trainerData.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            <strong>Especialidad:</strong> {trainerData.specialty}
          </p>
          <p>{trainerData.bio}</p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4">Planes de Entrenamiento</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {trainerData.plans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{plan.description}</p>
              <p className="text-2xl font-bold mb-4">€{plan.price}/mes</p>
              <Button asChild>
                <Link href={`/subscribe/${trainerId}?plan=${plan.id}`}>Seleccionar Plan</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </div>
  )
}

