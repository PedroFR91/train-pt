import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface TrainerProfileProps {
  trainerId: string
}

export function TrainerProfile({ trainerId }: TrainerProfileProps) {
  // En una implementación real, aquí cargaríamos los datos del entrenador
  const trainer = {
    name: "Juan Pérez",
    specialties: ["Pérdida de peso", "Musculación", "Entrenamiento funcional"],
    rating: 4.8,
    reviews: 124,
    bio: "Entrenador personal certificado con más de 10 años de experiencia. Especializado en ayudar a mis clientes a alcanzar sus objetivos de fitness de manera efectiva y sostenible.",
    image: "/placeholder.svg?height=300&width=300",
    experience: "10 años de experiencia en entrenamiento personal",
    certifications: ["Certificado en Nutrición Deportiva", "Especialista en Entrenamiento Funcional"],
  }

  return (
    <Card className="overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img src={trainer.image || "/placeholder.svg"} alt={trainer.name} className="w-full h-full object-cover" />
        </div>
        <div className="md:w-2/3 p-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{trainer.name}</CardTitle>
            <div className="flex items-center mt-2">
              <Star className="text-yellow-400 w-5 h-5" />
              <span className="ml-1 font-semibold">{trainer.rating}</span>
              <span className="ml-1 text-muted-foreground">({trainer.reviews} reseñas)</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{trainer.bio}</p>
            <p className="mb-2">
              <strong>Experiencia:</strong> {trainer.experience}
            </p>
            <div className="mb-4">
              <strong>Certificaciones:</strong>
              <ul className="list-disc list-inside">
                {trainer.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {trainer.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}

