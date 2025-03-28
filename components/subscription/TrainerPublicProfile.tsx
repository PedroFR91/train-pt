"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Este es un ejemplo. En una aplicación real, obtendrías estos datos de una API o base de datos.
const trainerData = {
  id: "1",
  name: "Juan Pérez",
  specialty: "Pérdida de peso",
  bio: "Entrenador certificado con 10 años de experiencia en pérdida de peso y tonificación muscular.",
  experience: "10 años de experiencia en entrenamiento personal",
  certifications: ["Certificado en Nutrición Deportiva", "Especialista en Entrenamiento Funcional"],
  plans: [
    { id: "basic", name: "Plan Básico", price: 50, description: "1 rutina personalizada al mes, seguimiento semanal" },
    {
      id: "premium",
      name: "Plan Premium",
      price: 100,
      description: "2 rutinas personalizadas al mes, seguimiento diario, plan nutricional",
    },
    {
      id: "elite",
      name: "Plan Elite",
      price: 200,
      description: "Rutinas ilimitadas, seguimiento 24/7, plan nutricional avanzado, 2 sesiones de videollamada al mes",
    },
  ],
  testimonials: [
    { id: 1, name: "María G.", text: "Gracias a Juan perdí 15 kg en 6 meses. Su apoyo fue fundamental." },
    { id: 2, name: "Carlos R.", text: "Excelente entrenador. Me ayudó a alcanzar mis objetivos de tonificación." },
  ],
}

export function TrainerPublicProfile({ trainerId }: { trainerId: string }) {
  const [selectedPlan, setSelectedPlan] = useState(null)

  // En una aplicación real, usarías el trainerId para obtener los datos del entrenador

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{trainerData.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-2">
            <strong>Especialidad:</strong> {trainerData.specialty}
          </p>
          <p className="mb-4">{trainerData.bio}</p>
          <p>
            <strong>Experiencia:</strong> {trainerData.experience}
          </p>
          <div className="mt-4">
            <strong>Certificaciones:</strong>
            <ul className="list-disc list-inside">
              {trainerData.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="plans">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="plans">Planes de Entrenamiento</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonios</TabsTrigger>
          <TabsTrigger value="contact">Contacto</TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <h2 className="text-2xl font-bold mb-4">Planes de Entrenamiento</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {trainerData.plans.map((plan) => (
              <Card key={plan.id} className={selectedPlan === plan.id ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{plan.description}</p>
                  <p className="text-2xl font-bold mb-4">€{plan.price}/mes</p>
                  <Button
                    onClick={() => setSelectedPlan(plan.id)}
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                  >
                    {selectedPlan === plan.id ? "Seleccionado" : "Seleccionar"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {selectedPlan && (
            <div className="mt-6">
              <Button asChild>
                <Link href={`/subscribe/${trainerId}?plan=${selectedPlan}`}>Continuar con la Suscripción</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="testimonials">
          <h2 className="text-2xl font-bold mb-4">Testimonios de Clientes</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {trainerData.testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardContent className="pt-6">
                  <p className="italic mb-2">"{testimonial.text}"</p>
                  <p className="font-semibold">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <h2 className="text-2xl font-bold mb-4">Contacto</h2>
          <Card>
            <CardContent className="pt-6">
              <p>Para más información o consultas personalizadas, no dudes en contactar a {trainerData.name}:</p>
              <Button className="mt-4">Enviar Mensaje</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

