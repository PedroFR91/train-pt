import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Básico",
    price: "29.99",
    features: ["1 rutina personalizada", "Seguimiento mensual", "Acceso a la app móvil"],
  },
  {
    name: "Premium",
    price: "49.99",
    features: ["3 rutinas personalizadas", "Seguimiento semanal", "Acceso a la app móvil", "Asesoramiento nutricional"],
  },
  {
    name: "Elite",
    price: "79.99",
    features: [
      "Rutinas ilimitadas",
      "Seguimiento diario",
      "Acceso a la app móvil",
      "Asesoramiento nutricional",
      "Sesiones de video 1:1",
    ],
  },
]

export function SubscriptionPlans() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Planes de Suscripción</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>€{plan.price} / mes</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Seleccionar Plan</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

