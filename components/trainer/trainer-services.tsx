"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface TrainerServicesProps {
  trainerId: string
}

export function TrainerServices({ trainerId }: TrainerServicesProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  // En una implementación real, aquí cargaríamos los servicios del entrenador
  const services = [
    {
      id: "basic",
      name: "Plan Básico",
      price: "50€/mes",
      features: ["1 rutina personalizada", "Seguimiento mensual", "Acceso a la app móvil"],
    },
    {
      id: "premium",
      name: "Plan Premium",
      price: "100€/mes",
      features: [
        "2 rutinas personalizadas",
        "Seguimiento semanal",
        "Acceso a la app móvil",
        "Plan de nutrición básico",
      ],
    },
    {
      id: "elite",
      name: "Plan Elite",
      price: "200€/mes",
      features: [
        "Rutinas ilimitadas",
        "Seguimiento diario",
        "Acceso a la app móvil",
        "Plan de nutrición avanzado",
        "2 sesiones de videollamada al mes",
      ],
    },
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Servicios y Tarifas</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className={selectedPlan === service.id ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription>{service.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => setSelectedPlan(service.id)}
                variant={selectedPlan === service.id ? "default" : "outline"}
              >
                {selectedPlan === service.id ? "Seleccionado" : "Seleccionar Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedPlan && (
        <div className="mt-6 text-center">
          <Button asChild>
            <Link href={`/subscribe/${trainerId}?plan=${selectedPlan}`}>Continuar con la Suscripción</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

