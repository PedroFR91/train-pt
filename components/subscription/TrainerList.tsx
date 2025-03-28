import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const trainers = [
  { id: 1, name: "Juan Pérez", specialty: "Pérdida de peso", rating: 4.8 },
  { id: 2, name: "María García", specialty: "Musculación", rating: 4.9 },
  { id: 3, name: "Carlos Rodríguez", specialty: "Entrenamiento funcional", rating: 4.7 },
]

export function TrainerList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {trainers.map((trainer) => (
        <Card key={trainer.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={`/placeholder.svg?text=${trainer.name[0]}`} alt={trainer.name} />
                <AvatarFallback>{trainer.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{trainer.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{trainer.specialty}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Valoración: {trainer.rating}/5</p>
            <Link
              href={`/trainer/${trainer.id}`}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
            >
              Ver Perfil
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

