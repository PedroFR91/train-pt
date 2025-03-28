import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface TrainerTestimonialsProps {
  trainerId: string
}

export function TrainerTestimonials({ trainerId }: TrainerTestimonialsProps) {
  // En una implementación real, aquí cargaríamos los testimonios del entrenador
  const testimonials = [
    {
      id: 1,
      name: "María García",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      text: "Juan es un excelente entrenador. Gracias a su plan personalizado y su constante apoyo, logré perder 10 kg en 3 meses.",
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      text: "Increíble experiencia. El enfoque de Juan en la técnica correcta y la progresión gradual me ayudó a superar mis límites sin lesiones.",
    },
    {
      id: 3,
      name: "Ana Martínez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      text: "Muy satisfecha con los resultados. Juan adapta constantemente el plan según mi progreso y siempre está disponible para resolver dudas.",
    },
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Testimonios de Clientes</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{testimonial.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

