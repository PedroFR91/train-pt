"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SubscriptionSummary({ formData, trainerId, planDetails }) {
  const handleSubmit = async () => {
    // Aquí enviarías los datos al backend
    console.log("Enviando solicitud al entrenador:", { formData, trainerId, planDetails })
    // Redirigir al cliente a su dashboard o mostrar un mensaje de confirmación
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resumen de tu Solicitud</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Entrenador ID:</strong> {trainerId}
          </p>
          <p>
            <strong>Plan seleccionado:</strong> {planDetails.name}
          </p>
          <p>
            <strong>Precio:</strong> €{planDetails.price}/mes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tus datos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li>
              <strong>Nombre:</strong> {formData.name}
            </li>
            <li>
              <strong>Edad:</strong> {formData.age}
            </li>
            <li>
              <strong>Altura:</strong> {formData.height} cm
            </li>
            <li>
              <strong>Peso:</strong> {formData.weight} kg
            </li>
            <li>
              <strong>Objetivos:</strong> {formData.goals}
            </li>
          </ul>
        </CardContent>
      </Card>

      <p className="text-sm text-gray-600">
        Al enviar esta solicitud, el entrenador recibirá tus datos y te enviará una propuesta personalizada. Una vez que
        aceptes la propuesta, recibirás un enlace para realizar el pago.
      </p>
      <Button onClick={handleSubmit}>Confirmar y Enviar Solicitud</Button>
    </div>
  )
}

